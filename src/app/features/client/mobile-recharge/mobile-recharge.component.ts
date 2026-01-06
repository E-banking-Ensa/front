import {ChangeDetectorRef, Component} from '@angular/core';
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-mobile-recharge',
  templateUrl: './mobile-recharge.component.html',
  styleUrls: ['./mobile-recharge.component.scss'],
  imports: [
    DatePipe,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    NgClass
  ],
  standalone: true
})
export class MobileRechargeComponent {
  rechargeForm: FormGroup;
  operators = [
    {
      name: 'Orange',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Orange_logo.svg/200px-Orange_logo.svg.png'
    },
    {
      name: 'IAM',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Maroc_Telecom.svg'
    },
    {
      name: 'Inwi',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Logo_inwi.svg'
    }
  ];
  presetAmounts = [5, 10, 20, 30, 50, 100];

  selectedOperator: string | null = null;
  selectedAmount: number | null = null;
  customAmountValue: number | null = null;
  history: any[] = [];
  isLoading = false;
  statusMessage = '';
  isError = false;
  showStatus = false;

  config: any = {
    page_title: "Recharge Téléphonique",
    subtitle: "Rechargez votre mobile en quelques clics",
    button_text: "💳 Recharger maintenant",
    background_color: "#667eea",
    card_color: "#ffffff",
    primary_color: "#3b82f6",
    text_color: "#1f2937",
    accent_color: "#22c55e",
    font_family: "system-ui",
    font_size: 16
  };

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.rechargeForm = this.fb.group({
      phone: ['', Validators.required],
      customAmount: ['']
    });
  }

  ngOnInit(): void {
    this.initDataSdk();
    this.initElementSdk();
  }

  get bodyBackground(): string {
    return `linear-gradient(135deg, ${this.config.background_color} 0%, #764ba2 100%)`;
  }

  get sortedHistory() {
    return [...this.history].sort((a, b) =>
      new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime()
    );
  }

  get currentAmount(): number {
    return this.selectedAmount || this.customAmountValue || 0;
  }

  async initDataSdk() {
    if (window.dataSdk) {
      await window.dataSdk.init({
        onDataChanged: (data: any[]) => {
          this.history = data || [];
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
          ["subtitle", config.subtitle],
          ["button_text", config.button_text]
        ])
      });
    }
  }

  selectOperator(opName: string) {
    this.selectedOperator = opName;
  }

  selectPresetAmount(amount: number) {
    this.selectedAmount = amount;
    this.customAmountValue = null;
    this.rechargeForm.patchValue({ customAmount: '' });
  }

  onCustomAmountInput(event: any) {
    const val = parseFloat(event.target.value);
    if (val > 0) {
      this.customAmountValue = val;
      this.selectedAmount = null;
    } else {
      this.customAmountValue = null;
    }
  }

  async onSubmit() {
    if (this.isLoading) return;

    const phone = this.rechargeForm.get('phone')?.value;
    const amount = this.currentAmount;

    if (!this.selectedOperator) {
      this.displayStatus('⚠️ Veuillez sélectionner un opérateur', true);
      return;
    }
    if (!phone) {
      this.displayStatus('⚠️ Veuillez entrer un numéro de téléphone', true);
      return;
    }
    if (amount <= 0) {
      this.displayStatus('⚠️ Veuillez sélectionner un montant', true);
      return;
    }
    if (this.history.length >= 999) {
      this.displayStatus('⚠️ Limite de 999 recharges atteinte.', true);
      return;
    }

    this.isLoading = true;

    const rechargeData = {
      id: Date.now().toString(),
      operator: this.selectedOperator,
      phone_number: phone,
      amount: amount,
      transaction_date: new Date().toISOString(),
      status: 'Réussie'
    };

    const result = await window.dataSdk.create(rechargeData);
    this.isLoading = false;

    if (result.isOk) {
      this.displayStatus('✅ Recharge effectuée avec succès !', false);
      this.resetForm();
    } else {
      this.displayStatus('❌ Erreur lors de la recharge.', true);
    }
  }

  resetForm() {
    this.rechargeForm.reset();
    this.selectedOperator = null;
    this.selectedAmount = null;
    this.customAmountValue = null;
  }

  displayStatus(msg: string, isErr: boolean) {
    this.statusMessage = msg;
    this.isError = isErr;
    this.showStatus = true;
    setTimeout(() => {
      this.showStatus = false;
      this.cdr.detectChanges();
    }, 4000);
  }
}



