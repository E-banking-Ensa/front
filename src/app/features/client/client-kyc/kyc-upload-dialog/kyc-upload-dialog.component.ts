import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-kyc-upload-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule
  ],
  templateUrl: './kyc-upload-dialog.component.html',
  styleUrls: ['./kyc-upload-dialog.component.scss']
})
export class KycUploadDialogComponent {

  selectedDocumentType: string = '';
  selectedFile: File | null = null;
  documentTypes: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<KycUploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.documentTypes = data.documentTypes || [];
  }

  /**
   * Gère la sélection du fichier
   */
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('%c📎 Fichier sélectionné:', 'color: blue;', file.name);
    }
  }

  /**
   * Annule la boîte de dialogue
   */
  onCancel(): void {
    this.dialogRef.close();
  }

  /**
   * Valide et envoie le formulaire
   */
  onSubmit(): void {
    if (!this.selectedDocumentType) {
      alert('⚠️ Veuillez sélectionner un type de document');
      return;
    }

    if (!this.selectedFile) {
      alert('⚠️ Veuillez sélectionner un fichier');
      return;
    }

    console.log('%c✅ Envoi du formulaire:', 'color: green;', {
      documentType: this.selectedDocumentType,
      fileName: this.selectedFile.name
    });

    this.dialogRef.close({
      documentType: this.selectedDocumentType,
      file: this.selectedFile
    });
  }

  /**
   * Retourne le label du type de document sélectionné
   */
  getSelectedDocumentLabel(): string {
    const doc = this.documentTypes.find(d => d.value === this.selectedDocumentType);
    return doc ? doc.label : '';
  }
}
