import { NgModule } from '@angular/core';
import {
    Routes,
    RouterModule,
    PreloadAllModules,
    CanActivate
} from '@angular/router';
import { AdminGuard } from './helper/admin.guard';
import { NhanvienGuard } from './helper/nhanvien.guard';
import { RootadminGuard } from './helper/rootadmin.guard';
const routes: Routes = [
    {
        path: '',
        canActivate: [RootadminGuard],
        loadChildren: () => import('./page/page.module').then(m => m.PageModule)
    },
    {
        path: 'admin',
        canActivate: [AdminGuard],
        loadChildren: () =>
            import('./admin/admin.module').then(m => m.AdminModule)
    },
    {
        path: 'nhanvien',
        canActivate: [NhanvienGuard],
        loadChildren: () =>
            import('./nhanvien/nhanvien.module').then(m => m.NhanvienModule)
    },
    {
        path: '**',
        redirectTo: '/',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    // imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
