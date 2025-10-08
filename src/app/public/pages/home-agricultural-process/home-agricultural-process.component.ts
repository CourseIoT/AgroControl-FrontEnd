import {Component, HostListener} from '@angular/core';
import {MatSidenavModule} from "@angular/material/sidenav";
import {
  SidenavAgriculturalProducerComponent
} from "../../components/sidenav-agricultural-producer/sidenav-agricultural-producer.component";
import {
  NavbarAgriculturalProducerComponent
} from "../../components/navbar-agricultural-producer/navbar-agricultural-producer.component";
import {HomeViewComponent} from "../../../agricultural-process/pages/home-view/home-view.component";
import {Event, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-home-agricultural-process',
  standalone: true,
  imports: [
    MatSidenavModule,
    SidenavAgriculturalProducerComponent,
    NavbarAgriculturalProducerComponent,
    HomeViewComponent,
    RouterOutlet
  ],
  templateUrl: './home-agricultural-process.component.html',
  styleUrls: ['./home-agricultural-process.component.css']
})
export class HomeAgriculturalProcessComponent {
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
