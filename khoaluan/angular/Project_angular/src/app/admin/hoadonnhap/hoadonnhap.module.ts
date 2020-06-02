import { NgModule } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { HoadonnhapListComponent } from './hoadonnhap-list/hoadonnhap-list.component';
import { HoadonnhapCreateComponent } from './hoadonnhap-create/hoadonnhap-create.component';
import { HoadonnhapEditComponent } from './hoadonnhap-edit/hoadonnhap-edit.component';
import { ShareModule } from '../../share/share.module';
import { HoadonnhapDetailComponent } from './hoadonnhap-detail/hoadonnhap-detail.component';
import { HoadonnhapComponent } from './hoadonnhap.component';
import { HoadonnhapDetailListComponent } from './hoadonnhap-detail-list/hoadonnhap-detail-listcomponent';


@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [HoadonnhapListComponent, HoadonnhapCreateComponent, HoadonnhapEditComponent, HoadonnhapDetailComponent, HoadonnhapComponent, HoadonnhapDetailListComponent],
  imports: [
    ShareModule,

  ],
  providers: [DatePipe,CurrencyPipe],
  entryComponents: [
    HoadonnhapCreateComponent,
    HoadonnhapEditComponent
  ],
  exports: [
    // tslint:disable-next-line: max-line-length
    HoadonnhapListComponent, HoadonnhapCreateComponent, HoadonnhapEditComponent, HoadonnhapDetailComponent, HoadonnhapComponent, HoadonnhapDetailListComponent
  ]
})
export class HoadonnhapModule { }
