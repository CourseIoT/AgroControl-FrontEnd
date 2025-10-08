import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {NgOptimizedImage} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-successful-registration-dialog',
  standalone: true,
  imports: [
    NgOptimizedImage,
    MatButton,
    RouterLink
  ],
  templateUrl: './successful-registration-dialog.component.html',
  styleUrl: './successful-registration-dialog.component.css'
})
export class SuccessfulRegistrationDialogComponent {
  constructor(private dialogRef: MatDialogRef<SuccessfulRegistrationDialogComponent>) {
    dialogRef.disableClose = true;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
