import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuyenCreateComponent } from './quyen-create/quyen-create.component';
import { QuyenEditComponent } from './quyen-edit/quyen-edit.component';
import { QuyenListComponent } from './quyen-list/quyen-list.component';
import { ShareModule } from '../../share/share.module';
import { QuyenComponent } from './quyen.component';

@NgModule({
  declarations: [QuyenCreateComponent, QuyenEditComponent, QuyenListComponent, QuyenComponent],
  imports: [

    ShareModule
  ],
  entryComponents: [
    QuyenCreateComponent,
    QuyenEditComponent
  ],
  exports: [
    QuyenCreateComponent, QuyenEditComponent, QuyenListComponent, QuyenComponent
  ]
})
export class QuyenModule { }
