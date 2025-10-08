import {Component, computed, inject} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {AuthService} from "./profile-management/services/auth.service";
import {AuthStatus} from "./profile-management/models/auth-status.enum";
import {NgIf} from "@angular/common";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  private authService = inject( AuthService );
  private router = inject( Router );

  public finishedAuthCheck = computed<boolean>( () => {
    console.log(this.authService.authStatus() )
    if ( this.authService.authStatus() === AuthStatus.checking ) {
      return false;
    }

    return true;
  });
  title = 'agrocontrol-front-end';

  constructor(translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }
}
