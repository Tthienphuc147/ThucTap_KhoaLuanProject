import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerPromotionComponent } from './banner-promotion.component';

describe('BannerPromotionComponent', () => {
  let component: BannerPromotionComponent;
  let fixture: ComponentFixture<BannerPromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerPromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
