import { NgModule } from '@angular/core';

import { NhacungcapComponent } from './nhacungcap.component';
import { NhacungcapListComponent } from './nhacungcap-list/nhacungcap-list.component';
import { NhacungcapAddComponent } from './nhacungcap-add/nhacungcap-add.component';

import { NhacungcapEditComponent } from './nhacungcap-edit/nhacungcap-edit.component';
import { ShareModule } from '../../share/share.module';



@NgModule({
  declarations: [
    NhacungcapComponent,
    NhacungcapListComponent,
    NhacungcapAddComponent,
    NhacungcapEditComponent
  ],
  imports: [
    ShareModule
  ],
  entryComponents: [
    NhacungcapAddComponent,
    NhacungcapEditComponent
  ],
  exports: [
    NhacungcapComponent,
    NhacungcapListComponent,
    NhacungcapAddComponent,
    NhacungcapEditComponent
  ]
})

export class NhacungcapModule { }
