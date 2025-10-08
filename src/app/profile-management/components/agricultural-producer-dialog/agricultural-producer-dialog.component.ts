import {Component} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-agricultural-producer-dialog',
  standalone: true,
  imports: [
    MatIcon,
    MatButton,
    NgOptimizedImage
  ],
  templateUrl: './agricultural-producer-dialog.component.html',
  styleUrls: ['./agricultural-producer-dialog.component.css']
})
export class AgriculturalProducerDialogComponent {
  constructor(private dialogRef: MatDialogRef<AgriculturalProducerDialogComponent>) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
