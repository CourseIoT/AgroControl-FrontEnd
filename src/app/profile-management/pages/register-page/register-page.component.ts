import {Component, inject} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user.entity";
import {RegisterFormComponent} from "../../components/register-form/register-form.component";
import {MatDialog} from "@angular/material/dialog";
import {
  AgriculturalProducerDialogComponent
} from "../../components/agricultural-producer-dialog/agricultural-producer-dialog.component";
import {DistributorDialogComponent} from "../../components/distributor-dialog/distributor-dialog.component";
import {
  SuccessfulRegistrationDialogComponent
} from "../../components/successful-registration-dialog/successful-registration-dialog.component";

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    RegisterFormComponent
  ],
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  private dialog: MatDialog = inject(MatDialog);
  private _authService: AuthService = inject(AuthService);

  // Registro de usuario basado en el rol del usuario
  public singUpUser(user: User) {
    const role = user.roles[0];

    if (role === 'agricultural producer') {
      this._singUpAgriculturalProducer(user);
    } else if (role === 'distributor') {
      this._singUpDistributor(user);
    } else {
      console.error('Invalid role selected');
    }
  }
  // Registro de Productor Agrícola
  private _singUpAgriculturalProducer(user: User) {
    const agriculturalProducer: User = new User({
      email: user.email,
      password: user.password,
      fullName: user.fullName,
      city: user.city,
      country: user.country,
      phone: user.phone,
      dni: user.dni
    });

    this._authService.createAgriculturalProducer(agriculturalProducer).subscribe({
      next: (response) => this.dialog.open(SuccessfulRegistrationDialogComponent),
      error: () => this.dialog.open(AgriculturalProducerDialogComponent),
    });
  }

  // Registro de Distribuidor
  private _singUpDistributor(user: User) {
    const distributor: User = new User({
      email: user.email,
      password: user.password,
      fullName: user.fullName,
      city: user.city,
      country: user.country,
      phone: user.phone,
      companyName: user.companyName,
      ruc: user.ruc
    });

    this._authService.createDistributor(distributor).subscribe({
      next: (response) => this.dialog.open(SuccessfulRegistrationDialogComponent),
      error: () => this.dialog.open(DistributorDialogComponent),
    });
  }
}
