import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StepEssFileService } from '../../step-ess-file/step-ess-file.service';
import * as globalConst from '../../../../core/services/global-constants';
import { WizardService } from '../../wizard.service';
import { AlertService } from 'src/app/shared/components/alert/alert.service';
import { EssFileService } from 'src/app/core/services/ess-file.service';
import { EvacuationFileModel } from 'src/app/core/models/evacuation-file.model';
import { EvacueeSessionService } from 'src/app/core/services/evacuee-session.service';
import { TabModel } from 'src/app/core/models/tab.model';
import { AppBaseService } from 'src/app/core/services/helper/appBase.service';
import { LoadEvacueeListService } from 'src/app/core/services/load-evacuee-list.service';

@Component({
  selector: 'app-ess-file-review',
  templateUrl: './ess-file-review.component.html',
  styleUrls: ['./ess-file-review.component.scss']
})
export class EssFileReviewComponent implements OnInit, OnDestroy {
  taskNumber: string;
  tabUpdateSubscription: Subscription;
  essFileNumber: string;
  saveLoader = false;
  disableButton = false;
  wizardType: string;
  insuranceDisplay: string;
  needs: string[] = [];

  memberColumns: string[] = ['firstName', 'lastName', 'initials', 'gender', 'dateOfBirth'];

  petColumns: string[] = ['type', 'quantity'];
  tabMetaData: TabModel;
  noAssistanceRequiredMessage = globalConst.noAssistanceRequired; 

  constructor(
    public stepEssFileService: StepEssFileService,
    public evacueeSessionService: EvacueeSessionService,
    private router: Router,
    private wizardService: WizardService,
    private essFileService: EssFileService,
    private alertService: AlertService,
    private appBaseService: AppBaseService
  ) {}

  ngOnInit(): void {
    this.wizardType = this.appBaseService?.wizardProperties?.wizardType;
    this.taskNumber = this.stepEssFileService.getTaskNumber(this.wizardType);
    this.essFileNumber = this.appBaseService?.appModel?.selectedEssFile?.id;

    // Set "update tab status" method, called for any tab navigation
    this.tabUpdateSubscription = this.stepEssFileService.nextTabUpdate.subscribe(() => {
      this.updateTabStatus();
    });
    this.tabMetaData = this.stepEssFileService.getNavLinks('review');
  }

  /**
   * Go back to the Security Phrase tab
   */
  back(): void {
    this.router.navigate([this.tabMetaData?.previous]);
  }

  /**
   * Create or update ESS File and continue to Step 3
   */
  save(): void {
    this.stepEssFileService.nextTabUpdate.next();
    this.stepEssFileService.needsAssessmentSubmitFlag = false;
    this.saveLoader = true;

    if (!this.appBaseService?.appModel?.selectedEssFile?.id) {
      this.createNewEssFile();
    } else {
      this.editEssFile();
    }
  }

  /**
   * Checks the wizard validity and updates the tab status
   */
  updateTabStatus() {
    // If all other tabs are complete and this tab has been viewed, mark complete
    if (!this.stepEssFileService.checkTabsStatus()) {
      this.stepEssFileService.setTabStatus('review', 'complete');
    }
  }

  /**
   * When navigating away from tab, update variable value and status indicator
   */
  ngOnDestroy(): void {
    this.stepEssFileService.nextTabUpdate.next();
    this.tabUpdateSubscription.unsubscribe();
  }

  /**
   * Calls Create new ESS File API
   */
  private createNewEssFile() {
    this.essFileService.createFile(this.stepEssFileService.createEvacFileDTO()).subscribe({
      next: (essFile: EvacuationFileModel) => {
        // After creating and fetching ESS File, update ESS File Step values
        this.stepEssFileService.setFormValuesFromFile(essFile);
        // Once all profile work is done, user can close wizard or proceed to step 3
        this.disableButton = true;
        this.saveLoader = false;

        this.stepEssFileService
          .openModal(globalConst.newRegWizardEssFileCreatedMessage)
          .afterClosed()
          .subscribe((event) => {
            this.wizardService.setStepStatus('/ess-wizard/add-supports', false);
            this.wizardService.setStepStatus('/ess-wizard/add-notes', false);

            if (event === 'exit') {
              this.router.navigate(['responder-access/search/essfile-dashboard']);
            } else {
              this.router.navigate(['/ess-wizard/add-supports'], {
                state: { step: 'STEP 3', title: 'Add Supports' }
              });
              this.stepEssFileService.setReviewEssFileTabStatus();
            }
          });
      },
      error: (error) => {
        this.saveLoader = false;
        this.alertService.clearAlert();
        this.alertService.setAlert('danger', globalConst.createEssFileError);
      }
    });
  }

  /**
   * Calls Update ESS File API either when Review ESS File or Complete ESS File process is triggered
   */
  private editEssFile() {
    this.essFileService
      .updateFile(this.appBaseService?.appModel?.selectedEssFile?.id, this.stepEssFileService.updateEvacFileDTO())
      .subscribe({
        next: (essFile: EvacuationFileModel) => {
          // After creating and fetching ESS File, update ESS File Step values
          this.stepEssFileService.setFormValuesFromFile(essFile);
          // Once all profile work is done, user can close wizard or proceed to step 3
          this.disableButton = true;
          this.saveLoader = false;

          this.stepEssFileService
            .openModal(globalConst.newRegWizardEssFileCreatedMessage)
            .afterClosed()
            .subscribe((event) => {
              this.wizardService.setStepStatus('/ess-wizard/add-supports', false);
              this.wizardService.setStepStatus('/ess-wizard/add-notes', false);

              if (event === 'exit') {
                this.router.navigate(['responder-access/search/essfile-dashboard']);
              } else {
                this.router.navigate(['/ess-wizard/add-supports'], {
                  state: { step: 'STEP 3', title: 'Add Supports' }
                });
                this.stepEssFileService.setReviewEssFileTabStatus();
              }
            });
        },
        error: (error) => {
          this.saveLoader = false;
          this.alertService.clearAlert();
          this.alertService.setAlert('danger', globalConst.editEssFileError);
        }
      });
  }
}
