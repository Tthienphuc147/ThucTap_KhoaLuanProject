import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '../../share/share.module';
import { DathangthanhcongComponent } from '../dathangthanhcong/dathangthanhcong.component';
import { HoanthanhthanhtoanComponent } from './hoanthanhthanhtoan/hoanthanhthanhtoan.component';
import { ThanhtoanComponent } from './thanhtoan.component';

const routing: Routes = [{ path: '', component: ThanhtoanComponent }];
const Routing: ModuleWithProviders = RouterModule.forChild(routing);
@NgModule({
    declarations: [
        ThanhtoanComponent,
        HoanthanhthanhtoanComponent,
        DathangthanhcongComponent
    ],
    imports: [Routing, ShareModule],
    exports: [
        ThanhtoanComponent,
        HoanthanhthanhtoanComponent,
        DathangthanhcongComponent
    ]
})
export class ThanhtoanModule {}
