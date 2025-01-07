import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerProductByIdComponent } from './customer-product-by-id.component';

describe('CustomerProductByIdComponent', () => {
  let component: CustomerProductByIdComponent;
  let fixture: ComponentFixture<CustomerProductByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerProductByIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerProductByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
