import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-consent-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <h2>Créer Consentement</h2>
    <form (ngSubmit)="submit()" #form="ngForm">
      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Code</mat-label>
        <input matInput [(ngModel)]="code" name="code" required>
      </mat-form-field>

      <mat-form-field appearance="fill" class="full-width">
        <mat-label>Nom</mat-label>
        <input matInput [(ngModel)]="name" name="name" required>
      </mat-form-field>

      <div class="buttons">
        <button mat-button type="button" (click)="close()">Annuler</button>
        <button mat-raised-button color="primary" type="submit" [disabled]="!form.valid">Créer</button>
      </div>
    </form>
  `,
  styles: [`
    .full-width { width: 100%; }
    .buttons { display: flex; justify-content: flex-end; margin-top: 15px; gap: 10px; }
    h2 { margin-bottom: 15px; }
  `]
})
export class CreateConsentDialogComponent {
  code: string = '';
  name: string = '';

  constructor(
    public dialogRef: MatDialogRef<CreateConsentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  submit() {
    this.dialogRef.close({ code: this.code, name: this.name });
  }

  close() {
    this.dialogRef.close();
  }
}
