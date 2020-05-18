import { NgModule } from '@angular/core';
import { HoadonxuatEditComponent } from './hoadonxuat-edit/hoadonxuat-edit.component';
import { HoadonxuatCreateComponent } from './hoadonxuat-create/hoadonxuat-create.component';
import { HoadonxuatListComponent } from './hoadonxuat-list/hoadonxuat-list.component';
import { ShareModule } from '../../share/share.module';
import { HoadonxuatTabComponent } from './hoadonxuat-tab/hoadonxuat-tab.component';
import { HoadonxuatComponent } from './hoadonxuat.component';

@NgModule({
  declarations: [
    HoadonxuatEditComponent,
    HoadonxuatCreateComponent,
    HoadonxuatListComponent,
    HoadonxuatTabComponent,
    HoadonxuatComponent
  ],
  imports: [
    ShareModule
  ],
  entryComponents: [
    HoadonxuatCreateComponent,
    HoadonxuatEditComponent
  ],
  exports: [
    HoadonxuatEditComponent,
    HoadonxuatCreateComponent,
    HoadonxuatListComponent,
    HoadonxuatTabComponent,
    HoadonxuatComponent
  ]
})
export class HoadonxuatModule { }
