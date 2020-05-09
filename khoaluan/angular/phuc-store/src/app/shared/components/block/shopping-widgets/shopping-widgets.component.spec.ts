import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingWidgetsComponent } from './shopping-widgets.component';

describe('ShoppingWidgetsComponent', () => {
  let component: ShoppingWidgetsComponent;
  let fixture: ComponentFixture<ShoppingWidgetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingWidgetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
