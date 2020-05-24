import { DichVuComponent } from './dichvu/dichvu.component';
import { TintucComponent } from './tintuc/tintuc.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../helper/auth.guard';
import { CartGuard } from '../helper/cart.guard';
import { GiohangComponent } from './giohang/giohang.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PageComponent } from './page.component';

const routes: Routes = [
    {
        path: '',
        component: PageComponent,
        children: [
            {
                path: '',
                component: HomePageComponent
            },

            {
                path: 'reset_password/:token',
                loadChildren: () =>
                    import('./doimatkhau/doimatkhau.module').then(
                        m => m.DoimatkhauModule
                    )
            },
            {
                path: 'chitietsanpham/:id',
                loadChildren: () =>
                    import('./chitietsanpham/chitietsanpham.module').then(
                        m => m.ChitietsanphamModule
                    )
            },
            {
                path: 'chitietbaiviet/:id',
                loadChildren: () =>
                    import('./chi-tiet-bao-viet/chitietbaiviet.module').then(
                        m => m.ChiTietBaiVietModule
                    )
            },
            {
                path: 'chitietdichvu/:id',
                loadChildren: () =>
                    import('./chi-tiet-dich-vu/chitietdichvu.module').then(
                        m => m.ChiTietDichVuModule
                    )
            },
            {
                path: 'giohang',
                component: GiohangComponent
            },
            {
                path: 'thanhtoan',
                loadChildren: () =>
                    import('./thanhtoan/thanhtoan.module').then(
                        m => m.ThanhtoanModule
                    ),
                canActivate: [CartGuard]
            },
            {
                path: 'profile',
                loadChildren: () =>
                    import('./profile/profile.module').then(
                        m => m.ProfileModule
                    ),
                canActivate: [AuthGuard]
            },
            {
                path: 'search',
                loadChildren: () =>
                    import('./search/search.module').then(m => m.SearchModule)
            },
            {
                path: 'tintuc',
                component: TintucComponent
            },
            {
                path: 'dichvu',
                component: DichVuComponent
            }
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PageRoutingModule {}
