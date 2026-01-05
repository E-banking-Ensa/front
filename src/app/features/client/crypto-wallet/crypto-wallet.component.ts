import { Component } from '@angular/core';

@Component({
  selector: 'app-crypto-wallet',
  templateUrl: './crypto-wallet.component.html',
  styleUrls: ['./crypto-wallet.component.scss'],
  standalone: true
})
export class CryptoWalletComponent {
  title = 'Portefeuille crypto';
  balance = 0.5;
  currency = 'BTC';
}
