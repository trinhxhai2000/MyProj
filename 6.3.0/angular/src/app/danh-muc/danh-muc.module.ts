import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DanhMucRoutingModule } from './danh-muc-routing.module';
import { TinhComponent } from './tinh/tinh.component';


@NgModule({
  declarations: [
    TinhComponent
  ],
  imports: [
    CommonModule,
    DanhMucRoutingModule
  ]
})
export class DanhMucModule {

}

