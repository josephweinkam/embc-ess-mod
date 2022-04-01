﻿using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using EMBC.ESS.Shared.Contracts.Teams;
using EMBC.Utilities.Caching;
using EMBC.Utilities.Messaging;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace EMBC.Responders.API.Services
{
    public interface IUserService
    {
        Task<ClaimsPrincipal> GetPrincipal(ClaimsPrincipal sourcePrincipal = null);

        Task<TeamMember> GetTeamMember(ClaimsPrincipal sourcePrincipal = null);
    }

    public class UserService : IUserService
    {
        private readonly IMessagingClient messagingClient;
        private readonly ICache cache;
        private readonly IHttpContextAccessor httpContext;
        private readonly ILogger<UserService> logger;
        private ClaimsPrincipal currentPrincipal => httpContext.HttpContext?.User;
        private Func<ClaimsPrincipal, string> getCurrentUserName = principal => principal.FindFirstValue(ClaimTypes.Upn).Split('@')[0];

        private static Func<string, string> generateCacheKeyName = userName => $"_userprincipal_{userName}";

        public UserService(IMessagingClient messagingClient, ICache cache, IHttpContextAccessor httpContext, ILogger<UserService> logger)
        {
            this.messagingClient = messagingClient;
            this.cache = cache;
            this.httpContext = httpContext;
            this.logger = logger;
        }

        public async Task<ClaimsPrincipal> GetPrincipal(ClaimsPrincipal sourcePrincipal = null)
        {
            if (sourcePrincipal == null) sourcePrincipal = currentPrincipal;
            var userName = getCurrentUserName(sourcePrincipal);
            try
            {
                var cacheKey = generateCacheKeyName(userName);
                var teamMember = await cache.GetOrSet(cacheKey, async () => await GetTeamMember(sourcePrincipal), TimeSpan.FromMinutes(10));
                if (teamMember == null) return sourcePrincipal;

                var essClaims = new[]
                {
                    new Claim("user_id", teamMember.Id),
                    new Claim("user_role", teamMember.Role),
                    new Claim("user_team", teamMember.TeamId)
                };
                return new ClaimsPrincipal(new ClaimsIdentity(sourcePrincipal.Identity, sourcePrincipal.Claims.Concat(essClaims)));
            }
            catch (Exception e)
            {
                logger.LogError(e, $"Failed to transform JWT principal for user {userName} to ESS user principal");
                throw;
            }
        }

        public async Task<TeamMember> GetTeamMember(ClaimsPrincipal sourcePrincipal = null)
        {
            if (sourcePrincipal == null) sourcePrincipal = currentPrincipal;
            var member = (await messagingClient.Send(new TeamMembersQuery { UserName = getCurrentUserName(sourcePrincipal), IncludeActiveUsersOnly = true })).TeamMembers.SingleOrDefault();

            return member;
        }
    }
}
