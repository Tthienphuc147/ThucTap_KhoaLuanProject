
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DanhgiaCreateComponent } from './danhgia-create/danhgia-create.component';
import { DanhgiaEditComponent } from './danhgia-edit/danhgia-edit.component';
import { DanhgiaListComponent } from './danhgia-list/danhgia-list.component';
import { ShareModule } from '../../share/share.module';
import { DanhgiaComponent } from './danhgia.component';


@NgModule({
  declarations: [
    DanhgiaCreateComponent,
    DanhgiaEditComponent,
    DanhgiaListComponent,
    DanhgiaComponent
  ],
  imports: [
    CommonModule,
    ShareModule
  ],
  exports: [
    DanhgiaCreateComponent,
    DanhgiaEditComponent,
    DanhgiaListComponent,
    DanhgiaComponent
  ]
})
export class DanhgiaModule { }
