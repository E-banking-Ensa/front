import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashbordAdmin } from '../models/DashbordAdmin';

@Injectable({
  providedIn: 'root'
})
export class DashbordService {

  private baseUrl = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) {}

  // 🔹 Récupérer les statistiques du dashboard admin
  getDashboard(): Observable<DashbordAdmin> {
    return this.http.get<DashbordAdmin>(`${this.baseUrl}/admin/dash`);
  }
}
