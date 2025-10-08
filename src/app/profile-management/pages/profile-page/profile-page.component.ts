import {Component, inject, OnInit} from '@angular/core';
import {Profile} from "../../models/profile.entity";
import {ProfileService} from "../../services/profile.service";
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ProfileDetailComponent} from "../../components/profile-detail/profile-detail.component";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [RouterLink, ProfileDetailComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.css'
})
export class ProfilePageComponent implements OnInit{
  profile!: Profile;
  profileService: ProfileService = inject(ProfileService);
  userId!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = +params['id']; // Make sure to convert to number
      console.log('User ID:', this.userId);
      this.loadProfile();
    });
  }

  loadProfile(): void {
    this.profileService.getDistributorByUserId(this.userId).subscribe({
      next: (profile: Profile) => {
        this.profile = profile;
        console.log('Distributor profile loaded:', profile);
      },
      error: () => {
        // If distributor profile is not found, try to load producer profile
        this.profileService.getProducerByUserId(this.userId).subscribe({
          next: (profile: Profile) => {
            this.profile = profile;
            console.log('Producer profile loaded:', profile);
          },
          error: (err) => {
            console.error('Error loading profile:', err);
          },
        });
      },
    });
  }
}
