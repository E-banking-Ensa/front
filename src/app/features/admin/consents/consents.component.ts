import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { ConsentService } from '../../../core/services/consent.service';
import { ConsentTypeDto } from '../../../core/models/ConsentTypeDto';
import { ConsentTypeRequest } from '../../../core/models/ConsentTypeRequest';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateConsentDialogComponent } from './create-consent-dialog.component'; // notre modal

@Component({
  selector: 'app-consent-types',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatCardModule,
    DatePipe,
    MatDialogModule
  ],
  templateUrl: './consents.component.html',
  styleUrls: ['./consents.component.scss']
})
export class ConsentTypesComponent implements OnInit {

  consentTypes: ConsentTypeDto[] = [];
  activeCount: number = 0;
  inactiveCount: number = 0;

  constructor(
    private consentService: ConsentService,
    private cd: ChangeDetectorRef,
    private dialog: MatDialog   // 🔹 injection du dialog
  ) { }


  ngOnInit(): void {
    this.loadConsentTypes();
  }

  loadConsentTypes(): void {
    this.consentService.getAllConsentTypes().subscribe({
      next: (data) => {
        console.log('Consent types récupérés', data);

        // Conversion des dates en objet Date pour Angular
        this.consentTypes = (data || []).map(c => ({
          ...c,
          grantedAt: new Date(c.grantedAt),
          updatedAt: new Date(c.updatedAt)
        }));

        this.calculateCounts();

        // ⚡ Forcer Angular à détecter les changements pour éviter NG0100
        this.cd.detectChanges();
      },
      error: (err) => console.error('Erreur récupération consent types', err)
    });
  }

  calculateCounts(): void {
    this.activeCount = this.consentTypes.filter(c => c.isActive).length;
    this.inactiveCount = this.consentTypes.filter(c => !c.isActive).length;
  }

  createConsentType(): void {
    const dialogRef = this.dialog.open(CreateConsentDialogComponent, {
      width: '400px', // petite modal
      data: {}        // tu peux passer des données initiales si besoin
    });

    // après fermeture de la modal
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // result contient l'objet {code, name}
        this.consentService.createConsentType(result).subscribe({
          next: () => this.loadConsentTypes(),
          error: err => console.error('Erreur création consent type', err)
        });
      }
    });
  }


  // createConsentType(): void {
  //   const request: ConsentTypeRequest = { code: 'NEW_CODE', name: 'Nouveau Consentement' };
  //   this.consentService.createConsentType(request).subscribe({
  //     next: () => this.loadConsentTypes(),
  //     error: err => console.error('Erreur création consent type', err)
  //   });
  // }

  activate(type: ConsentTypeDto): void {
    this.consentService.activateConsentType(type.consentTypeId).subscribe({
      next: () => this.loadConsentTypes(),
      error: err => console.error('Erreur activation', err)
    });
  }

  deactivate(type: ConsentTypeDto): void {
    this.consentService.deactivateConsentType(type.consentTypeId).subscribe({
      next: () => this.loadConsentTypes(),
      error: err => console.error('Erreur désactivation', err)
    });
  }

  delete(type: ConsentTypeDto): void {
    this.consentService.deleteConsentType(type.consentTypeId).subscribe({
      next: () => this.loadConsentTypes(),
      error: err => console.error('Erreur suppression', err)
    });
  }
}



// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MatTableModule } from '@angular/material/table';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatChipsModule } from '@angular/material/chips';
// import { MatCardModule } from '@angular/material/card';
// import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { ConsentTypeDto } from '../../../core/models/ConsentTypeDto';
//
// @Component({
//   selector: 'app-consents',
//   standalone: true,
//   templateUrl: './consents.component.html',
//   styleUrls: ['./consents.component.scss'],
//   imports: [
//     CommonModule,
//     MatTableModule,
//     MatButtonModule,
//     MatIconModule,
//     MatChipsModule,
//     MatCardModule,
//     MatProgressBarModule
//   ]
// })
// export class ConsentsComponent implements OnInit {
//
//   displayedColumns: string[] = [
//     'consentTypeId',
//     'code',
//     'isActive',
//     'nbr',
//     'grantedAt',
//     'updatedAt',
//     'actions'
//   ];
//
//   consents: ConsentTypeDto[] = [
//     {
//       consentTypeId: 'CT-001',
//       code: 'AIS',
//       isActive: true,
//       nbr: 12,
//       grantedAt: new Date('2024-01-15'),
//       updatedAt: new Date('2024-12-28')
//     },
//     {
//       consentTypeId: 'CT-002',
//       code: 'PIS',
//       isActive: false,
//       nbr: 5,
//       grantedAt: new Date('2023-06-10'),
//       updatedAt: new Date('2024-06-05')
//     },
//     {
//       consentTypeId: 'CT-003',
//       code: 'AISP',
//       isActive: true,
//       nbr: 8,
//       grantedAt: new Date('2024-02-20'),
//       updatedAt: new Date('2024-12-30')
//     }
//   ];
//
//   // Statistiques
//   get totalConsents(): number {
//     return this.consents.length;
//   }
//
//   get consentsActifs(): number {
//     return this.consents.filter(c => c.isActive).length;
//   }
//
//   get consentsInactifs(): number {
//     return this.consents.filter(c => !c.isActive).length;
//   }
//
//   ngOnInit(): void {
//     // Charger depuis API si nécessaire
//   }
//
//   onViewDetails(consent: ConsentTypeDto): void {
//     console.log('Voir détails:', consent);
//   }
//
//   onToggleStatus(consent: ConsentTypeDto): void {
//     consent.isActive = !consent.isActive;
//     console.log('Changement status:', consent);
//   }
// }



// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { MatTableModule } from '@angular/material/table';
// import { MatButtonModule } from '@angular/material/button';
// import { MatIconModule } from '@angular/material/icon';
// import { MatChipsModule } from '@angular/material/chips';
// import { MatCardModule } from '@angular/material/card';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { ConsentTypeDto} from '../../../core/models/ConsentTypeDto';
//
// interface Consent {
//   id: string;
//   clientNom: string;
//   serviceProvider: string;
//   type: 'AIS' | 'PIS' | 'AISP';
//   status: 'actif' | 'expiré' | 'révoqué' | 'en_attente';
//   dateCreation: Date;
//   dateExpiration: Date;
//   permissions: string[];
//   derniereUtilisation?: Date;
// }
//
// @Component({
//   selector: 'app-consents',
//   standalone: true,
//   templateUrl: './consents.component.html',
//   styleUrls: ['./consents.component.scss'],
//   imports: [
//     CommonModule,
//     MatTableModule,
//     MatButtonModule,
//     MatIconModule,
//     MatChipsModule,
//     MatCardModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatMenuModule,
//     MatProgressBarModule
//   ]
// })
// export class ConsentsComponent implements OnInit {
//   displayedColumns: string[] = ['id', 'clientNom', 'serviceProvider', 'type', 'status', 'dateCreation', 'dateExpiration', 'derniereUtilisation', 'actions'];
//
//   consents: Consent[] = [
//     {
//       id: 'CNS-2024-001',
//       clientNom: 'Jean Dupont',
//       serviceProvider: 'PayPal Integration',
//       type: 'AIS',
//       status: 'actif',
//       dateCreation: new Date('2024-01-15'),
//       dateExpiration: new Date('2025-01-15'),
//       permissions: ['Lecture des comptes', 'Lecture des transactions', 'Solde'],
//       derniereUtilisation: new Date('2024-12-28')
//     },
//     {
//       id: 'CNS-2024-002',
//       clientNom: 'Alice Martin',
//       serviceProvider: 'Budget Manager App',
//       type: 'AISP',
//       status: 'actif',
//       dateCreation: new Date('2024-02-20'),
//       dateExpiration: new Date('2025-02-20'),
//       permissions: ['Informations de compte', 'Historique des transactions'],
//       derniereUtilisation: new Date('2024-12-30')
//     },
//     {
//       id: 'CNS-2024-003',
//       clientNom: 'Sophie Durand',
//       serviceProvider: 'E-commerce Store',
//       type: 'PIS',
//       status: 'expiré',
//       dateCreation: new Date('2023-06-10'),
//       dateExpiration: new Date('2024-06-10'),
//       permissions: ['Initiation de paiement'],
//       derniereUtilisation: new Date('2024-06-05')
//     },
//     {
//       id: 'CNS-2024-004',
//       clientNom: 'Thomas Blanc',
//       serviceProvider: 'Investment Platform',
//       type: 'AIS',
//       status: 'révoqué',
//       dateCreation: new Date('2024-03-12'),
//       dateExpiration: new Date('2025-03-12'),
//       permissions: ['Lecture des comptes', 'Analyse financière'],
//       derniereUtilisation: new Date('2024-11-20')
//     },
//     {
//       id: 'CNS-2024-005',
//       clientNom: 'Emma Rousseau',
//       serviceProvider: 'Tax Management Tool',
//       type: 'AISP',
//       status: 'en_attente',
//       dateCreation: new Date('2024-12-28'),
//       dateExpiration: new Date('2025-12-28'),
//       permissions: ['Relevés bancaires', 'Détails des transactions'],
//     },
//     {
//       id: 'CNS-2024-006',
//       clientNom: 'Robert Lemoine',
//       serviceProvider: 'Payment Gateway',
//       type: 'PIS',
//       status: 'actif',
//       dateCreation: new Date('2024-05-18'),
//       dateExpiration: new Date('2025-05-18'),
//       permissions: ['Paiements récurrents', 'Virement instantané'],
//       derniereUtilisation: new Date('2024-12-31')
//     }
//   ];
//
//   get totalConsents(): number {
//     return this.consents.length;
//   }
//
//   get consentsActifs(): number {
//     return this.consents.filter(c => c.status === 'actif').length;
//   }
//
//   get consentsExpires(): number {
//     return this.consents.filter(c => c.status === 'expiré').length;
//   }
//
//   get consentsEnAttente(): number {
//     return this.consents.filter(c => c.status === 'en_attente').length;
//   }
//
//   ngOnInit(): void {
//     // Charger les données depuis l'API
//   }
//
//   getDaysRemaining(expiration: Date): number {
//     const today = new Date();
//     const diff = expiration.getTime() - today.getTime();
//     return Math.ceil(diff / (1000 * 3600 * 24));
//   }
//
//   getExpirationPercentage(creation: Date, expiration: Date): number {
//     const total = expiration.getTime() - creation.getTime();
//     const elapsed = new Date().getTime() - creation.getTime();
//     return Math.min(100, (elapsed / total) * 100);
//   }
//
//   onViewDetails(consent: Consent): void {
//     console.log('Voir détails:', consent);
//   }
//
//   onRevoke(consent: Consent): void {
//     console.log('Révoquer consent:', consent);
//   }
//
//   onRenew(consent: Consent): void {
//     console.log('Renouveler consent:', consent);
//   }
//
//   onApprove(consent: Consent): void {
//     console.log('Approuver consent:', consent);
//   }
// }
