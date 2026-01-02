import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AgentDto } from '../models/AgentDto';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private baseUrl = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) { }

  // 🔹 Récupérer tous les agents depuis le backend
  getAllAgents(): Observable<AgentDto[]> {
    return this.http.get<AgentDto[]>(`${this.baseUrl}/allAgents`);
  }
}
