import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CardFieldListComponent} from './card-field-list.component';

describe('CardFieldListComponent', () => {
  let component: CardFieldListComponent;
  let fixture: ComponentFixture<CardFieldListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardFieldListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardFieldListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
