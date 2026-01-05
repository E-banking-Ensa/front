import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AgentDto } from '../models/AgentDto';
import { CreateUserRequestDto } from '../models/CreateUserRequestDto';
import { UserResponseDto } from '../models/UserResponseDto';
import { DashbordAgent } from '../models/DashbordAgent';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private baseUrl = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) { }

  /**
   * Récupérer tous les agents depuis le backend
   */
  getAllAgents(): Observable<AgentDto[]> {
    return this.http.get<AgentDto[]>(`${this.baseUrl}/allAgents`);
  }

  /*recuperer les consnets d'un el client

  */
  /**
   * Créer un nouvel agent
   * POST /api/v1/users/internal/sync
   */
  createAgent(request: CreateUserRequestDto): Observable<UserResponseDto> {
    return this.http.post<UserResponseDto>(`${this.baseUrl}/internal/sync`,request);
  }

  /**
   * Supprimer un agent
   * DELETE /api/v1/users/agents/{agentId}
   */
  deleteAgent(agentId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/agents/${agentId}/delete`);
  }
 

  activate(agentId:string):Observable<void>{
    return this.http.put<void>(`${this.baseUrl}/agents/${agentId}/activate`,{});
  }
  

  /**
   * Activer un agent
   * PUT /api/v1/users/agents/{agentId}/activate
   */
  // activateAgent(agentId: string): Observable<void> {
  //   return this.http.put<void>(`${this.baseUrl}/agents/${agentId}/activate`, {});
  // }

  desactivate(agentId: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/agents/${agentId}/desactivate`, {});
  }
  /**
   * Désactiver un agent
   * PUT /api/v1/users/agents/{agentId}/deactivate
   */
  deactivateAgent(agentId: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/agents/${agentId}/deactivate`, {});
  }

  /**
   * Bloquer un agent
   * PUT /api/v1/users/agents/{agentId}/block
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
