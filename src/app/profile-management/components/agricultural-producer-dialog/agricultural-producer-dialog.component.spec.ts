import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AgriculturalProducerDialogComponent} from './agricultural-producer-dialog.component';

describe('AgriculturalProducerDialogComponent', () => {
  let component: AgriculturalProducerDialogComponent;
  let fixture: ComponentFixture<AgriculturalProducerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgriculturalProducerDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgriculturalProducerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
