import { Component, OnInit, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { AuthService } from '../../../profile-management/services/auth.service';

@Component({
  selector: 'app-sidenav-agricultural-producer',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatRippleModule, RouterLink, RouterLinkActive],
  templateUrl: './sidenav-agricultural-producer.component.html',
  styleUrls: ['./sidenav-agricultural-producer.component.css'],
})
export class SidenavAgriculturalProducerComponent implements OnInit {
  /** Rol que te pasa el layout (backend). Aceptamos ambos formatos. */
  @Input() role: 'producer' | 'distributor' | 'ROLE_AGRICULTURAL_PRODUCER' | 'ROLE_DISTRIBUTOR' = 'producer';

  agriculturalProcessId!: number;   // para rutas del productor
  userId!: number;                  // para rutas del distribuidor

  private router = inject(Router);
  private authService = inject(AuthService);

  ngOnInit(): void {
    const ap = localStorage.getItem('agriculturalProcessId');
    if (ap) this.agriculturalProcessId = parseInt(ap, 10);

    const uid = localStorage.getItem('userId');
    if (uid) this.userId = parseInt(uid, 10);
  }

  isProducer(): boolean {
    return this.role === 'producer' || this.role === 'ROLE_AGRICULTURAL_PRODUCER';
  }
  isDistributor(): boolean {
    return this.role === 'distributor' || this.role === 'ROLE_DISTRIBUTOR';
  }

  logOut(): void {
    this.authService.logOut();
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
