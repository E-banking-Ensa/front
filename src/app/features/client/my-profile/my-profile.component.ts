import { Component } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
  standalone: true
})
export class MyProfileComponent {
  title = 'Mon profil';
  username = 'Utilisateur123';
  email = 'user@example.com';
}
