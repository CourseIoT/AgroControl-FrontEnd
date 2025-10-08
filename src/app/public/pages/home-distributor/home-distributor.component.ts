import {Component, HostListener} from '@angular/core';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {Event, RouterOutlet} from "@angular/router";
import {
    SidenavAgriculturalProducerComponent
} from "../../components/sidenav-agricultural-producer/sidenav-agricultural-producer.component";
import {NavbarDistributorComponent} from "../../components/navbar-distributor/navbar-distributor.component";

@Component({
  selector: 'app-home-distributor',
  standalone: true,
  imports: [
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    RouterOutlet,
    SidenavAgriculturalProducerComponent,
    NavbarDistributorComponent
  ],
  templateUrl: './home-distributor.component.html',
  styleUrl: './home-distributor.component.css'
})
export class HomeDistributorComponent {
  isSidenavOpened = true;

  constructor() {
    this.isSidenavOpened = window.innerWidth > 768; // Verifica el tamaño inicial
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isSidenavOpened = window.innerWidth > 768; // Actualiza según el tamaño de la ventana
  }

  toggleSidenav() {
    this.isSidenavOpened = !this.isSidenavOpened; // Alternar el estado del sidenav
  }
}
