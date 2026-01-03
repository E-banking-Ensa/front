import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientDto } from '../models/ClientDto';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private baseUrl = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) {}

  // Récupérer tous les clients depuis le backend
  getAllClients(): Observable<ClientDto[]> {
    return this.http.get<ClientDto[]>(`${this.baseUrl}/allClients`);
  }

  desactivate(clientId: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/clients/${clientId}/desactivate`, {});
  }

  activate(clientId: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/clients/${clientId}/activate`, {});
  }
}
