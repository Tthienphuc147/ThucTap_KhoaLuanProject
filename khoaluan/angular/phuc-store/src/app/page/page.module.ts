import { ComponentsModule } from './../shared/components/components.module';
import { SharedModule } from './../shared/shared.module';
import { PageRoutingModule } from './page-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [MainComponent, HomeComponent],
  imports: [
    CommonModule,
    PageRoutingModule,
    SharedModule,
    ComponentsModule,
  ]
})
export class PageModule { }
