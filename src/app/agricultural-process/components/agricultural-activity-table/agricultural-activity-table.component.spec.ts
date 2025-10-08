import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgriculturalActivityTableComponent } from './agricultural-activity-table.component';

describe('AgriculturalActivityTableComponent', () => {
  let component: AgriculturalActivityTableComponent;
  let fixture: ComponentFixture<AgriculturalActivityTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgriculturalActivityTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgriculturalActivityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
