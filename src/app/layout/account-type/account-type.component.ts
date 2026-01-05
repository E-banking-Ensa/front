import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../features/account/services/account.service';

@Component({
  selector: 'app-account-type',
  templateUrl: './account-type.component.html',
  styleUrls: ['./account-type.component.css']
})
export class AccountTypeComponent {

  selectedType = 'CHECKING';

  // ⚠️ userId temporaire (plus tard via auth)
  userId = '6315e0b2-9752-42c9-8158-51ad7d4a2413';

  constructor(
    private router: Router,
    private accountService: AccountService
  ) {}

  selectType(type: string) {
    this.selectedType = type;
  }

  continue() {
    this.accountService.createAccount(this.userId, this.selectedType)
      .subscribe({
        next: (response) => {
          console.log('Account created successfully', response);

          // optionnel : navigation après succès
          // this.router.navigate(['/account/success']);
        },
        error: (error) => {
          console.error('Error creating account', error);
          alert('Erreur lors de la création du compte');
        }
      });
  }
}
