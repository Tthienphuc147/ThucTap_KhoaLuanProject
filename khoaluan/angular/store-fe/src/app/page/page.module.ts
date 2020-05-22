import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RecaptchaComponent, RecaptchaModule } from 'ng-recaptcha';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MyHelper } from '../helper/MyHelper';
import { DialogService } from '../services/dialog.service';
import { ShareModule } from '../share/share.module';
import { PageRoutingModule } from './page-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { PageComponent } from './page.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { SlideComponent } from './layout/slide/slide.component';
// import { CartComponent } from './cart/cart.component';
// import { DangkyComponent } from './dangky/dangky.component';
// import { DangnhapComponent } from './dangnhap/dangnhap.component';
// import { GiohangComponent } from './giohang/giohang.component';
// import { RowGiohangComponent } from './giohang/row-giohang/row-giohang.component';
// import { HomePageModule } from './home-page/home-page.module';
// import { FooterComponent } from './layout/footer/footer.component';
// import { BoxTimkiemComponent } from './layout/header/box-timkiem/box-timkiem.component';
// import { HeaderComponent } from './layout/header/header.component';
// import { PageRoutingModule } from './page-routing.module';
// import { PageComponent } from './page.component';
// import { ResetPasswordComponent } from './reset-password/reset-password.component';
// import { SearchModule } from './search/search.module';

RecaptchaComponent.prototype.ngOnDestroy = function() {
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
};

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        SlideComponent,
        // GiohangComponent,
        PageComponent,
        // CartComponent,
        // RowGiohangComponent,
        // BoxTimkiemComponent,
        // DangnhapComponent,
        // DangkyComponent,
        // ResetPasswordComponent
    HomePageComponent,
        SlideComponent],
    imports: [
        HttpClientModule,
        PageRoutingModule,
        ShareModule,
        SlickCarouselModule,
        // HomePageModule,
        RecaptchaModule,
        // SearchModule
    ],
    entryComponents: [
        // DangkyComponent,
        // ResetPasswordComponent,
        // DangnhapComponent
    ],
    providers: [MyHelper, DialogService],
    exports: []
})
export class PageModule {}
