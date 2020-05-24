import { ChiTietBaoVietComponent } from './chi-tiet-bao-viet.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RecaptchaComponent, RecaptchaModule } from 'ng-recaptcha';
import { ShareModule } from 'src/app/share/share.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { LoadingModule } from '../loading/loading.module';
import { Routes, RouterModule } from '@angular/router';


RecaptchaComponent.prototype.ngOnDestroy = function() {
    if (this.subscription) {
        this.subscription.unsubscribe();
    }
};
const routing: Routes = [{ path: '', component: ChiTietBaoVietComponent}];
const Routing: ModuleWithProviders = RouterModule.forChild(routing);
@NgModule({
    declarations: [
        ChiTietBaoVietComponent
    ],
    imports: [
        HttpClientModule,
        SlickCarouselModule,
        ShareModule,
        RecaptchaModule,
        NgxSkeletonLoaderModule,
        Routing,
        LoadingModule

    ],
    exports: [ChiTietBaoVietComponent]
})
export class ChiTietBaiVietModule {}
