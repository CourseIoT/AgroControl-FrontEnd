import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AgriculturalActivitySchedulerComponent} from './agricultural-activity-scheduler.component';

describe('AgriculturalActivitySchedulerComponent', () => {
  let component: AgriculturalActivitySchedulerComponent;
  let fixture: ComponentFixture<AgriculturalActivitySchedulerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgriculturalActivitySchedulerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgriculturalActivitySchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
