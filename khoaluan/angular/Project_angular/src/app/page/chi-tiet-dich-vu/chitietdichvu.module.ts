import { ChiTietDichVuComponent } from './chi-tiet-dich-vu.component';
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
const routing: Routes = [{ path: '', component: ChiTietDichVuComponent}];
const Routing: ModuleWithProviders = RouterModule.forChild(routing);
@NgModule({
    declarations: [
        ChiTietDichVuComponent
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
    exports: [ChiTietDichVuComponent]
})
export class ChiTietDichVuModule {}
