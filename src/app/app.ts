import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrls: ['./app.css'] // Correction ici
})
export class App {
  protected readonly title = signal('front');
}
