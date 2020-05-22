import { NgModule } from '@angular/core';
import { KhuyenmaiCreateComponent } from './khuyenmai-create/khuyenmai-create.component';
import { KhuyenmaiComponent } from './khuyenmai.component';
import { KhuyenmaiDetailComponent } from './khuyenmai-detail/khuyenmai-detail.component';
import { KhuyenmaiListComponent } from './khuyenmai-list/khuyenmai-list.component';
import { ShareModule } from '../../share/share.module';



@NgModule({
  declarations: [
    KhuyenmaiCreateComponent,
    KhuyenmaiComponent,
    KhuyenmaiDetailComponent,
    KhuyenmaiListComponent,
  ],
  imports: [
    ShareModule
  ],
  entryComponents: [
    KhuyenmaiCreateComponent
  ],
  exports: [
    KhuyenmaiCreateComponent,
    KhuyenmaiComponent,
    KhuyenmaiDetailComponent,
    KhuyenmaiListComponent,
  ]
})
export class KhuyenmaiModule { }
