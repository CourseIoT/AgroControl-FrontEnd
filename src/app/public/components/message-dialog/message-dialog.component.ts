import { Component, Input } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-message-dialog',
  standalone: true,
  imports: [MatIconModule, NgIf, MatButtonModule, MatDialogActions, MatDialogContent],
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() type: 'success' | 'error' = 'success';
  @Input() showDialog: boolean = false;

  // Injects the MatDialogRef into the component.
  constructor(private dialogRef: MatDialogRef<MessageDialogComponent>) {}

  // Closes the dialog.
  closeDialog() {
    this.dialogRef.close();
  }
}
