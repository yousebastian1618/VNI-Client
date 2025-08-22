import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSolutionPage } from './product-solution-page';

describe('ProductSolutionPage', () => {
  let component: ProductSolutionPage;
  let fixture: ComponentFixture<ProductSolutionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSolutionPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSolutionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
