import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface VirementRequest {
    sourceAccount: string;
    destinationAccount: string;
    amount: number;
    description?: string;
}

export interface VirementResponse {
    transactionId?: string;
    status: string;
    message: string;
    timestamp: string;
}

export interface MobileRechargeRequest {
    phoneNumber: string;
    amount: number;
    operator: string;
}

export interface MobileRechargeResponse {
    transactionId?: string;
    status: string;
    message: string;
    timestamp: string;
}

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    private apiUrl = `${environment.apiUrl}/api/payments`;

    constructor(private http: HttpClient) { }

    virement(request: VirementRequest): Observable<VirementResponse> {
        return this.http.post<VirementResponse>(`${this.apiUrl}/virement`, request);
    }

    recharge(request: MobileRechargeRequest): Observable<MobileRechargeResponse> {
        return this.http.post<MobileRechargeResponse>(`${this.apiUrl}/recharge`, request);
    }

    health(): Observable<string> {
        return this.http.get(`${this.apiUrl}/health`, { responseType: 'text' });
    }
}
