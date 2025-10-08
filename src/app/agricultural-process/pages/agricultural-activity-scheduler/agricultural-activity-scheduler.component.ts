import {Component, OnInit} from '@angular/core';
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
export class AgriculturalActivitySchedulerComponent implements OnInit{
  selectedDate!: string;
  agriculturalProcessId!: number;

  ngOnInit() {
    this.getAgriculturalProcessIdFromLocalStorage();
  }

  getAgriculturalProcessIdFromLocalStorage() {
    let id = localStorage.getItem('agriculturalProcessId');
    if (id) {
      this.agriculturalProcessId = parseInt(id);
    } else {
      console.error('No agricultural process id found in local storage');
    }
  }

  handleSelectedDate(event: any) {
    this.selectedDate = event;
    console.log(this.selectedDate);
  }
}
