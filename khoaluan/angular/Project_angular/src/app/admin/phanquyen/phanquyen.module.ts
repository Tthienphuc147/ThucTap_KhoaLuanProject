import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhanquyenListComponent } from './phanquyen-list/phanquyen-list.component';
import { PhanquyenTabComponent } from './phanquyen-tab/phanquyen-tab.component';
import { ShareModule } from '../../share/share.module';
import { PhanquyenComponent } from './phanquyen.component';

@NgModule({
  declarations: [
    PhanquyenListComponent,
    PhanquyenTabComponent,
    PhanquyenComponent
  ],
  imports: [

    ShareModule
  ],
  exports: [
    PhanquyenListComponent,
    PhanquyenTabComponent,
    PhanquyenComponent
  ]
})
export class PhanquyenModule { }
