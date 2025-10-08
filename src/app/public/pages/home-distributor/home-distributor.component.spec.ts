import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDistributorComponent } from './home-distributor.component';

describe('HomeDistributorComponent', () => {
  let component: HomeDistributorComponent;
  let fixture: ComponentFixture<HomeDistributorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeDistributorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeDistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
