import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from '../admin-routing.module';
import { DanhmucComponent } from './danhmuc.component';
import { DanhmucAddComponent } from './danhmuc-add/danhmuc-add.component';
import { DanhmucEditComponent } from './danhmuc-edit/danhmuc-edit.component';
import { DanhmucListComponent } from './danhmuc-list/danhmuc-list.component';
import { DemoMaterialModule } from '../masterial-module';


@NgModule({
  declarations: [
    DanhmucComponent,
    DanhmucAddComponent,
    DanhmucEditComponent,
    DanhmucListComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    DemoMaterialModule,
    ReactiveFormsModule
  ],
  entryComponents: [
    DanhmucComponent,
    DanhmucAddComponent,
    DanhmucEditComponent,
    DanhmucListComponent,
  ]
})
export class DanhmucModule { }
