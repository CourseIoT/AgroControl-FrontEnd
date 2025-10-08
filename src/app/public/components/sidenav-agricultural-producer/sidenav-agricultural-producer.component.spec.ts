import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SidenavAgriculturalProducerComponent} from './sidenav-agricultural-producer.component';

describe('SidenavAgriculturalProducerComponent', () => {
  let component: SidenavAgriculturalProducerComponent;
  let fixture: ComponentFixture<SidenavAgriculturalProducerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavAgriculturalProducerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavAgriculturalProducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
