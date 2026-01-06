import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DashbordAdmin } from '../models/DashbordAdmin';
import { DashbordAgent } from '../models/DashbordAgent';

@Injectable({
    providedIn: 'root'
})
export class DashbordService {
    private baseUrl = `${environment.apiUrl}/api/users`;

    constructor(private http: HttpClient) { }

    getAdminDashboard(): Observable<DashbordAdmin> {
        return this.http.get<DashbordAdmin>(`${this.baseUrl}/admin/dash`);
    }

    getAgentDashboard(username: string): Observable<DashbordAgent> {
        return this.http.get<DashbordAgent>(`${this.baseUrl}/agents/${username}/dashbord`);
    }
}
