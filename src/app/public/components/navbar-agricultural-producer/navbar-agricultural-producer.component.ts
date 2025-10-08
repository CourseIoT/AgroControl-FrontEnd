import { Component, EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';

@Component({
  selector: 'app-navbar-agricultural-producer',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    LanguageSwitcherComponent,
    RouterLink
  ],
  templateUrl: './navbar-agricultural-producer.component.html',
  styleUrls: ['./navbar-agricultural-producer.component.css']
})
export class NavbarAgriculturalProducerComponent {
  @Output() toggleSidenav = new EventEmitter<void>();

  userId!: number;
  userName: string | null = null;

  constructor() {
    const id = localStorage.getItem('userId');
    if (id) this.userId = parseInt(id, 10);

    // opcional: si guardas el nombre del backend
    this.userName = localStorage.getItem('userName');
  }

  onToggleSidenav(): void {
    this.toggleSidenav.emit();
  }
}
