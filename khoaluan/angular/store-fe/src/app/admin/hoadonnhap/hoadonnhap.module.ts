import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HoadonnhapListComponent } from './hoadonnhap-list/hoadonnhap-list.component';
import { HoadonnhapCreateComponent } from './hoadonnhap-create/hoadonnhap-create.component';
import { HoadonnhapEditComponent } from './hoadonnhap-edit/hoadonnhap-edit.component';
import { ShareModule } from '../../share/share.module';
import { HoadonnhapDetailComponent } from './hoadonnhap-detail/hoadonnhap-detail.component';
import { HoadonnhapComponent } from './hoadonnhap.component';


@NgModule({
  declarations: [HoadonnhapListComponent, HoadonnhapCreateComponent, HoadonnhapEditComponent, HoadonnhapDetailComponent, HoadonnhapComponent],
  imports: [
    ShareModule,

  ],
  providers: [DatePipe],
  entryComponents: [
    HoadonnhapCreateComponent,
    HoadonnhapEditComponent
  ],
  exports: [
    HoadonnhapListComponent, HoadonnhapCreateComponent, HoadonnhapEditComponent, HoadonnhapDetailComponent, HoadonnhapComponent
  ]
})
export class HoadonnhapModule { }
