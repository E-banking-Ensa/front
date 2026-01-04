import { Component } from '@angular/core';

@Component({
  selector: 'app-mobile-recharge',
  templateUrl: './mobile-recharge.component.html',
  styleUrls: ['./mobile-recharge.component.scss'],
  standalone: true
})
export class MobileRechargeComponent {
  title = 'Recharge mobile';
  phoneNumber = '0600000000';
  amount = 20;
}
