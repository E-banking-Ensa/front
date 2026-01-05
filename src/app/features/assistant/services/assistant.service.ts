import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssistantService {

  private apiUrl = 'http://127.0.0.1:5000/api/chat';

  constructor(private http: HttpClient) {}

  askAssistant(message: string): Observable<{ reply: string }> {
    return this.http.post<{ reply: string }>(this.apiUrl, {
      message: message
    });
  }
}
