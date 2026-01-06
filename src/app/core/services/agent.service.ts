import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AgentDto } from '../models/AgentDto';
import { environment } from '../../../environments/environment';
import { CreateUserRequestDto } from '../models/CreateUserRequestDto';
import { UserResponseDto } from '../models/UserResponseDto';
import { DashbordAgent } from '../models/DashbordAgent';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private baseUrl = `${environment.apiUrl}/api/users`;

  constructor(private http: HttpClient) { }

  /**
   * Récupérer tous les agents depuis le backend
   */
  getAllAgents(): Observable<AgentDto[]> {
    return this.http.get<AgentDto[]>(`${this.baseUrl}/allAgents`);
  }

  /**
   * Créer un nouvel agent (via sync internal/sync as per existing logic, verify if correct - assumes auth service syncs)
   * POST /api/users/internal/sync
   */
  createAgent(request: CreateUserRequestDto): Observable<UserResponseDto> {
    return this.http.post<UserResponseDto>(`${this.baseUrl}/internal/sync`, request);
  }

  /**
   * Supprimer un agent
   * DELETE /api/users/agents/{agentId}/delete
   */
  deleteAgent(agentId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/agents/${agentId}/delete`);
  }

  /**
   * Activer un agent
   * PUT /api/users/agents/{agentId}/activate
   */
  activate(agentId: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/agents/${agentId}/activate`, {});
  }

  /**
   * Désactiver un agent
   * PUT /api/users/agents/{agentId}/desactivate
   */
  desactivate(agentId: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/agents/${agentId}/desactivate`, {});
  }

  /**
   * Bloquer un agent
   * PUT /api/users/agents/{agentId}/block
   */
  suspendre(agentId: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/agents/${agentId}/block`, {});
  }
}




// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { AgentDto } from '../models/AgentDto';

// @Injectable({
//   providedIn: 'root'
// })
// export class AgentService {

//   private baseUrl = 'http://localhost:8080/api/v1/users';

//   constructor(private http: HttpClient) { }

//   // 🔹 Récupérer tous les agents depuis le backend
//   getAllAgents(): Observable<AgentDto[]> {
//     return this.http.get<AgentDto[]>(`${this.baseUrl}/allAgents`);
//   }
// }
