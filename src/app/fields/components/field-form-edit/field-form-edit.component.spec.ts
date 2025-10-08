import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FieldFormEditComponent} from './field-form-edit.component';

describe('FieldFormEditComponent', () => {
  let component: FieldFormEditComponent;
  let fixture: ComponentFixture<FieldFormEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldFormEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldFormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
