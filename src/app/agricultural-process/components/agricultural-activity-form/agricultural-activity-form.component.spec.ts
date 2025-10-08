import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgriculturalActivityFormComponent } from './agricultural-activity-form.component';

describe('AgriculturalActivityFormComponent', () => {
  let component: AgriculturalActivityFormComponent;
  let fixture: ComponentFixture<AgriculturalActivityFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgriculturalActivityFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgriculturalActivityFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
