import {Component, EventEmitter, Output, signal} from '@angular/core';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {User} from '../../models/user.entity';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {CommonModule} from "@angular/common";
import {RouterLink} from "@angular/router";

/** ErrorStateMatcher para manejar validaciones en campos sucios, tocados o enviados */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form?.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatRadioButton,
    MatRadioGroup,
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent {
  @Output() userCreated = new EventEmitter<User>();  // Output al componente padre

  // Manejamos visibilidad de contraseña usando signal
  hide = signal(true);

  // Manejamos dinámicamente los roles seleccionados
  role: string | null = null;

  matcher = new MyErrorStateMatcher();  // Instancia del ErrorStateMatcher
  private fb: FormBuilder = new FormBuilder();

  // Definición del FormGroup con validadores
  public registerForm: FormGroup = this.fb.group(
    {
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      city: ['', [Validators.required]],
      country: ['', [Validators.required]],
      phone: ['', [Validators.required, this.phoneValidator]],
      roles: ['', Validators.required],
      dni: ['', [Validators.required, this.dniValidator]],
      companyName: ['', [Validators.required]],
      ruc: ['', [Validators.required, this.rucValidator]],
    },
    {
      validators: this.passwordMatchValidator('password', 'confirmPassword')
    } as AbstractControlOptions  // Indicamos explícitamente el tipo
  );

  constructor() {}

  // Validador personalizado para asegurar que las contraseñas coincidan
  private passwordMatchValidator(password: string, confirmPassword: string) {
    return (form: AbstractControl) => {
      const pass = form.get(password)?.value;
      const confirmPass = form.get(confirmPassword)?.value;

      const error = pass !== confirmPass ? { notMatching: true } : null;

      // También aplica el error al control individual
      form.get(confirmPassword)?.setErrors(error);

      return error;
    };
  }

  // Validador para asegurarse de que el DNI tenga exactamente 8 números
  private dniValidator(control: AbstractControl) {
    const value = control.value;
    const valid = /^\d{8}$/.test(value);
    return valid ? null : { invalidDni: true };
  }

// Validador para asegurarse de que el RUC tenga exactamente 11 números
  private rucValidator(control: AbstractControl) {
    const value = control.value;
    const valid = /^\d{11}$/.test(value);
    return valid ? null : { invalidRuc: true };
  }

// Validador para asegurarse de que el teléfono tenga exactamente 9 números
  private phoneValidator(control: AbstractControl) {
    const value = control.value;
    const valid = /^\d{9}$/.test(value);
    return valid ? null : { invalidPhone: true };
  }

  // Método para alternar la visibilidad de la contraseña
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();  // Evita que el evento se propague
  }

  // Manejo de cambios en los roles y actualización dinámica del formulario
  onRoleChange(event: any) {
    this.role = event.value;
    // Asigna el rol como un array de strings en lugar de un string
    this.registerForm.get('roles')?.setValue([this.role]);

    if (this.role === 'agricultural producer') {
      this.registerForm.get('dni')?.setValidators([Validators.required, this.dniValidator.bind(this)]);
      this.registerForm.get('companyName')?.clearValidators();
      this.registerForm.get('ruc')?.clearValidators();
    } else if (this.role === 'distributor') {
      this.registerForm.get('companyName')?.setValidators([Validators.required]);
      this.registerForm.get('ruc')?.setValidators([Validators.required, this.rucValidator.bind(this)]);
      this.registerForm.get('dni')?.clearValidators();
    }

    this.registerForm.get('dni')?.updateValueAndValidity();
    this.registerForm.get('companyName')?.updateValueAndValidity();
    this.registerForm.get('ruc')?.updateValueAndValidity();
  }


  // Método para enviar los datos al componente padre
  submitForm() {
    if (this.registerForm.valid) {
      const user: User = this.registerForm.value;
      console.log('User data being submitted:', user);
      this.userCreated.emit(user);  // Emitimos el usuario al componente padre
    } else {
      console.log('Form is invalid');
    }
  }
}
