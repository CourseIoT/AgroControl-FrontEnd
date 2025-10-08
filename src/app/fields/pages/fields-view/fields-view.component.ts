import {Component} from '@angular/core';
import {CardFieldListComponent} from "../../components/card-field-list/card-field-list.component";
import {
  NavbarAgriculturalProducerComponent
} from "../../../public/components/navbar-agricultural-producer/navbar-agricultural-producer.component";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-fields-view',
  standalone: true,
  imports: [
    CardFieldListComponent,
    NavbarAgriculturalProducerComponent,
    TranslateModule
  ],
  templateUrl: './fields-view.component.html',
  styleUrl: './fields-view.component.css'
})
export class FieldsViewComponent {
  userId!: number;

    constructor() {
        this.getUserIdFromLS();
    }

  getUserIdFromLS() {
    this.userId = JSON.parse(localStorage.getItem('userId') || '{}');
    console.log(this.userId);
  }
}
