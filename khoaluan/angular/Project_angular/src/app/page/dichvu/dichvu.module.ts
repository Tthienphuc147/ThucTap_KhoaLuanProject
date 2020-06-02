import { DichVuComponent } from './dichvu.component';
import { LoaiTinTucComponent } from '../loai-tin-tuc/loai-tin-tuc.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RecaptchaComponent, RecaptchaModule } from 'ng-recaptcha';
import { ShareModule } from 'src/app/share/share.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


RecaptchaComponent.prototype.ngOnDestroy = function() {
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
};

@NgModule({
    declarations: [
        DichVuComponent
    ],
    imports: [
        HttpClientModule,
        SlickCarouselModule,
        ShareModule,
        RecaptchaModule,
        NgxSkeletonLoaderModule,

    ],
    exports: [DichVuComponent]
})
export class DichVuModule {}