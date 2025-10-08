import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';

@Component({
  selector: 'app-navbar-distributor',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    LanguageSwitcherComponent,
    RouterLink
  ],
  templateUrl: './navbar-distributor.component.html',
  styleUrls: ['./navbar-distributor.component.css']
})
export class NavbarDistributorComponent {
  @Output() toggleSidenav = new EventEmitter<void>();

  userId!: number;
  userName: string | null = null;

  constructor() {
    const id = localStorage.getItem('userId');
    if (id) this.userId = parseInt(id, 10);
    this.userName = localStorage.getItem('userName');
  }

  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }
}
