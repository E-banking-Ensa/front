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
import { AgentService } from '../../../core/services/agent.service';
import { AgentDto } from '../../../core/models/AgentDto';

@Component({
  selector: 'app-agents',
  standalone: true,
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss'],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule
  ]
})
export class AgentsComponent implements OnInit {

  displayedColumns: string[] = [
    'agentId', 'nom', 'email', 'phoneNumber', 'adresse', 'status', 'createdAt', 'actions'
  ];

  agents: AgentDto[] = [];

  constructor(private agentService: AgentService,
              private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadAgents();
  }

  loadAgents(): void {
    this.agentService.getAllAgents().subscribe({
      next: (data: AgentDto[]) => {
        this.agents = data.map(a => ({
          ...a,
          // Tu peux transformer ou ajouter des champs si nécessaire
        }));
        // 🔹 Pour résoudre NG0100
        this.cd.detectChanges();
      },
      error: (err) => console.error('Erreur récupération agents', err)
    });
  }

  onViewDetails(agent: AgentDto): void {
    console.log('Voir détails:', agent);
  }

  onEdit(agent: AgentDto): void {
    console.log('Modifier agent:', agent);
  }

  onDelete(agent: AgentDto): void {
    console.log('Supprimer agent:', agent);
  }

  addAgent(): void {
    console.log('Ajouter un nouvel agent');
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
// import { AgentDto } from '../../../core/models/AgentDto';
//
// @Component({
//   selector: 'app-agents',
//   standalone: true,
//   templateUrl: './agents.component.html',
//   styleUrls: ['./agents.component.scss'],
//   imports: [
//     CommonModule,
//     MatTableModule,
//     MatButtonModule,
//     MatIconModule,
//     MatChipsModule,
//     MatCardModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatMenuModule
//   ]
// })
// export class AgentsComponent implements OnInit {
//
//   displayedColumns: string[] = [
//     'agentId', 'nom', 'email', 'phoneNumber', 'adresse', 'status', 'createdAt', 'actions'
//   ];
//
//   agents: AgentDto[] = [
//     {
//       agentId: 'AG-001',
//       firstName: 'Marie',
//       lastName: 'Dubois',
//       email: 'marie.dubois@bank.com',
//       phoneNumber: '+33 6 12 34 56 78',
//       adresse: '12 Rue de Paris, Paris',
//       status: 'actif',
//       createdAt: new Date('2023-01-15')
//     },
//     {
//       agentId: 'AG-002',
//       firstName: 'Pierre',
//       lastName: 'Martin',
//       email: 'pierre.martin@bank.com',
//       phoneNumber: '+33 6 23 45 67 89',
//       adresse: '45 Avenue de Lyon, Lyon',
//       status: 'actif',
//       createdAt: new Date('2023-03-20')
//     },
//     {
//       agentId: 'AG-003',
//       firstName: 'Sophie',
//       lastName: 'Bernard',
//       email: 'sophie.bernard@bank.com',
//       phoneNumber: '+33 6 34 56 78 90',
//       adresse: '78 Boulevard de Nice, Nice',
//       status: 'inactif',
//       createdAt: new Date('2023-06-10')
//     },
//     {
//       agentId: 'AG-004',
//       firstName: 'Luc',
//       lastName: 'Petit',
//       email: 'luc.petit@bank.com',
//       phoneNumber: '+33 6 45 67 89 01',
//       adresse: '22 Rue de Marseille, Marseille',
//       status: 'actif',
//       createdAt: new Date('2022-11-05')
//     }
//   ];
//
//   ngOnInit(): void {
//     // Charger depuis API si nécessaire
//   }
//
//   onViewDetails(agent: AgentDto): void {
//     console.log('Voir détails:', agent);
//   }
//
//   onEdit(agent: AgentDto): void {
//     console.log('Modifier agent:', agent);
//   }
//
//   onDelete(agent: AgentDto): void {
//     console.log('Supprimer agent:', agent);
//   }
//
//   addAgent(): void {
//     console.log('Ajouter un nouvel agent');
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
// import {AgentDto} from '../../../core/models/AgentDto';
//
// interface Agent {
//   id: number;
//   nom: string;
//   email: string;
//   telephone: string;
//   status: 'actif' | 'inactif';
//   clientsGeres: number;
//   dateInscription: Date;
// }
//
// @Component({
//   selector: 'app-agents',
//   standalone: true,
//   templateUrl: './agents.component.html',
//   styleUrls: ['./agents.component.scss'],
//   imports: [
//     CommonModule,
//     MatTableModule,
//     MatButtonModule,
//     MatIconModule,
//     MatChipsModule,
//     MatCardModule,
//     MatFormFieldModule,
//     MatInputModule,
//     MatMenuModule
//   ]
// })
// export class AgentsComponent implements OnInit {
//   displayedColumns: string[] = ['id', 'nom', 'email', 'telephone', 'status', 'clientsGeres', 'dateInscription', 'actions'];
//
//   agents: Agent[] = [
//     {
//       id: 1,
//       nom: 'Marie Dubois',
//       email: 'marie.dubois@bank.com',
//       telephone: '+33 6 12 34 56 78',
//       status: 'actif',
//       clientsGeres: 45,
//       dateInscription: new Date('2023-01-15')
//     },
//     {
//       id: 2,
//       nom: 'Pierre Martin',
//       email: 'pierre.martin@bank.com',
//       telephone: '+33 6 23 45 67 89',
//       status: 'actif',
//       clientsGeres: 38,
//       dateInscription: new Date('2023-03-20')
//     },
//     {
//       id: 3,
//       nom: 'Sophie Bernard',
//       email: 'sophie.bernard@bank.com',
//       telephone: '+33 6 34 56 78 90',
//       status: 'inactif',
//       clientsGeres: 12,
//       dateInscription: new Date('2023-06-10')
//     },
//     {
//       id: 4,
//       nom: 'Luc Petit',
//       email: 'luc.petit@bank.com',
//       telephone: '+33 6 45 67 89 01',
//       status: 'actif',
//       clientsGeres: 52,
//       dateInscription: new Date('2022-11-05')
//     },
//     {
//       id: 5,
//       nom: 'Claire Moreau',
//       email: 'claire.moreau@bank.com',
//       telephone: '+33 6 56 78 90 12',
//       status: 'actif',
//       clientsGeres: 29,
//       dateInscription: new Date('2023-08-22')
//     }
//   ];
//
//   ngOnInit(): void {
//     // Charger les données depuis l'API
//   }
//
//   onEdit(agent: Agent): void {
//     console.log('Modifier agent:', agent);
//   }
//
//   onDelete(agent: Agent): void {
//     console.log('Supprimer agent:', agent);
//   }
//
//   onViewDetails(agent: Agent): void {
//     console.log('Voir détails:', agent);
//   }
//
//   addAgent(): void {
//     console.log('Ajouter un nouvel agent');
//   }
// }
