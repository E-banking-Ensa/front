import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CryptoService {
    private apiUrl = `${environment.apiUrl}/api/crypto`;

    constructor(private http: HttpClient) { }

    getPrices(): Observable<{ [key: string]: number }> {
        return this.http.get<{ [key: string]: number }>(`${this.apiUrl}/prices`);
    }

    getBitcoinPrice(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/prices/bitcoin`);
    }

    getEthereumPrice(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/prices/ethereum`);
    }
}
