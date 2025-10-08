import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SuccessfulRegistrationDialogComponent} from './successful-registration-dialog.component';

describe('SuccessfulRegistrationDialogComponent', () => {
  let component: SuccessfulRegistrationDialogComponent;
  let fixture: ComponentFixture<SuccessfulRegistrationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuccessfulRegistrationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessfulRegistrationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
