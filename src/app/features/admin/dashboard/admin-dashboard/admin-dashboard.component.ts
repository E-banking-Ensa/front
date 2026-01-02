import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {DashbordService} from '../../../../core/services/dashbord.service';
import {DashbordAdmin} from '../../../../core/models/DashbordAdmin';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule
  ]
})
export class AdminDashboardComponent implements OnInit {

  stats: DashbordAdmin = {
    agents: 0,
    clients: 0,
    consents: 0,
    comptes: 0
  };

  loading = true;

  constructor(
    private dashbordService: DashbordService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.dashbordService.getDashboard().subscribe({
      next: (data) => {
        this.stats = data;
        this.loading = false;

        // 🔹 évite NG0100
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Erreur chargement dashboard', err);
        this.loading = false;
      }
    });
  }
}
