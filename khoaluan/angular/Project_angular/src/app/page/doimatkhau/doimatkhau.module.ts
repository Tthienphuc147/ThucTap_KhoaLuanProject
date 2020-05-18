import { NgModule, ModuleWithProviders } from '@angular/core';
import { DoimatkhauComponent } from './doimatkhau.component';
import { Routes, RouterModule } from '@angular/router';
import { ShareModule } from '../../share/share.module';

const routing: Routes = [{ path: '', component: DoimatkhauComponent }];
const Routing: ModuleWithProviders = RouterModule.forChild(routing);
@NgModule({
    declarations: [DoimatkhauComponent],
    imports: [ShareModule, Routing],
    entryComponents: [DoimatkhauComponent]
})
export class DoimatkhauModule {}
