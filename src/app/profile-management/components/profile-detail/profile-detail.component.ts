import {Component, Input} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {Profile} from "../../models/profile.entity";
import {NgIf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-profile-detail',
  standalone: true,
  imports: [
    MatCardModule,
    NgIf,
    TranslateModule
  ],
  templateUrl: './profile-detail.component.html',
  styleUrl: './profile-detail.component.css'
})
export class ProfileDetailComponent {
  @Input() profile!: Profile;

}
