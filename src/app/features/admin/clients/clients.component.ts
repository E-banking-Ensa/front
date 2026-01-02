import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { ClientService } from '../../../core/services/client.service';
import { ClientDto } from '../../../core/models/ClientDto';

interface Client {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  status: string;
  kycStatus: string;
  comptes: number;
  soldeTotal: number;
  dateInscription: Date;
}

@Component({
  selector: 'app-clients',
  standalone: true,
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatTabsModule
  ]
})
export class ClientsComponent implements OnInit {
  displayedColumns: string[] = [ 'nom', 'email', 'telephone', 'status', 'kycStatus', 'comptes', 'soldeTotal', 'actions'];
  clients: Client[] = [];

  constructor(private clientService: ClientService,
              private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getAllClients().subscribe({
      next: (data: ClientDto[]) => {
        this.clients = data.map(c => ({
          id: c.clientId,
          nom: `${c.firstName} ${c.lastName}`,
          email: c.email,
          telephone: c.phoneNumber,
          status: c.status,
          kycStatus: c.kycStatus,
          comptes: 0,      // Ajuster si tu récupères cette info depuis le backend
          soldeTotal: 0,   // Ajuster si tu récupères cette info depuis le backend
          dateInscription: new Date(c.createdAt)
        }));

        // 🔹 Résout NG0100
        this.cd.detectChanges();
      },
      error: (err) => console.error('Erreur récupération clients', err)
    });
  }

  // ✅ Statistiques
  get totalClients(): number {
    return this.clients.length;
  }

  get clientsActifs(): number {
    return this.clients.filter(c => c.status === 'actif').length;
  }

  get kycEnCours(): number {
    return this.clients.filter(c => c.kycStatus === 'en_cours').length;
  }

  get soldeTotalGlobal(): number {
    return this.clients.reduce((sum, c) => sum + c.soldeTotal, 0);
  }

  // Actions
  onViewDetails(client: Client): void {
    console.log('Voir détails:', client);
  }

  onEdit(client: Client): void {
    console.log('Modifier:', client);
  }

  onSuspend(client: Client): void {
    console.log('Suspendre:', client);
  }

  onValidateKYC(client: Client): void {
    console.log('Valider KYC:', client);
  }
}





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
// import { MatTabsModule } from '@angular/material/tabs';
// import { ClientService } from '../../../core/services/client.service';
// import { ClientDto } from '../../../core/models/ClientDto';
//
// interface Client {
//   id: string;
//   nom: string;
//   email: string;
//   telephone: string;
//   status: string;
//   kycStatus: string;
//   comptes: number;
//   soldeTotal: number;
//   dateInscription: Date;
// }
//
// @Component({
//   selector: 'app-clients',
//   standalone: true,
//   templateUrl: './clients.component.html',
//   styleUrls: ['./clients.component.scss'],
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
//     MatTabsModule
//   ]
// })
// export class ClientsComponent implements OnInit {
//   displayedColumns: string[] = ['id', 'nom', 'email', 'telephone', 'status', 'kycStatus', 'comptes', 'soldeTotal', 'actions'];
//
//   clients: Client[] = [];
//
//   constructor(private clientService: ClientService) {}
//
//   ngOnInit(): void {
//     this.loadClients();
//   }
//
//   loadClients(): void {
//     this.clientService.getAllClients().subscribe({
//       next: (data: ClientDto[]) => {
//         // Transformation des données backend en format front
//         this.clients = data.map(c => ({
//           id: c.clientId,
//           nom: `${c.firstName} ${c.lastName}`,
//           email: c.email,
//           telephone: c.phoneNumber,
//           status: c.status,
//           kycStatus: c.kycStatus,
//           comptes: 0, // si tu n'as pas cette info, mettre 0 ou récupérer d'un autre endpoint
//           soldeTotal: 0, // idem
//           dateInscription: new Date(c.createdAt)
//         }));
//       },
//       error: (err) => console.error('Erreur récupération clients', err)
//     });
//   }
//
//   get totalClients(): number {
//     return this.clients.length;
//   }
//
//   get clientsActifs(): number {
//     return this.clients.filter(c => c.status === 'actif').length;
//   }
//
//   get kycEnCours(): number {
//     return this.clients.filter(c => c.kycStatus === 'en_cours').length;
//   }
//
//   get soldeTotalGlobal(): number {
//     return this.clients.reduce((sum, c) => sum + c.soldeTotal, 0);
//   }
//
//   onViewDetails(client: Client): void {
//     console.log('Voir détails:', client);
//   }
//
//   onEdit(client: Client): void {
//     console.log('Modifier:', client);
//   }
//
//   onSuspend(client: Client): void {
//     console.log('Suspendre:', client);
//   }
//
//   onValidateKYC(client: Client): void {
//     console.log('Valider KYC:', client);
//   }
// }
//


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
// import { MatTabsModule } from '@angular/material/tabs';
//
// interface Client {
//   id: number;
//   nom: string;
//   email: string;
//   telephone: string;
//   status: 'actif' | 'en_attente' | 'suspendu';
//   kycStatus: 'validé' | 'en_cours' | 'refusé';
//   comptes: number;
//   soldeTotal: number;
//   dateInscription: Date;
// }
//
// @Component({
//   selector: 'app-clients',
//   standalone: true,
//   templateUrl: './clients.component.html',
//   styleUrls: ['./clients.component.scss'],
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
//     MatTabsModule
//   ]
// })
// export class ClientsComponent implements OnInit {
//   displayedColumns: string[] = ['id', 'nom', 'email', 'telephone', 'status', 'kycStatus', 'comptes', 'soldeTotal', 'actions'];
//
//   clients: Client[] = [
//     {
//       id: 1001,
//       nom: 'Jean Dupont',
//       email: 'jean.dupont@email.com',
//       telephone: '+33 6 11 22 33 44',
//       status: 'actif',
//       kycStatus: 'validé',
//       comptes: 2,
//       soldeTotal: 45678.50,
//       dateInscription: new Date('2024-01-10')
//     },
//     {
//       id: 1002,
//       nom: 'Alice Martin',
//       email: 'alice.martin@email.com',
//       telephone: '+33 6 22 33 44 55',
//       status: 'actif',
//       kycStatus: 'validé',
//       comptes: 3,
//       soldeTotal: 128456.80,
//       dateInscription: new Date('2024-02-15')
//     },
//     {
//       id: 1003,
//       nom: 'Robert Lemoine',
//       email: 'robert.lemoine@email.com',
//       telephone: '+33 6 33 44 55 66',
//       status: 'en_attente',
//       kycStatus: 'en_cours',
//       comptes: 0,
//       soldeTotal: 0,
//       dateInscription: new Date('2024-12-20')
//     },
//     {
//       id: 1004,
//       nom: 'Sophie Durand',
//       email: 'sophie.durand@email.com',
//       telephone: '+33 6 44 55 66 77',
//       status: 'actif',
//       kycStatus: 'validé',
//       comptes: 1,
//       soldeTotal: 8934.25,
//       dateInscription: new Date('2024-03-05')
//     },
//     {
//       id: 1005,
//       nom: 'Thomas Blanc',
//       email: 'thomas.blanc@email.com',
//       telephone: '+33 6 55 66 77 88',
//       status: 'suspendu',
//       kycStatus: 'refusé',
//       comptes: 1,
//       soldeTotal: 245.00,
//       dateInscription: new Date('2024-11-30')
//     },
//     {
//       id: 1006,
//       nom: 'Emma Rousseau',
//       email: 'emma.rousseau@email.com',
//       telephone: '+33 6 66 77 88 99',
//       status: 'actif',
//       kycStatus: 'validé',
//       comptes: 2,
//       soldeTotal: 67234.90,
//       dateInscription: new Date('2024-04-18')
//     }
//   ];
//
//   get totalClients(): number {
//     return this.clients.length;
//   }
//
//   get clientsActifs(): number {
//     return this.clients.filter(c => c.status === 'actif').length;
//   }
//
//   get kycEnCours(): number {
//     return this.clients.filter(c => c.kycStatus === 'en_cours').length;
//   }
//
//   get soldeTotalGlobal(): number {
//     return this.clients.reduce((sum, c) => sum + c.soldeTotal, 0);
//   }
//
//   ngOnInit(): void {
//     // Charger les données depuis l'API
//   }
//
//   onViewDetails(client: Client): void {
//     console.log('Voir détails:', client);
//   }
//
//   onEdit(client: Client): void {
//     console.log('Modifier:', client);
//   }
//
//   onSuspend(client: Client): void {
//     console.log('Suspendre:', client);
//   }
//
//   onValidateKYC(client: Client): void {
//     console.log('Valider KYC:', client);
//   }
// }
