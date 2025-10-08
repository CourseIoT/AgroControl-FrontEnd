import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-distributor-dialog',
  standalone: true,
  imports: [
    MatIcon,
    MatButton,
    NgOptimizedImage
  ],
  templateUrl: './distributor-dialog.component.html',
  styleUrl: './distributor-dialog.component.css'
})
export class DistributorDialogComponent {
  constructor(private dialogRef: MatDialogRef<DistributorDialogComponent>) {}

  closeDialog() {
    this.dialogRef.close();
  }

}
