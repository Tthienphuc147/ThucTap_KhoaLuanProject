import { NgModule } from '@angular/core';

import { SanphamListComponent } from './sanpham-list/sanpham-list.component';
import { SanphamCreateComponent } from './sanpham-create/sanpham-create.component';
import { SanphamEditComponent } from './sanpham-edit/sanpham-edit.component';


import { SanphamComponent } from './sanpham.component';
import { ImageAddComponent } from './image-add/image-add.component';
import { ShareModule } from '../../share/share.module';
import { CommonModule } from '@angular/common';
import { CKEditorModule } from 'ng2-ckeditor';
import { MobileService } from 'src/app/services/mobile.service';

@NgModule({
  declarations: [
    SanphamListComponent,
    SanphamCreateComponent,
    SanphamEditComponent,
    SanphamComponent,
    ImageAddComponent
  ],
  imports: [
    CommonModule,
    CKEditorModule,
    ShareModule,



  ],
  entryComponents: [
    SanphamEditComponent,
    SanphamCreateComponent,
    ImageAddComponent
  ],
  providers: [],
  exports: [
    SanphamListComponent,
    SanphamCreateComponent,
    SanphamEditComponent,
    SanphamComponent,
    ImageAddComponent
  ]
})
export class SanphamModule { }
