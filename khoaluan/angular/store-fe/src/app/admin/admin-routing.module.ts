
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NhacungcapListComponent } from '../admin/nhacungcap/nhacungcap-list/nhacungcap-list.component';
import { NhacungcapComponent } from './nhacungcap/nhacungcap.component';
import { AdminComponent } from './admin.component';
import { NhasanxuatComponent } from './nhasanxuat/nhasanxuat.component';
import { NhasanxuatListComponent } from './nhasanxuat/nhasanxuat-list/nhasanxuat-list.component';
import { DanhmucComponent } from './danhmuc/danhmuc.component';
import { DanhmucListComponent } from './danhmuc/danhmuc-list/danhmuc-list.component';
import { SanphamComponent } from './sanpham/sanpham.component';
import { SanphamListComponent } from './sanpham/sanpham-list/sanpham-list.component';
import { DanhmuchinhComponent } from './danhmuchinh/danhmuchinh.component';
import { DanhmuchinhListComponent } from './danhmuchinh/danhmuchinh-list/danhmuchinh-list.component';
import { PhanquyenComponent } from './phanquyen/phanquyen.component';
import { KhuyenmaiComponent } from './khuyenmai/khuyenmai.component';
import { KhuyenmaiDetailComponent } from './khuyenmai/khuyenmai-detail/khuyenmai-detail.component';
import { KhuyenmaiListComponent } from './khuyenmai/khuyenmai-list/khuyenmai-list.component';
import { QuyenComponent } from './quyen/quyen.component';
import { QuyenListComponent } from './quyen/quyen-list/quyen-list.component';
import { DanhgiaComponent } from './danhgia/danhgia.component';
import { DanhgiaListComponent } from './danhgia/danhgia-list/danhgia-list.component';
import { HoadonnhapComponent } from './hoadonnhap/hoadonnhap.component';
import { HoadonnhapListComponent } from './hoadonnhap/hoadonnhap-list/hoadonnhap-list.component';
import { HoadonxuatComponent } from './hoadonxuat/hoadonxuat.component';
import { HoadonxuatListComponent } from './hoadonxuat/hoadonxuat-list/hoadonxuat-list.component';
import { HoadonnhapDetailComponent } from './hoadonnhap/hoadonnhap-detail/hoadonnhap-detail.component';
import { HoadonxuatEditComponent } from './hoadonxuat/hoadonxuat-edit/hoadonxuat-edit.component';
import { DiadiemComponent } from './diadiem/diadiem.component';
import { DiadiemListComponent } from './diadiem/diadiem-list/diadiem-list.component';
import { BaocaoComponent } from './baocao/baocao.component';
import { BaocaoListComponent } from './baocao/baocao-list/baocao-list.component';
import { PhanquyenListComponent } from './phanquyen/phanquyen-list/phanquyen-list.component';
import { AdminGuard } from '../helper/admin.guard';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: "",
        component: AdminComponent,
        children: [
            {
                path: "", redirectTo: "dashboard", pathMatch: "full"
            },
            {
                path: "dashboard", component: DashboardComponent
            },
            {
                path: "baocao", component: BaocaoComponent,
                children: [
                    { path: '', component: BaocaoListComponent },
                ]
            },
            {
                path: "phanquyen", component: PhanquyenComponent,
                children: [
                    { path: '', component: PhanquyenListComponent },
                ]
            },
            {
                path: "nhacungcap", component: NhacungcapComponent,
                children: [
                    { path: '', component: NhacungcapListComponent },
                ]
            },
            {
                path: "nhasanxuat", component: NhasanxuatComponent,
                children: [
                    { path: '', component: NhasanxuatListComponent },
                ]
            },
            {
                path: "danhmuc", component: DanhmucComponent,
                children: [
                    { path: '', component: DanhmucListComponent },
                ]
            },
            {
                path: "danhmuchinh", component: DanhmuchinhComponent,
                children: [
                    { path: '', component: DanhmuchinhListComponent },
                ]
            },
            {
                path: "sanpham", component: SanphamComponent,
                children: [
                    { path: '', component: SanphamListComponent },

                ]
            },
            {
                path: "khuyenmai", component: KhuyenmaiComponent,
                children: [
                    { path: '', component: KhuyenmaiListComponent },
                    { path: ':id/edit', component: KhuyenmaiDetailComponent },

                ]
            },
            {
                path: "quyen", component: QuyenComponent,
                children: [
                    { path: '', component: QuyenListComponent },
                ]
            },
            {
                path: "danhgia", component: DanhgiaComponent,
                children: [
                    { path: '', component: DanhgiaListComponent },

                ]
            },
            {
                path: "hoadonnhap", component: HoadonnhapComponent,
                children: [
                    { path: '', component: HoadonnhapListComponent },
                    { path: ':id/detail', component: HoadonnhapDetailComponent },

                ]
            },
            {
                path: "hoadonxuat", component: HoadonxuatComponent,
                children: [
                    { path: '', component: HoadonxuatListComponent },
                    { path: ':id/edit', component: HoadonxuatEditComponent },

                ]
            },
            {
                path: "diadiem", component: DiadiemComponent,
                children: [
                    { path: '', component: DiadiemListComponent },

                ]
            },



        ]
    },

]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }
