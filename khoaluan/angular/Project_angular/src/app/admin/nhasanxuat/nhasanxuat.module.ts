import { NgModule } from '@angular/core';
import { NhasanxuatComponent } from './nhasanxuat.component';
import { NhasanxuatAddComponent } from './nhasanxuat-add/nhasanxuat-add.component';
import { NhasanxuatListComponent } from './nhasanxuat-list/nhasanxuat-list.component';

import { NhasanxuatEditComponent } from '../../admin/nhasanxuat/nhasanxuat-edit/nhasanxuat-edit.component';
import { ShareModule } from '../../share/share.module';

@NgModule({
  declarations: [
    NhasanxuatComponent,
    NhasanxuatAddComponent,
    NhasanxuatListComponent,
    NhasanxuatAddComponent,
    NhasanxuatEditComponent
  ],
  imports: [
    ShareModule
  ],
  entryComponents: [
    NhasanxuatAddComponent,
    NhasanxuatEditComponent
  ],
  exports: [
    NhasanxuatComponent,
    NhasanxuatAddComponent,
    NhasanxuatListComponent,
    NhasanxuatAddComponent,
    NhasanxuatEditComponent
  ]
})
export class NhasanxuatModule { }
