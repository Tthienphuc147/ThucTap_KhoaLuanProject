import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogService } from '../../services/dialog.service';
import { ShareModule } from '../../share/share.module';
import { ChitietdonhangComponent } from './chitietdonhang/chitietdonhang.component';
import { DoimatkhauProfileComponent } from './doimatkhau/doimatkhau.component';
import { LichsuhoadonComponent } from './lichsuhoadon/lichsuhoadon.component';
import { ProfileComponent } from './profile.component';

const routing: Routes = [{ path: '', component: ProfileComponent }];
const Routing: ModuleWithProviders = RouterModule.forChild(routing);
@NgModule({
    declarations: [
        ProfileComponent,
        ChitietdonhangComponent,
        DoimatkhauProfileComponent,
        LichsuhoadonComponent
    ],
    imports: [ShareModule, Routing],
    exports: [
        ProfileComponent,
        ChitietdonhangComponent,
        DoimatkhauProfileComponent,
        LichsuhoadonComponent
    ],
    entryComponents: [ChitietdonhangComponent, DoimatkhauProfileComponent],
    providers: [DialogService]
})
export class ProfileModule {}
