import { Component } from '@angular/core';

@Component({
  selector: 'app-transfert-money',
  templateUrl: './transfert-money.component.html',
  styleUrls: ['./transfert-money.component.scss'],
  standalone: true  // obligatoire si tu veux le lazy loading
})
export class TransfertMoneyComponent {
  // Données statiques pour tester
  title = 'Transfert d’argent';
  amount = 1000;
  recipient = 'John Doe';
}
