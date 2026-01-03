import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AgentService } from '../../../../core/services/agent.service';
import { CreateUserRequestDto } from '../../../../core/models/CreateUserRequestDto';

@Component({
  selector: 'app-add-agent-dialog',
  standalone: true,
  templateUrl: './add-agent-dialog.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,

    // 🔴 OBLIGATOIRE POUR mat-dialog-*
    MatDialogModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class AddAgentDialogComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private agentService: AgentService,
    private dialogRef: MatDialogRef<AddAgentDialogComponent>
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      adresse: ['', Validators.required]
    });
  }

  save(): void {
    if (this.form.invalid) return;

    const payload: CreateUserRequestDto = {
      ...this.form.value,
      role: 'Agent'
    };

    this.agentService.createAgent(payload).subscribe({
      next: () => this.dialogRef.close(true),
      error: err => console.error('Erreur création agent', err)
    });
  }

  close(): void {
    this.dialogRef.close(false);
  }
}
