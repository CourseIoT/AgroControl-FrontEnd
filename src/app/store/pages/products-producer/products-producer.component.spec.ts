import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsProducerComponent } from './products-producer.component';

describe('ProductsProducerComponent', () => {
  let component: ProductsProducerComponent;
  let fixture: ComponentFixture<ProductsProducerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsProducerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsProducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
