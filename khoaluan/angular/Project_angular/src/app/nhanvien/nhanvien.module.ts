import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaocaoModule } from '../admin/baocao/baocao.module';
import { HoadonxuatModule } from '../admin/hoadonxuat/hoadonxuat.module';
import { KhuyenmaiModule } from '../admin/khuyenmai/khuyenmai.module';
import { ShareModule } from '../share/share.module';
import { NhanVienRoutingModule } from './nhanvien-routing.module';
import { NhanvienComponent } from './nhanvien.component';

@NgModule({
    declarations: [NhanvienComponent],
    imports: [
        CommonModule,
        NhanVienRoutingModule,
        HoadonxuatModule,
        BaocaoModule,
        KhuyenmaiModule,
        ShareModule
    ]
})
export class NhanvienModule {}
