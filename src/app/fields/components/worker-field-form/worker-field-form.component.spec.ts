import {ComponentFixture, TestBed} from '@angular/core/testing';

import {WorkerFieldFormComponent} from './worker-field-form.component';

describe('WorkerFieldFormComponent', () => {
  let component: WorkerFieldFormComponent;
  let fixture: ComponentFixture<WorkerFieldFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkerFieldFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkerFieldFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
