import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaocaoListComponent } from './baocao-list/baocao-list.component';
import { ShareModule } from '../../share/share.module';

import { BaocaoKhachhangComponent } from './baocao-khachhang/baocao-khachhang.component';
import { BaocaoDonhangComponent } from './baocao-donhang/baocao-donhang.component';
import { BaocaoSanphamComponent } from './baocao-sanpham/baocao-sanpham.component';
import { DoanhthuComponent } from './doanhthu/doanhthu.component';
import { BaocaoComponent } from './baocao.component';

import { CKEditorModule } from 'ng2-ckeditor';

@NgModule({
  declarations: [
    BaocaoListComponent,
    BaocaoKhachhangComponent,
    BaocaoDonhangComponent,
    BaocaoSanphamComponent,
    DoanhthuComponent,
    BaocaoComponent
  ],
  imports: [
    CommonModule,
    ShareModule,
    CKEditorModule


  ],
  exports: [
    BaocaoListComponent,
    BaocaoKhachhangComponent,
    BaocaoDonhangComponent,
    BaocaoSanphamComponent,
    DoanhthuComponent,
    BaocaoComponent
  ]
})
export class BaocaoModule { }
