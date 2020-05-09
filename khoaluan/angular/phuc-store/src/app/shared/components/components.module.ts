import { SharedModule } from './../shared.module';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './block/header/header.component';
import { FooterComponent } from './block/footer/footer.component';
import { BannersComponent } from './block/banners/banners.component';
import { SidebarComponent } from './block/sidebar/sidebar.component';
import { MenuComponent } from './block/menu/menu.component';
import { ShoppingWidgetsComponent } from './block/shopping-widgets/shopping-widgets.component';
import { BlogSectionComponent } from './block/blog-section/blog-section.component';
import { CategoriesMenuComponent } from './block/categories-menu/categories-menu.component';
import { CategoriesSectionComponent } from './block/categories-section/categories-section.component';
import { BannerPromotionComponent } from './block/banner-promotion/banner-promotion.component';
import { MainCarouselComponent } from './block/main-carousel/main-carousel.component';
import { ProductsComponent } from './products/products.component';
import { PriceComponent } from './products/price/price.component';
import { ProductComponent } from './products/product/product.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductLeftSidebarComponent } from './products/product-left-sidebar/product-left-sidebar.component';
import { ProductVerticalComponent } from './products/product-vertical/product-vertical.component';
import { ProductDialogComponent } from './popup/product-dialog/product-dialog.component';
@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    SharedModule
  ],
  declarations: [HeaderComponent, FooterComponent, BannersComponent, SidebarComponent, MenuComponent
    , ShoppingWidgetsComponent, BlogSectionComponent, CategoriesMenuComponent
    , CategoriesSectionComponent, BannerPromotionComponent, MainCarouselComponent
    , ProductsComponent, PriceComponent, ProductComponent, ProductDetailComponent
    , ProductLeftSidebarComponent, ProductVerticalComponent, ProductDialogComponent]
})
export class ComponentsModule {}
