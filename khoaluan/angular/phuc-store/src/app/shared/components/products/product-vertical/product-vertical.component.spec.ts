import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductVerticalComponent } from './product-vertical.component';

describe('ProductVerticalComponent', () => {
  let component: ProductVerticalComponent;
  let fixture: ComponentFixture<ProductVerticalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductVerticalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
