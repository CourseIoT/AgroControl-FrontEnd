import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionSummaryComponent } from './subscription-summary.component';

describe('SubscriptionSummaryComponent', () => {
  let component: SubscriptionSummaryComponent;
  let fixture: ComponentFixture<SubscriptionSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
