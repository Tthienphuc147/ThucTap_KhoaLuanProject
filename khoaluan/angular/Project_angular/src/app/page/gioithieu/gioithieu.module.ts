
import { LoaiTinTucComponent } from '../loai-tin-tuc/loai-tin-tuc.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RecaptchaComponent, RecaptchaModule } from 'ng-recaptcha';
import { ShareModule } from 'src/app/share/share.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { GioiThieuComponent } from './gioithieu.component';


RecaptchaComponent.prototype.ngOnDestroy = function() {
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
};

@NgModule({
    declarations: [
        GioiThieuComponent
    ],
    imports: [
        HttpClientModule,
        SlickCarouselModule,
        ShareModule,
        RecaptchaModule,
        NgxSkeletonLoaderModule,

    ],
    exports: [GioiThieuComponent]
})
export class GioiThieuModule {}
