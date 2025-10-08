import {Component, EventEmitter, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {User} from "../../models/user.entity";
import {RouterLink} from '@angular/router';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {MatCheckbox} from "@angular/material/checkbox";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatCheckbox,
    NgOptimizedImage,
    RouterLink,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  @Output() userLogged = new EventEmitter<User>();

  hide = true;  // Para la visibilidad de la contraseña
  private fb: FormBuilder = new FormBuilder();
  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor() {}

  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.loginForm.valid) {
      const user: User = this.loginForm.value;
      console.log('Login data:', user);
      this.userLogged.emit(user);  // Emitimos el evento
    } else {
      console.log('Form is invalid');
    }
  }
}
