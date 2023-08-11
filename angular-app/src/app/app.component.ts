import { Component } from '@angular/core';
import { StyleService } from './services/style.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-app';
  isLoggedIn: boolean;

  constructor(public styleService: StyleService) {
    this.isLoggedIn = false;
  }

  changeStyle(style: string): void {
    this.styleService.setCurrentStyle(style);
  }
}
