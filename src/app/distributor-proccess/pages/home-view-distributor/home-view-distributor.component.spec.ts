import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeViewDistributorComponent } from './home-view-distributor.component';

describe('HomeViewDistributorComponent', () => {
  let component: HomeViewDistributorComponent;
  let fixture: ComponentFixture<HomeViewDistributorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeViewDistributorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeViewDistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
