import {ComponentFixture, TestBed} from '@angular/core/testing';

import {HomeAgriculturalProcessComponent} from './home-agricultural-process.component';

describe('HomeAgriculturalProcessComponent', () => {
  let component: HomeAgriculturalProcessComponent;
  let fixture: ComponentFixture<HomeAgriculturalProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeAgriculturalProcessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeAgriculturalProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
