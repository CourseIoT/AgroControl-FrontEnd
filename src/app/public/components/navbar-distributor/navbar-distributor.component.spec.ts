import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarDistributorComponent } from './navbar-distributor.component';

describe('NavbarDistributorComponent', () => {
  let component: NavbarDistributorComponent;
  let fixture: ComponentFixture<NavbarDistributorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarDistributorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarDistributorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
