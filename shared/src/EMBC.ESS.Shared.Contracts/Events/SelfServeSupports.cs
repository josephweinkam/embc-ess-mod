﻿using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace EMBC.ESS.Shared.Contracts.Events.SelfServe;

public record CheckEligibileForSelfServeCommand : Command
{
    public string EvacuationFileId { get; set; }
}

public record EligibilityCheckQuery : Query<EligibilityCheckResponse>
{
    public string EvacuationFileId { get; set; }
}

public record EligibilityCheckResponse
{
    public bool IsEligible { get; set; }
    public DateTime? From { get; set; }
    public DateTime? To { get; set; }
    public string TaskNumber { get; set; }
}

public record OptOutSelfServeCommand : Command
{
    public string EvacuationFileId { get; set; }
}

public record DraftSelfServeSupportQuery : Query<DraftSupportResponse>
{
    public string EvacuationFileId { get; set; }
    public IEnumerable<SelfServeSupport>? Items { get; set; }
}

public record DraftSupportResponse
{
    public IEnumerable<SelfServeSupport> Items { get; set; } = Array.Empty<SelfServeSupport>();
}

public record SubmitSelfServeSupportsCommand : Command
{
    public string EvacuationFileId { get; set; }
    public IEnumerable<SelfServeSupport> Supports { get; set; } = Array.Empty<SelfServeSupport>();
    public ETransferDetails ETransferDetails { get; set; }
}

//[JsonDerivedType(typeof(SelfServeShelterAllowanceSupport), typeDiscriminator: nameof(SelfServeShelterAllowanceSupport))]
//[JsonDerivedType(typeof(SelfServeFoodGroceriesSupport), typeDiscriminator: nameof(SelfServeFoodGroceriesSupport))]
//[JsonDerivedType(typeof(SelfServeFoodRestaurantSupport), typeDiscriminator: nameof(SelfServeFoodRestaurantSupport))]
//[JsonDerivedType(typeof(SelfServeIncidentalsSupport), typeDiscriminator: nameof(SelfServeIncidentalsSupport))]
//[JsonDerivedType(typeof(SelfServeClothingSupport), typeDiscriminator: nameof(SelfServeClothingSupport))]
[JsonConverter(typeof(PolymorphicJsonConverter<SelfServeSupport>))]
public abstract record SelfServeSupport
{
    public double? TotalAmount { get; set; }
}

public record SelfServeShelterAllowanceSupport : SelfServeSupport
{
    public IEnumerable<SupportDay> Nights { get; set; } = Array.Empty<SupportDay>();
}

public record SupportDay(DateOnly Date, IEnumerable<string> IncludedHouseholdMembers);

public record SelfServeFoodGroceriesSupport : SelfServeSupport
{
    public IEnumerable<SupportDay> Nights { get; set; } = Array.Empty<SupportDay>();
}

public record SelfServeFoodRestaurantSupport : SelfServeSupport
{
    public IEnumerable<string> IncludedHouseholdMembers { get; set; }
    public IEnumerable<SupportDayMeals> Meals { get; set; } = Array.Empty<SupportDayMeals>();
}
public record SupportDayMeals(DateOnly Date, bool Breakfast, bool Dinner, bool Lunch);

public record SelfServeIncidentalsSupport : SelfServeSupport
{
    public IEnumerable<string> IncludedHouseholdMembers { get; set; } = Array.Empty<string>();
}

public record SelfServeClothingSupport : SelfServeSupport
{
    public IEnumerable<string> IncludedHouseholdMembers { get; set; } = Array.Empty<string>();
}

public record ETransferDetails
{
    public string ContactEmail { get; set; }
    public string? ETransferEmail { get; set; }
    public string? ETransferMobile { get; set; }
    public string RecipientName { get; set; }
}
