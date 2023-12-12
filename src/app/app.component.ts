import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

import SnackBarMessageService from './services/snack-bar-message/snack-bar-message.service';
import InfoSnackBarComponent from './components/info-snack-bar/info-snack-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  private snackBarMessageService: SnackBarMessageService = inject(SnackBarMessageService);
  private snackBarService: MatSnackBar = inject(MatSnackBar);
  
  title = 'abm-empleados';
  // Duración de la snackBar en segundos
  private readonly infoSnackBarDuration = 10

  ngOnInit(): void {
    this.snackBarMessageService.getSnackBarMessageSubject().subscribe(message => {
      this.snackBarService.openFromComponent(InfoSnackBarComponent, {
        data: message,
        duration: this.infoSnackBarDuration * 1000
      })
    });
  }
}