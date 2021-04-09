import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DanhMucRoutingModule } from './danh-muc-routing.module';
import { TinhComponent } from './tinh/tinh.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzListModule } from 'ng-zorro-antd/list';
import { TinhDetailComponent } from './tinh-detail/tinh-detail.component';
import { ListDataComponent } from './list-data/list-data.component';
import { AddTinhComponent } from './add-tinh/add-tinh.component';

import { FormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { HuyenComponent } from './huyen/huyen.component';
import { HuyenDetailComponent } from './huyen-detail/huyen-detail.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { AddHuyenComponent } from './add-huyen/add-huyen.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

@NgModule({
  declarations: [
    TinhComponent,
    TinhDetailComponent,
    ListDataComponent,
    AddTinhComponent,
    HuyenComponent,
    HuyenDetailComponent,
    AddHuyenComponent
  ],
  imports: [
    CommonModule,
    DanhMucRoutingModule,
    NzButtonModule,
    NzListModule,
    FormsModule,
    NzFormModule,
    NzSwitchModule,
    NzSelectModule,
    NzPageHeaderModule
  ]
})
export class DanhMucModule {

}

