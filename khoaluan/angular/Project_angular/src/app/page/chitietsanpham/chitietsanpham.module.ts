import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareModule } from '../../share/share.module';
import { ChitietsanphamComponent } from './chitietsanpham.component';
import { DanhgiaComponent } from './danhgia/danhgia.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SanphamlienquanComponent } from '../components/sanphamlienquan/sanphamlienquan.component';
import { Routes, RouterModule } from '@angular/router';
import { PageModule } from '../page.module';
import { LoadingModule } from '../loading/loading.module';

const routing: Routes = [{ path: '', component: ChitietsanphamComponent }];
const Routing: ModuleWithProviders = RouterModule.forChild(routing);
@NgModule({
    declarations: [
        ChitietsanphamComponent,
        DanhgiaComponent,
        SanphamlienquanComponent
    ],
    imports: [
        CommonModule,
        ShareModule,
        SlickCarouselModule,
        Routing,
        LoadingModule
    ],
    exports: [
        ChitietsanphamComponent,
        DanhgiaComponent,
        SanphamlienquanComponent
    ]
})
export class ChitietsanphamModule {}
