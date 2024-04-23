import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-eligible-self-serve-opt-out-dialog',
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <div class="row">
      <div class="col-10">
        <h1 mat-dialog-title>Interac e-Transfer Opt-Out</h1>
      </div>
      <div class="col-2">
        <button class="close-image close-button-style" mat-icon-button aria-label="Close" mat-dialog-close>
          <img src="/assets/images/close.svg" height="20" width="20" />
          <img src="/assets/images/close_onhover.svg" height="20" width="20" />
        </button>
      </div>
    </div>

    <mat-dialog-content>
      <p>Are you sure you want to <b>opt out of self-serve e-transfer</b>?</p>
    </mat-dialog-content>

    <mat-dialog-actions>
      <button class="button-s" cdkFocusInitial mat-button mat-dialog-close>No, Cancel</button>
      <button class="button-p" mat-button [mat-dialog-close]="true">Yes, Continue</button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: var(--size-3);
      }
    `
  ]
})
export class EligibleSelfServeOptOutDialogComponent {}
