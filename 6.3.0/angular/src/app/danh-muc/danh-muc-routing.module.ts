import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TinhComponent } from './tinh/tinh.component';

const routes: Routes = [
  {
    path: 'tinh',
    component:TinhComponent,
    data: { permission: 'Pages.DanhMuc.Tinh'},
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanhMucRoutingModule { }
