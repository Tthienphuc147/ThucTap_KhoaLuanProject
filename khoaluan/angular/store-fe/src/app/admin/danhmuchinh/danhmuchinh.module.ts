import { NgModule } from '@angular/core';

import { DanhmuchinhListComponent } from './danhmuchinh-list/danhmuchinh-list.component';
import { DanhmuchinhCreateComponent } from './danhmuchinh-create/danhmuchinh-create.component';
import { DanhmuchinhEditComponent } from './danhmuchinh-edit/danhmuchinh-edit.component';
import { DanhmuchinhComponent } from './danhmuchinh.component';

import { ShareModule } from '../../share/share.module';

@NgModule({
  declarations: [
    DanhmuchinhListComponent,
    DanhmuchinhCreateComponent,
    DanhmuchinhEditComponent,
    DanhmuchinhComponent
  ],

  imports: [
    ShareModule
  ],
  entryComponents: [
    DanhmuchinhCreateComponent,
    DanhmuchinhEditComponent
  ],
  exports: [
    DanhmuchinhListComponent,
    DanhmuchinhCreateComponent,
    DanhmuchinhEditComponent,
    DanhmuchinhComponent
  ]

})
export class DanhmuchinhModule { }
