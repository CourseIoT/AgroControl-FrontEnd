import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NavbarAgriculturalProducerComponent} from './navbar-agricultural-producer.component';

describe('NavbarAgriculturalProducerComponent', () => {
  let component: NavbarAgriculturalProducerComponent;
  let fixture: ComponentFixture<NavbarAgriculturalProducerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarAgriculturalProducerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarAgriculturalProducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
