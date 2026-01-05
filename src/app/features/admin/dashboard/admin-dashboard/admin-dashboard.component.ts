import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface DashboardStats {
  agents: number;
  clients: number;
  consents: number;
  comptes: number;
}

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
  stats: DashboardStats = {
    agents: 15,
    clients: 250,
    consents: 1200,
    comptes: 500
  };

  loading = false;

  constructor() {}

  ngOnInit(): void {
    // Mock data loaded directly
  }
}
