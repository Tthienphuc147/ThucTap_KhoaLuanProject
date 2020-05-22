import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaocaoListComponent } from '../admin/baocao/baocao-list/baocao-list.component';
import { BaocaoComponent } from '../admin/baocao/baocao.component';
import { HoadonxuatListComponent } from '../admin/hoadonxuat/hoadonxuat-list/hoadonxuat-list.component';
import { HoadonxuatComponent } from '../admin/hoadonxuat/hoadonxuat.component';
import { KhuyenmaiListComponent } from '../admin/khuyenmai/khuyenmai-list/khuyenmai-list.component';
import { KhuyenmaiComponent } from '../admin/khuyenmai/khuyenmai.component';
import { NhanvienComponent } from './nhanvien.component';

const routes: Routes = [
    {
        path: '',
        component: NhanvienComponent,
        children: [
            {
                path: 'hoadonxuat',
                component: HoadonxuatComponent,
                children: [{ path: '', component: HoadonxuatListComponent }]
            },
            {
                path: 'baocao',
                component: BaocaoComponent,
                children: [{ path: '', component: BaocaoListComponent }]
            },
            {
                path: 'khuyenmai',
                component: KhuyenmaiComponent,
                children: [{ path: '', component: KhuyenmaiListComponent }]
            }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NhanVienRoutingModule {}
