import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SubscriptionSelectionComponent} from './subscription-selection.component';

describe('SubscriptionSelectionComponent', () => {
  let component: SubscriptionSelectionComponent;
  let fixture: ComponentFixture<SubscriptionSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
