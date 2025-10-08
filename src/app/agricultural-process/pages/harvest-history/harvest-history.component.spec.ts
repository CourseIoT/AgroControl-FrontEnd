import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HarvestHistoryComponent} from './harvest-history.component';

describe('HarvestHistoryComponent', () => {
  let component: HarvestHistoryComponent;
  let fixture: ComponentFixture<HarvestHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HarvestHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HarvestHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
