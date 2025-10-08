import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-datepicker-calendar',
  templateUrl: './datepicker-calendar.component.html',
  styleUrl: './datepicker-calendar.component.css',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatCardModule, MatDatepickerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerCalendarComponent {
  @Output() dateSelected = new EventEmitter<string | null>(); // Cambiado a string

  selected: Date | null = null;

  // Método para cambiar la fecha seleccionada
  onDateChange(date: Date | null) {
    this.selected = date;
    this.dateSelected.emit(this.selected ? this.selected.toDateString() : null); // Emitir el toDateString
  }

  getFormattedDate(): string | null {
    return this.selected ? this.selected.toDateString() : null;
  }
}
