import { NgModule } from '@angular/core';

import { DiadiemListComponent } from './diadiem-list/diadiem-list.component';
import { DiadiemEditComponent } from './diadiem-edit/diadiem-edit.component';
import { DiadiemCreateComponent } from './diadiem-create/diadiem-create.component';
import { ShareModule } from '../../share/share.module';
import { DiadiemComponent } from './diadiem.component';

@NgModule({
  declarations: [DiadiemListComponent, DiadiemEditComponent, DiadiemCreateComponent, DiadiemComponent],
  imports: [
    ShareModule
  ],
  entryComponents: [
    DiadiemCreateComponent,
    DiadiemEditComponent
  ],
  exports: [
    DiadiemListComponent, DiadiemEditComponent, DiadiemCreateComponent, DiadiemComponent
  ]

})
export class DiadiemModule { }
