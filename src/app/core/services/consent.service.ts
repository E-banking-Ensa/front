import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConsentTypeDto} from '../models/ConsentTypeDto';
import { ConsentTypeRequest } from '../models/ConsentTypeRequest';

@Injectable({
  providedIn: 'root'
})
export class ConsentService {

  private baseUrl = 'http://localhost:8080/api/v1/users/admin/consent-types';

  constructor(private http: HttpClient) { }

  // 1️⃣ Récupérer tous les types de consentement
  getAllConsentTypes(): Observable<ConsentTypeDto[]> {
    return this.http.get<ConsentTypeDto[]>(this.baseUrl);
  }

  // 2️⃣ Créer un nouveau type de consentement
  createConsentType(request: ConsentTypeRequest): Observable<ConsentTypeDto> {
    return this.http.post<ConsentTypeDto>(this.baseUrl, request);
  }

  // 3️⃣ Activer un type de consentement
  activateConsentType(typeId: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${typeId}/activate`, null);
  }

  // 4️⃣ Désactiver un type de consentement
  deactivateConsentType(typeId: string): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${typeId}/deactivate`, null);
  }

  // 5️⃣ Supprimer un type de consentement
  deleteConsentType(typeId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${typeId}`);
  }
}
