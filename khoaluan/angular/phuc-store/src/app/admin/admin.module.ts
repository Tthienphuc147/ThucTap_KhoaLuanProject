
import { NgModule, ChangeDetectorRef } from '@angular/core';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NhacungcapModule } from './nhacungcap/nhacungcap.module';
import { NhasanxuatModule } from './nhasanxuat/nhasanxuat.module';
import { DanhmucModule } from './danhmuc/danhmuc.module';
import { SanphamModule } from './sanpham/sanpham.module';
import { DanhmuchinhModule } from './danhmuchinh/danhmuchinh.module';
import { KhuyenmaiModule } from './khuyenmai/khuyenmai.module';
import { QuyenModule } from './quyen/quyen.module';
import { DanhgiaModule } from './danhgia/danhgia.module';
import { HoadonnhapModule } from './hoadonnhap/hoadonnhap.module';
import { HoadonxuatModule } from './hoadonxuat/hoadonxuat.module';
import { DiadiemModule } from './diadiem/diadiem.module';
import { BaocaoModule } from './baocao/baocao.module';
import { PhanquyenModule } from './phanquyen/phanquyen.module';
import { ChartDoanhthuComponent } from './components/chart-doanhthu/chart-doanhthu.component';
import { FusionChartsModule } from 'angular-fusioncharts';
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import * as UmberTheme from 'fusioncharts/themes/fusioncharts.theme.umber';
import * as GammelTheme from 'fusioncharts/themes/fusioncharts.theme.gammel';
import { ChartTopSanphamComponent } from './components/chart-top-sanpham/chart-top-sanpham.component';
import { ShareModule } from '../share/share.module';
import { MyHelper } from '../helper/MyHelper';
import { BaocaoService } from '../services/baocao.service';
import { ConfirmDialogService } from '../services/confirm-dialog.service';


FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme, UmberTheme, GammelTheme)
@NgModule({
    declarations: [
        AdminComponent,
        DashboardComponent,
        ChartDoanhthuComponent,
        ChartTopSanphamComponent,

    ],
    imports: [
        AdminRoutingModule,
        NhacungcapModule,
        NhasanxuatModule,
        DanhmucModule,
        SanphamModule,
        DanhmuchinhModule,
        KhuyenmaiModule,
        QuyenModule,
        DanhgiaModule,
        HoadonnhapModule,
        HoadonxuatModule,
        DiadiemModule,
        PhanquyenModule,
        BaocaoModule,
        FusionChartsModule,
        ShareModule,

    ],
    providers: [
        MyHelper,
        BaocaoService,
        ConfirmDialogService,


    ],
    exports: [

    ],
    entryComponents: [

    ],

})
export class AdminModule { }
