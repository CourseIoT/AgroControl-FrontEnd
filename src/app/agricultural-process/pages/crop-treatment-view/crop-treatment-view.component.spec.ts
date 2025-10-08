import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CropTreatmentViewComponent} from './crop-treatment-view.component';

describe('CropTreatmentViewComponent', () => {
  let component: CropTreatmentViewComponent;
  let fixture: ComponentFixture<CropTreatmentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CropTreatmentViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CropTreatmentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
