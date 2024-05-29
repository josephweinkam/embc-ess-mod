﻿using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using EMBC.ESS.Utilities.Dynamics;
using EMBC.ESS.Utilities.Dynamics.Microsoft.Dynamics.CRM;
using EMBC.Utilities;
using EMBC.Utilities.Extensions;

namespace EMBC.ESS.Resources.Evacuations;

public class EvacuationRepository : IEvacuationRepository
{
    private readonly IEssContextFactory essContextFactory;
    private readonly IMapper mapper;

    public EvacuationRepository(IEssContextFactory essContextFactory, IMapper mapper)
    {
        this.essContextFactory = essContextFactory;
        this.mapper = mapper;
    }

    public async Task<ManageEvacuationFileCommandResult> Manage(ManageEvacuationFileCommand cmd)
    {
        var ct = CancellationToken.None;
        return cmd switch
        {
            SubmitEvacuationFileNeedsAssessment c => await Handle(c, ct),
            LinkEvacuationFileRegistrant c => await Handle(c, ct),
            SaveEvacuationFileNote c => await HandleSaveEvacuationFileNote(c, ct),
            AddEligibilityCheck c => await Handle(c, ct),
            OptoutSelfServe c => await Handle(c, ct),
            AssignFileToTask c => await Handle(c, ct),

            _ => throw new NotSupportedException($"{cmd.GetType().Name} is not supported")
        };
    }

    public async Task<EvacuationFileQueryResult> Query(EvacuationFilesQuery query)
    {
        var ct = CancellationToken.None;
        return new EvacuationFileQueryResult() { Items = await Read(query, ct) };
    }

    private async Task<ManageEvacuationFileCommandResult> Handle(SubmitEvacuationFileNeedsAssessment cmd, CancellationToken ct)
    {
        var ctx = essContextFactory.Create();
        if (string.IsNullOrEmpty(cmd.EvacuationFile.Id))
        {
            return new ManageEvacuationFileCommandResult { Id = await Create(ctx, cmd.EvacuationFile, ct) };
        }
        else
        {
            return new ManageEvacuationFileCommandResult { Id = await Update(ctx, cmd.EvacuationFile, ct) };
        }
    }

    private async Task<ManageEvacuationFileCommandResult> Handle(LinkEvacuationFileRegistrant cmd, CancellationToken ct)
    {
        var ctx = essContextFactory.Create();
        return new ManageEvacuationFileCommandResult { Id = await LinkRegistrant(ctx, cmd.FileId, cmd.RegistrantId, cmd.HouseholdMemberId, ct) };
    }

    private async Task<ManageEvacuationFileCommandResult> HandleSaveEvacuationFileNote(SaveEvacuationFileNote cmd, CancellationToken ct)
    {
        var ctx = essContextFactory.Create();
        if (string.IsNullOrEmpty(cmd.Note.Id))
        {
            return new ManageEvacuationFileCommandResult { Id = await CreateNote(ctx, cmd.FileId, cmd.Note, ct) };
        }
        else
        {
            return new ManageEvacuationFileCommandResult { Id = await UpdateNote(ctx, cmd.FileId, cmd.Note, ct) };
        }
    }

    public async Task<string> Create(EssContext essContext, EvacuationFile evacuationFile, CancellationToken ct)
    {
        VerifyEvacuationFileInvariants(evacuationFile);

        var primaryContact = essContext.contacts.Where(c => c.statecode == (int)EntityState.Active && c.contactid == Guid.Parse(evacuationFile.PrimaryRegistrantId)).SingleOrDefault();
        if (primaryContact == null) throw new ArgumentException($"Primary registrant {evacuationFile.PrimaryRegistrantId} not found");

        var file = mapper.Map<era_evacuationfile>(evacuationFile);
        file.era_evacuationfileid = Guid.NewGuid();

        essContext.AddToera_evacuationfiles(file);
        essContext.SetLink(file, nameof(era_evacuationfile.era_EvacuatedFromID), essContext.LookupJurisdictionByCode(file._era_evacuatedfromid_value?.ToString()));
        AssignPrimaryRegistrant(essContext, file, primaryContact);
        AddPets(essContext, file);

        AddNeedsAssessment(essContext, file, file.era_CurrentNeedsAssessmentid);

        AssignToTask(essContext, file, evacuationFile.TaskId);

        await essContext.SaveChangesAsync(ct);

        essContext.Detach(file);

        //get the autogenerated evacuation file number
        var essFileNumber = essContext.era_evacuationfiles.Where(f => f.era_evacuationfileid == file.era_evacuationfileid).Select(f => f.era_name).Single();

        essContext.DetachAll();

        return essFileNumber;
    }

    public async Task<string> Update(EssContext essContext, EvacuationFile evacuationFile, CancellationToken ct)
    {
        var currentFile = await essContext.era_evacuationfiles
            .Expand(f => f.era_TaskId)
            .Expand(f => f.era_era_evacuationfile_era_householdmember_EvacuationFileid)
            .Expand(f => f.era_era_evacuationfile_era_animal_ESSFileid)
            .Where(f => f.era_name == evacuationFile.Id)
            .SingleOrDefaultAsync(ct);
        if (currentFile == null) throw new ArgumentException($"Evacuation file {evacuationFile.Id} not found");
        essContext.DetachAll();

        VerifyEvacuationFileInvariants(evacuationFile, currentFile);

        RemovePets(essContext, currentFile);

        var file = mapper.Map<era_evacuationfile>(evacuationFile);
        file.era_evacuationfileid = currentFile.era_evacuationfileid;
        file.era_TaskId = currentFile.era_TaskId;
        file.era_era_evacuationfile_era_householdmember_EvacuationFileid = currentFile.era_era_evacuationfile_era_householdmember_EvacuationFileid;

        essContext.AttachTo(nameof(essContext.era_evacuationfiles), file);
        essContext.SetLink(file, nameof(era_evacuationfile.era_EvacuatedFromID), essContext.LookupJurisdictionByCode(file._era_evacuatedfromid_value?.ToString()));

        essContext.UpdateObject(file);
        AddPets(essContext, file);

        AddNeedsAssessment(essContext, file, file.era_CurrentNeedsAssessmentid);

        AssignToTask(essContext, file, evacuationFile.TaskId);

        await essContext.SaveChangesAsync(ct);

        essContext.DetachAll();

        return file.era_name;
    }

    private static void AddNeedsAssessment(EssContext essContext, era_evacuationfile file, era_needassessment needsAssessment)
    {
        essContext.AddToera_needassessments(needsAssessment);
        essContext.SetLink(file, nameof(era_evacuationfile.era_CurrentNeedsAssessmentid), needsAssessment);
        essContext.AddLink(file, nameof(era_evacuationfile.era_needsassessment_EvacuationFile), needsAssessment);
        essContext.SetLink(needsAssessment, nameof(era_needassessment.era_EvacuationFile), file);
        essContext.SetLink(needsAssessment, nameof(era_needassessment.era_Jurisdictionid), essContext.LookupJurisdictionByCode(needsAssessment._era_jurisdictionid_value?.ToString()));
        if (needsAssessment._era_reviewedbyid_value.HasValue)
        {
            var teamMember = essContext.era_essteamusers.ByKey(needsAssessment._era_reviewedbyid_value).GetValue();
            essContext.SetLink(needsAssessment, nameof(era_needassessment.era_ReviewedByid), teamMember);
            essContext.AddLink(teamMember, nameof(era_essteamuser.era_era_essteamuser_era_needassessment_ReviewedByid), needsAssessment);
        }

        foreach (var member in needsAssessment.era_era_householdmember_era_needassessment)
        {
            if (!member.era_householdmemberid.HasValue)
            {
                //create member
                member.era_householdmemberid = Guid.NewGuid();
                essContext.AddToera_householdmembers(member);
            }
            else if (HouseholdMemberChanged(member, file.era_era_evacuationfile_era_householdmember_EvacuationFileid.Single(hm => hm.era_householdmemberid == member.era_householdmemberid)))
            {
                //update member
                essContext.AttachTo(nameof(essContext.era_householdmembers), member);
                essContext.UpdateObject(member);
            }
            else
            {
                essContext.AttachTo(nameof(essContext.era_householdmembers), member);
            }
            AssignHouseholdMember(essContext, file, member);
            AssignHouseholdMember(essContext, needsAssessment, member);
        }
    }

    private static bool HouseholdMemberChanged(era_householdmember hm1, era_householdmember hm2) =>
        hm1.era_firstname != hm2.era_firstname ||
        hm1.era_lastname != hm2.era_lastname ||
        hm1.era_initials != hm2.era_initials ||
        hm1.era_dateofbirth != hm2.era_dateofbirth ||
        hm1.era_gender != hm2.era_gender;

    private static void AssignPrimaryRegistrant(EssContext essContext, era_evacuationfile file, contact primaryContact)
    {
        essContext.AddLink(primaryContact, nameof(primaryContact.era_evacuationfile_Registrant), file);
        essContext.SetLink(file, nameof(era_evacuationfile.era_Registrant), primaryContact);
    }

    private static void AssignToTask(EssContext essContext, era_evacuationfile file, string taskNumber)
    {
        if (string.IsNullOrEmpty(taskNumber)) return;
        var task = essContext.era_tasks.Where(t => t.era_name == taskNumber).OrderByDescending(t => t.createdon).FirstOrDefault();
        if (task == null) throw new ArgumentException($"Task {taskNumber} not found");
        if (file.era_TaskId == null) essContext.SetLink(file, nameof(era_evacuationfile.era_TaskId), task);
        essContext.SetLink(file.era_CurrentNeedsAssessmentid, nameof(era_needassessment.era_TaskNumber), task);
    }

    private static void AssignHouseholdMember(EssContext essContext, era_evacuationfile file, era_householdmember member)
    {
        if (member._era_registrant_value != null)
        {
            var registrant = essContext.contacts.Where(c => c.contactid == member._era_registrant_value).SingleOrDefault();
            if (registrant == null) throw new ArgumentException($"Household member has registrant id {member._era_registrant_value} which was not found");
            essContext.AddLink(registrant, nameof(contact.era_contact_era_householdmember_Registrantid), member);
        }
        essContext.SetLink(member, nameof(era_householdmember.era_EvacuationFileid), file);
    }

    private static void AssignHouseholdMember(EssContext essContext, era_needassessment needsAssessment, era_householdmember member)
    {
        essContext.AddLink(member, nameof(era_householdmember.era_era_householdmember_era_needassessment), needsAssessment);
    }

    private static void AddPets(EssContext essContext, era_evacuationfile file)
    {
        foreach (var pet in file.era_era_evacuationfile_era_animal_ESSFileid)
        {
            essContext.AddToera_animals(pet);
            essContext.SetLink(pet, nameof(era_animal.era_ESSFileid), file);
        }
    }

    private static void RemovePets(EssContext essContext, era_evacuationfile file)
    {
        foreach (var pet in file.era_era_evacuationfile_era_animal_ESSFileid)
        {
            essContext.AttachTo(nameof(essContext.era_animals), pet);
            essContext.DeleteObject(pet);
        }
    }

    private static void VerifyEvacuationFileInvariants(EvacuationFile evacuationFile, era_evacuationfile currentFile = null)
    {
        //Check invariants
        if (string.IsNullOrEmpty(evacuationFile.PrimaryRegistrantId))
        {
            throw new ArgumentNullException($"The file has no associated primary registrant");
        }
        if (evacuationFile.NeedsAssessment == null)
        {
            throw new ArgumentNullException($"File {evacuationFile.Id} must have a needs assessment");
        }

        if (evacuationFile.Id == null)
        {
            if (evacuationFile.NeedsAssessment.HouseholdMembers.Count(m => m.IsPrimaryRegistrant) != 1)
            {
                throw new InvalidOperationException($"File {evacuationFile.Id} must have a single primary registrant household member");
            }
        }
        else
        {
            if (evacuationFile.NeedsAssessment.HouseholdMembers.Count(m => m.IsPrimaryRegistrant) > 1)
            {
                throw new InvalidOperationException($"File {evacuationFile.Id} can not have multiple primary registrant household members");
            }

            if (currentFile != null && currentFile.era_era_evacuationfile_era_householdmember_EvacuationFileid != null &&
                currentFile.era_era_evacuationfile_era_householdmember_EvacuationFileid.Any(m => m.era_isprimaryregistrant == true) &&
                evacuationFile.NeedsAssessment.HouseholdMembers.Any(m => m.IsPrimaryRegistrant && string.IsNullOrEmpty(m.Id)))
            {
                throw new InvalidOperationException($"File {evacuationFile.Id} can not have multiple primary registrant household members");
            }
        }
    }

    private static async Task<string> LinkRegistrant(EssContext essContext, string fileId, string registrantId, string householdMemberId, CancellationToken ct)
    {
        var member = essContext.era_householdmembers.Where(m => m.era_householdmemberid == Guid.Parse(householdMemberId)).SingleOrDefault();
        if (member == null) throw new ArgumentException($"Household member with id {householdMemberId} not found");
        var registrant = essContext.contacts.Where(c => c.contactid == Guid.Parse(registrantId)).SingleOrDefault();
        if (registrant == null) throw new ArgumentException($"Registrant with id {registrantId} not found");

        essContext.AddLink(registrant, nameof(contact.era_contact_era_householdmember_Registrantid), member);
        await essContext.SaveChangesAsync(ct);

        return fileId;
    }

    private static async Task ParallelLoadEvacuationFileAsync(EssContext ctx, era_evacuationfile file, CancellationToken ct)
    {
        ctx.AttachTo(nameof(EssContext.era_evacuationfiles), file);

        var loadTasks = new List<Task>();

        if (file.era_era_evacuationfile_era_animal_ESSFileid == null) loadTasks.Add(ctx.LoadPropertyAsync(file, nameof(era_evacuationfile.era_era_evacuationfile_era_animal_ESSFileid), ct));
        if (file.era_era_evacuationfile_era_essfilenote_ESSFileID == null) loadTasks.Add(ctx.LoadPropertyAsync(file, nameof(era_evacuationfile.era_era_evacuationfile_era_essfilenote_ESSFileID), ct));
        if (file.era_TaskId == null) loadTasks.Add(ctx.LoadPropertyAsync(file, nameof(era_evacuationfile.era_TaskId), ct));
        if (file.era_Registrant == null) loadTasks.Add(ctx.LoadPropertyAsync(file, nameof(era_evacuationfile.era_Registrant), ct));
        if (file.era_era_evacuationfile_era_evacueesupport_ESSFileId == null) loadTasks.Add(ctx.LoadPropertyAsync(file, nameof(era_evacuationfile.era_era_evacuationfile_era_evacueesupport_ESSFileId), ct));
        loadTasks.Add(LoadNeedsAssessment(ctx, file, ct));

        await Task.WhenAll(loadTasks);
    }

    private static async Task LoadNeedsAssessment(EssContext ctx, era_evacuationfile file, CancellationToken ct)
    {
        if (file.era_CurrentNeedsAssessmentid == null) await ctx.LoadPropertyAsync(file, nameof(era_evacuationfile.era_CurrentNeedsAssessmentid), ct);
        ctx.AttachTo(nameof(EssContext.era_needassessments), file.era_CurrentNeedsAssessmentid);
        if (file.era_CurrentNeedsAssessmentid.era_TaskNumber == null) await ctx.LoadPropertyAsync(file.era_CurrentNeedsAssessmentid, nameof(era_needassessment.era_TaskNumber), ct);

        file.era_CurrentNeedsAssessmentid.era_EligibilityCheck = await ctx.era_eligibilitychecks
            .Expand(ec => ec.era_Task)
            .Expand(ec => ec.era_era_eligibilitycheck_era_eligiblesupport_EligibilityCheck)
            .Where(ec => ec._era_needsassessment_value == file.era_CurrentNeedsAssessmentid.era_needassessmentid)
            .OrderByDescending(ec => ec.createdon)
            .Take(1)
            .SingleOrDefaultAsync(ct);

        if (file.era_CurrentNeedsAssessmentid.era_EligibilityCheck != null)
        {
            await file.era_CurrentNeedsAssessmentid.era_EligibilityCheck.era_era_eligibilitycheck_era_eligiblesupport_EligibilityCheck.ForEachAsync(5, async s =>
            {
                ctx.AttachTo(nameof(EssContext.era_eligiblesupports), s);
                await ctx.LoadPropertyAsync(s, nameof(era_eligiblesupport.era_SelfServeSupportLimit), ct);
            });
        }

        var members = await ctx.era_householdmembers
            .Expand(m => m.era_Registrant)
            .Where(m => m._era_evacuationfileid_value == file.era_evacuationfileid)
            .GetAllPagesAsync(ct);

        file.era_era_evacuationfile_era_householdmember_EvacuationFileid =
            new Collection<era_householdmember>(members.Where(m => m.era_Registrant == null || m.era_Registrant.statecode == (int)EntityState.Active).ToArray());

        var naHouseholdMembers = (await ctx.era_era_householdmember_era_needassessmentset
            .Where(m => m.era_needassessmentid == file._era_currentneedsassessmentid_value)
            .GetAllPagesAsync(ct))
            .ToArray();

        file.era_CurrentNeedsAssessmentid.era_era_householdmember_era_needassessment =
            new Collection<era_householdmember>(file.era_era_evacuationfile_era_householdmember_EvacuationFileid.Where(m => naHouseholdMembers.Any(nam => nam.era_householdmemberid == m.era_householdmemberid)).ToArray());
    }

    private async Task<IEnumerable<EvacuationFile>> Read(EvacuationFilesQuery query, CancellationToken ct)
    {
        var readCtx = essContextFactory.CreateReadOnly();

        //get all matching files
        var files = (await QueryHouseholdMemberFiles(readCtx, query, ct))
            .Concat(await QueryEvacuationFiles(readCtx, query, ct))
            .Concat(await QueryNeedsAssessments(readCtx, query, ct));

        //secondary filter after loading the files
        if (!string.IsNullOrEmpty(query.FileId)) files = files.Where(f => f.era_name == query.FileId);
        if (query.RegistrationDateFrom.HasValue) files = files.Where(f => f.createdon.Value.UtcDateTime >= query.RegistrationDateFrom.Value);
        if (query.RegistrationDateTo.HasValue) files = files.Where(f => f.createdon.Value.UtcDateTime <= query.RegistrationDateTo.Value);
        if (query.IncludeFilesInStatuses.Any()) files = files.Where(f => query.IncludeFilesInStatuses.Any(s => (int)s == f.era_essfilestatus));
        if (query.Limit.HasValue) files = files.OrderByDescending(f => f.era_name).Take(query.Limit.Value);

        //ensure files will be loaded only once
        files = files
            .Where(f => f.era_evacuationfileid.HasValue)
            .Distinct(new LambdaComparer<era_evacuationfile>((f1, f2) => f1.era_evacuationfileid == f2.era_evacuationfileid, f => f.era_evacuationfileid.GetHashCode()))
            .ToArray();

        //load the file details
        await Parallel.ForEachAsync(files, ct, async (f, ct) => await ParallelLoadEvacuationFileAsync(readCtx, f, ct));

        readCtx.DetachAll();

        //map from Dynamics to DTOs
        return mapper.Map<IEnumerable<EvacuationFile>>(files, opt => opt.Items["MaskSecurityPhrase"] = query.MaskSecurityPhrase.ToString());
    }

    private static async Task<IEnumerable<era_evacuationfile>> QueryHouseholdMemberFiles(EssContext ctx, EvacuationFilesQuery query, CancellationToken ct)
    {
        var shouldQueryHouseholdMembers =
            string.IsNullOrEmpty(query.FileId) && string.IsNullOrEmpty(query.NeedsAssessmentId) &&
         (!string.IsNullOrEmpty(query.LinkedRegistrantId) ||
         !string.IsNullOrEmpty(query.PrimaryRegistrantId) ||
         !string.IsNullOrEmpty(query.HouseholdMemberId));

        if (!shouldQueryHouseholdMembers) return Array.Empty<era_evacuationfile>();

        var memberQuery = ctx.era_householdmembers
            .Expand(m => m.era_EvacuationFileid)
            .Where(m => m.statecode == (int)EntityState.Active);

        if (!string.IsNullOrEmpty(query.PrimaryRegistrantId)) memberQuery = memberQuery.Where(m => m.era_isprimaryregistrant == true && m._era_registrant_value == Guid.Parse(query.PrimaryRegistrantId));
        if (!string.IsNullOrEmpty(query.HouseholdMemberId)) memberQuery = memberQuery.Where(m => m.era_householdmemberid == Guid.Parse(query.HouseholdMemberId));
        if (!string.IsNullOrEmpty(query.LinkedRegistrantId)) memberQuery = memberQuery.Where(m => m._era_registrant_value == Guid.Parse(query.LinkedRegistrantId));

        return (await memberQuery.GetAllPagesAsync(ct))
            .Select(m => m.era_EvacuationFileid)
            .Where(f => f.statecode == (int)EntityState.Active);
    }

    private static async Task<IEnumerable<era_evacuationfile>> QueryEvacuationFiles(EssContext ctx, EvacuationFilesQuery query, CancellationToken ct)
    {
        var shouldQueryFiles =
            string.IsNullOrEmpty(query.NeedsAssessmentId) &&
            (!string.IsNullOrEmpty(query.FileId) ||
            !string.IsNullOrEmpty(query.ManualFileId) ||
            query.RegistrationDateFrom.HasValue ||
            query.RegistrationDateTo.HasValue);

        if (!shouldQueryFiles) return Array.Empty<era_evacuationfile>();

        var filesQuery = ctx.era_evacuationfiles
            .Expand(f => f.era_CurrentNeedsAssessmentid)
            .Expand(f => f.era_Registrant)
            .Expand(f => f.era_era_evacuationfile_era_animal_ESSFileid)
            .Expand(f => f.era_era_evacuationfile_era_essfilenote_ESSFileID)
            .Expand(f => f.era_TaskId)
            .Expand(f => f.era_era_evacuationfile_era_evacueesupport_ESSFileId)
            .Where(f => f.statecode == (int)EntityState.Active);

        if (!string.IsNullOrEmpty(query.FileId)) filesQuery = filesQuery.Where(f => f.era_name == query.FileId);
        if (!string.IsNullOrEmpty(query.ManualFileId)) filesQuery = filesQuery.Where(f => f.era_paperbasedessfile == query.ManualFileId);
        if (query.RegistrationDateFrom.HasValue) filesQuery = filesQuery.Where(f => f.createdon >= query.RegistrationDateFrom.Value);
        if (query.RegistrationDateTo.HasValue) filesQuery = filesQuery.Where(f => f.createdon <= query.RegistrationDateTo.Value);

        return await filesQuery.GetAllPagesAsync(ct);
    }

    private static async Task<IEnumerable<era_evacuationfile>> QueryNeedsAssessments(EssContext ctx, EvacuationFilesQuery query, CancellationToken ct)
    {
        var shouldQueryNeedsAssessments = !string.IsNullOrEmpty(query.NeedsAssessmentId) && !string.IsNullOrEmpty(query.FileId);

        if (!shouldQueryNeedsAssessments) return Array.Empty<era_evacuationfile>();

        var needsAssessmentQuery = ctx.era_needassessments
            .Expand(n => n.era_EvacuationFile)
            .Expand(n => n.era_TaskNumber)
            .Where(n => n.statecode == (int)EntityState.Active);

        if (!string.IsNullOrEmpty(query.NeedsAssessmentId)) needsAssessmentQuery = needsAssessmentQuery.Where(n => n.era_needassessmentid == Guid.Parse(query.NeedsAssessmentId));

        return (await needsAssessmentQuery.GetAllPagesAsync(ct))
            .Where(n => n.era_EvacuationFile.era_name == query.FileId && n.era_EvacuationFile.statecode == (int)EntityState.Active)
            .Select(n =>
            {
                n.era_EvacuationFile.era_CurrentNeedsAssessmentid = n;
                n.era_EvacuationFile._era_currentneedsassessmentid_value = n.era_needassessmentid;
                return n.era_EvacuationFile;
            })
            .ToArray();
    }

    private async Task<string> CreateNote(EssContext essContext, string fileId, Note note, CancellationToken ct)
    {
        var file = essContext.era_evacuationfiles
            .Where(f => f.era_name == fileId).SingleOrDefault();
        if (file == null) throw new ArgumentException($"Evacuation file {fileId} not found");

        var newNote = mapper.Map<era_essfilenote>(note);
        newNote.era_essfilenoteid = Guid.NewGuid();
        essContext.AddToera_essfilenotes(newNote);
        essContext.AddLink(file, nameof(era_evacuationfile.era_era_evacuationfile_era_essfilenote_ESSFileID), newNote);
        essContext.SetLink(newNote, nameof(newNote.era_ESSFileID), file);

        if (newNote._era_essteamuserid_value.HasValue)
        {
            var user = essContext.era_essteamusers.Where(u => u.era_essteamuserid == newNote._era_essteamuserid_value).SingleOrDefault();
            if (user != null) essContext.AddLink(user, nameof(era_essteamuser.era_era_essteamuser_era_essfilenote_ESSTeamUser), newNote);
        }
        await essContext.SaveChangesAsync(ct);

        essContext.DetachAll();

        return newNote.era_essfilenoteid.ToString();
    }

    private async Task<string> UpdateNote(EssContext essContext, string fileId, Note note, CancellationToken ct)
    {
        var existingNote = await essContext.era_essfilenotes.ByKey(new Guid(note.Id)).GetValueAsync(ct);
        essContext.DetachAll();

        if (existingNote == null) throw new ArgumentException($"Evacuation file note {note.Id} not found");

        var updatedNote = mapper.Map<era_essfilenote>(note);

        updatedNote.era_essfilenoteid = existingNote.era_essfilenoteid;
        essContext.AttachTo(nameof(EssContext.era_essfilenotes), updatedNote);
        essContext.UpdateObject(updatedNote);

        await essContext.SaveChangesAsync(ct);

        essContext.DetachAll();

        return updatedNote.era_essfilenoteid.ToString();
    }

    private async Task<ManageEvacuationFileCommandResult> Handle(AddEligibilityCheck command, CancellationToken ct)
    {
        var ctx = essContextFactory.Create();
        var file = await ctx.era_evacuationfiles.Expand(f => f.era_CurrentNeedsAssessmentid).Where(f => f.era_name == command.EvacuationFileNumber).SingleOrDefaultAsync(ct);
        if (file == null) throw new ArgumentException($"Evacuation file {command.EvacuationFileNumber} not found");

        var eligibilityCheck = mapper.Map<era_eligibilitycheck>(command);
        eligibilityCheck.era_eligibilitycheckid = Guid.NewGuid();

        ctx.AddToera_eligibilitychecks(eligibilityCheck);
        ctx.AddLink(eligibilityCheck, nameof(era_eligibilitycheck.era_era_eligibilitycheck_era_needassessment_EligibilityCheck), file.era_CurrentNeedsAssessmentid);
        ctx.SetLink(eligibilityCheck, nameof(era_eligibilitycheck.era_NeedsAssessment), file.era_CurrentNeedsAssessmentid);
        ctx.SetLink(eligibilityCheck, nameof(era_eligibilitycheck.era_ESSFile), file);
        if (command.HomeAddressReferenceId != null)
        {
            var homeAddress = await ctx.era_bcscaddresses.Where(a => a.era_bcscaddressid == Guid.Parse(command.HomeAddressReferenceId)).SingleOrDefaultAsync(ct);
            if (homeAddress == null) throw new ArgumentException($"Home address id {command.HomeAddressReferenceId} not found");
            ctx.SetLink(eligibilityCheck, nameof(era_eligibilitycheck.era_BCSCAddress), homeAddress);
        }
        if (command.TaskNumber != null)
        {
            var task = await ctx.era_tasks
                .Expand(t => t.era_era_task_era_selfservesupportlimits_Task)
                .Where(t => t.era_name == command.TaskNumber && t.statuscode == 1).SingleOrDefaultAsync(ct);
            if (task == null) throw new ArgumentException($"Task {command.TaskNumber} not found");
            ctx.SetLink(eligibilityCheck, nameof(era_eligibilitycheck.era_Task), task);

            foreach (var support in command.EligibleSupports)
            {
                var supportLimit = task.era_era_task_era_selfservesupportlimits_Task.SingleOrDefault(sl => sl.era_supporttypeoption == (int)support.Type && sl.statecode == 0);
                if (supportLimit == null) throw new InvalidOperationException($"Eligibility has support type {support.Type} which is not enabled for task {task.era_name}");
                var eligibleSupport = new era_eligiblesupport
                {
                    era_eligiblesupportid = Guid.NewGuid(),
                    era_supporteligible = (int)support.EligibilityStatus
                };
                ctx.AddToera_eligiblesupports(eligibleSupport);
                ctx.SetLink(eligibleSupport, nameof(era_eligiblesupport.era_EligibilityCheck), eligibilityCheck);
                ctx.SetLink(eligibleSupport, nameof(era_eligiblesupport.era_SelfServeSupportLimit), supportLimit);
            }
        }
        await ctx.SaveChangesAsync(ct);

        return new ManageEvacuationFileCommandResult { Id = eligibilityCheck.era_eligibilitycheckid.ToString() };
    }

    private async Task<ManageEvacuationFileCommandResult> Handle(OptoutSelfServe c, CancellationToken ct)
    {
        var ctx = essContextFactory.Create();
        var file = await ctx.era_evacuationfiles.Expand(f => f.era_CurrentNeedsAssessmentid).Where(f => f.era_name == c.EvacuationFileNumber).SingleOrDefaultAsync(ct);
        if (file == null || file.era_CurrentNeedsAssessmentid == null) throw new InvalidOperationException($"Evacuation file {c.EvacuationFileNumber} not found");
        await ctx.LoadPropertyAsync(file.era_CurrentNeedsAssessmentid, nameof(era_needassessment.era_EligibilityCheck), ct);
        var check = file.era_CurrentNeedsAssessmentid.era_EligibilityCheck;
        if (check != null)
        {
            check.era_selfserveoptout = true;
            ctx.UpdateObject(check);
            await ctx.SaveChangesAsync(ct);
        }
        return new ManageEvacuationFileCommandResult { Id = check?.era_eligibilitycheckid?.ToString() };
    }

    private async Task<ManageEvacuationFileCommandResult> Handle(AssignFileToTask cmd, CancellationToken ct)
    {
        var ctx = essContextFactory.Create();
        var file = await ctx.era_evacuationfiles.Expand(f => f.era_CurrentNeedsAssessmentid).Where(f => f.era_name == cmd.EvacuationFileNumber).SingleOrDefaultAsync(ct);
        if (file == null) throw new ArgumentException($"Evacuation file {cmd.EvacuationFileNumber} not found");

        AssignToTask(ctx, file, cmd.TaskNumber);

        await ctx.SaveChangesAsync(ct);
        return new ManageEvacuationFileCommandResult { Id = cmd.EvacuationFileNumber };
    }
}
