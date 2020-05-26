import { LienHeModule } from './lienhe/lienhe.module';
import { DichVuModule } from './dichvu/dichvu.module';
import { TinTucModule } from './tintuc/tintuc.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RecaptchaComponent, RecaptchaModule } from 'ng-recaptcha';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { MyHelper } from '../helper/MyHelper';
import { DialogService } from '../services/dialog.service';
import { ShareModule } from '../share/share.module';
import { CartComponent } from './cart/cart.component';
import { DangkyComponent } from './dangky/dangky.component';
import { DangnhapComponent } from './dangnhap/dangnhap.component';
import { GiohangComponent } from './giohang/giohang.component';
import { RowGiohangComponent } from './giohang/row-giohang/row-giohang.component';
import { HomePageModule } from './home-page/home-page.module';
import { FooterComponent } from './layout/footer/footer.component';
import { BoxTimkiemComponent } from './layout/header/box-timkiem/box-timkiem.component';
import { HeaderComponent } from './layout/header/header.component';
import { PageRoutingModule } from './page-routing.module';
import { PageComponent } from './page.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SearchModule } from './search/search.module';
import { TintucComponent } from './tintuc/tintuc.component';
import { LoaiTinTucComponent } from './loai-tin-tuc/loai-tin-tuc.component';
import { ChiTietBaoVietComponent } from './chi-tiet-bao-viet/chi-tiet-bao-viet.component';

RecaptchaComponent.prototype.ngOnDestroy = function() {
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
};

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        GiohangComponent,
        PageComponent,
        CartComponent,
        RowGiohangComponent,
        BoxTimkiemComponent,
        DangnhapComponent,
        DangkyComponent,
        ResetPasswordComponent,
    ],
    imports: [
        HttpClientModule,
        PageRoutingModule,
        ShareModule,
        SlickCarouselModule,
        HomePageModule,
        RecaptchaModule,
        SearchModule,
        TinTucModule,
        DichVuModule,
        LienHeModule
    ],
    entryComponents: [
        DangkyComponent,
        ResetPasswordComponent,
        DangnhapComponent
    ],
    providers: [MyHelper, DialogService],
    exports: [DangnhapComponent]
})
export class PageModule {}
