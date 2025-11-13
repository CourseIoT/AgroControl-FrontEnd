import { Component, OnInit } from '@angular/core';
import {
  DatepickerCalendarComponent
} from "../../../public/components/datepicker-calendar/datepicker-calendar.component";
import {
  AgriculturalActivityFormComponent
} from "../../components/agricultural-activity-form/agricultural-activity-form.component";

@Component({
  selector: 'app-agricultural-activity-scheduler',
  standalone: true,
  imports: [
    DatepickerCalendarComponent,
    AgriculturalActivityFormComponent
  ],
  templateUrl: './agricultural-activity-scheduler.component.html',
  styleUrl: './agricultural-activity-scheduler.component.css'
})
export class AgriculturalActivitySchedulerComponent implements OnInit {
  selectedDate: string | null = null;
  agriculturalProcessId!: number;

  ngOnInit() {
    this.loadFromRouteState();
  }

  loadFromRouteState() {
    const state = history.state;

    if (state && state.agriculturalProcessId) {
      this.agriculturalProcessId = state.agriculturalProcessId;

      localStorage.setItem('agriculturalProcessId', String(this.agriculturalProcessId));
      return;
    }

    const id = localStorage.getItem('agriculturalProcessId');
    if (id) {
      this.agriculturalProcessId = parseInt(id, 10);
    } else {
      console.error('No agriculturalProcessId found in route state or localStorage');
    }
  }

  handleSelectedDate(date: string | null) {
    this.selectedDate = date;
    console.log(this.selectedDate);
  }
}
