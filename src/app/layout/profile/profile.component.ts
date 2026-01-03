import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

declare global {
  interface Window {
    dataSdk: any;
    elementSdk: any;
  }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: false
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  currentProfile: any = null;
  isLoading = false;
  statusMessage: string = '';
  isError = false;
  showStatus = false;
  hasProfile = false;

  config: any = {
    page_title: "Mon Profil",
    welcome_message: "Bienvenue sur votre espace personnel",
    background_color: "#1e3a8a",
    card_color: "#ffffff",
    primary_color: "#3b82f6",
    text_color: "#1f2937",
    accent_color: "#22c55e",
    font_family: "system-ui",
    font_size: 16
  };

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.profileForm = this.fb.group({
      full_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      account_number: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    this.initDataSdk();
    this.initElementSdk();
  }

  get bodyBackground(): string {
    return `linear-gradient(135deg, ${this.config.background_color} 0%, ${this.config.primary_color} 100%)`;
  }

  async initDataSdk() {
    if (window.dataSdk) {
      const initResult = await window.dataSdk.init({
        onDataChanged: (data: any[]) => {
          if (data && data.length > 0) {
            this.currentProfile = data[0];
            this.hasProfile = true;
            this.updateForm(this.currentProfile);
          } else {
            this.currentProfile = null;
            this.hasProfile = false;
            this.profileForm.reset();
          }
          this.cdr.detectChanges();
        }
      });
    }
  }

  initElementSdk() {
    if (window.elementSdk) {
      window.elementSdk.init({
        defaultConfig: this.config,
        onConfigChange: (newConfig: any) => {
          this.config = { ...this.config, ...newConfig };
          this.cdr.detectChanges();
        },
        mapToCapabilities: (config: any) => ({
          recolorables: [
            { get: () => config.background_color, set: (v: any) => window.elementSdk.setConfig({ background_color: v }) },
            { get: () => config.card_color, set: (v: any) => window.elementSdk.setConfig({ card_color: v }) },
            { get: () => config.text_color, set: (v: any) => window.elementSdk.setConfig({ text_color: v }) },
            { get: () => config.primary_color, set: (v: any) => window.elementSdk.setConfig({ primary_color: v }) },
            { get: () => config.accent_color, set: (v: any) => window.elementSdk.setConfig({ accent_color: v }) }
          ],
          fontEditable: {
            get: () => config.font_family, set: (v: any) => window.elementSdk.setConfig({ font_family: v })
          },
          fontSizeable: {
            get: () => config.font_size, set: (v: any) => window.elementSdk.setConfig({ font_size: v })
          }
        }),
        mapToEditPanelValues: (config: any) => new Map([
          ["page_title", config.page_title],
          ["welcome_message", config.welcome_message]
        ])
      });
    }
  }

  updateForm(profile: any) {
    this.profileForm.patchValue({
      full_name: profile.full_name,
      email: profile.email,
      phone: profile.phone,
      address: profile.address,
      account_number: profile.account_number
    });
  }

  async onSubmit() {
    if (this.profileForm.invalid || this.isLoading) return;

    this.isLoading = true;
    const formValues = this.profileForm.getRawValue();

    const profileData = {
      ...formValues,
      account_number: this.currentProfile?.account_number || this.generateAccountNumber(),
      balance: this.currentProfile?.balance || 0,
      updated_at: new Date().toISOString()
    };

    let result;
    if (this.currentProfile) {
      result = await window.dataSdk.update({ ...this.currentProfile, ...profileData });
    } else {
      profileData.id = Date.now().toString();
      result = await window.dataSdk.create(profileData);
    }

    this.isLoading = false;
    this.displayStatus(
      result.isOk ? '✅ Profil enregistré avec succès !' : '❌ Erreur lors de l\'enregistrement.',
      !result.isOk
    );
  }

  onCancel() {
    if (this.currentProfile) {
      this.updateForm(this.currentProfile);
    } else {
      this.profileForm.reset();
    }
    this.displayStatus('🔄 Modifications annulées', false);
  }

  private displayStatus(message: string, isError: boolean) {
    this.statusMessage = message;
    this.isError = isError;
    this.showStatus = true;
    setTimeout(() => {
      this.showStatus = false;
      this.cdr.detectChanges();
    }, 3000);
  }

  private generateAccountNumber() {
    return 'FR' + Math.random().toString().slice(2, 12) + Math.random().toString().slice(2, 12);
  }
}
