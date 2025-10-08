import {Component, inject} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user.entity";
import {LoginFormComponent} from "../../components/login-form/login-form.component";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login-page',
  standalone: true,
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',
  imports: [
    LoginFormComponent
  ]
})
export class LoginPageComponent {
  private _authService: AuthService = inject(AuthService);
  private _userService: UserService = inject(UserService);
  private router      = inject( Router )
  navigateByUserRole(userId: number): void {
    this._userService.getUserById(userId).subscribe({
      next: (response) => {
        const user = new User(response);
        const role = user.roles[0];
        const userId = user.id;

        if (role === 'ROLE_AGRICULTURAL_PRODUCER') {
          console.log('Navegando a /field');
          this.router.navigate(['/fields']);
        } else if (role === 'ROLE_DISTRIBUTOR') {
          this.router.navigate(['/home-distributor/' + userId]);
        }
      },
      error: (err) => {
        console.error('Error al obtener usuario:', err);
      }
    });
  }
  SignIn(user: User) {
    const userSignIn = new User({
      email: user.email,
      password: user.password,
    });

    this._authService.LogInUser(userSignIn).subscribe({
      next: (response) => {console.log('Login successful', response);
        this.navigateByUserRole(response.id)
      },
      error: (err) => {console.error('Login failed', err);},
    });
  }
}
