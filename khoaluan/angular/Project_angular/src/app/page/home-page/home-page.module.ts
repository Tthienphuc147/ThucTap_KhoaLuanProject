import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ShareModule } from '../../share/share.module';
import { PageRoutingModule } from '../page-routing.module';
import { BlockDanhmucComponent } from './block-danhmuc/block-danhmuc.component';
import { HomePageComponent } from './home-page.component';
import { SanphammoiComponent } from './sanphammoi/sanphammoi.component';
import { SlideComponent } from './slide/slide.component';
import { BlockDanhMucComponent } from './block-danh-muc/block-danh-muc.component';
import { LoadingModule } from '../loading/loading.module';
import { NguCarouselModule } from '@ngu/carousel';

@NgModule({
    declarations: [
        HomePageComponent,
        BlockDanhmucComponent,
        SanphammoiComponent,
        SlideComponent,
        BlockDanhMucComponent
    ],
    imports: [
        CommonModule,
        ShareModule,
        PageRoutingModule,
        SlickCarouselModule,
        LoadingModule,
        NguCarouselModule
    ],
    exports: [
        HomePageComponent,
        BlockDanhmucComponent,
        SanphammoiComponent,
        BlockDanhMucComponent
    ]
})
export class HomePageModule {}
