import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WorkersFieldTableComponent} from './workers-field-table.component';

describe('WorkersFieldTableComponent', () => {
  let component: WorkersFieldTableComponent;
  let fixture: ComponentFixture<WorkersFieldTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkersFieldTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkersFieldTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
