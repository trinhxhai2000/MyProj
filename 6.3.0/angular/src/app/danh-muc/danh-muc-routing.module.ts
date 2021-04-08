import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TinhDetailComponent } from './tinh-detail/tinh-detail.component';
import { TinhComponent } from './tinh/tinh.component';
import { ListDataComponent } from './list-data/list-data.component';
import { AddTinhComponent } from './add-tinh/add-tinh.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
const routes: Routes = [
  {
    path: 'tinh',
    component:ListDataComponent,
    data: { permission: 'Pages.DanhMuc.Tinh'}, canActivate: [AppRouteGuard]
  },
  {
    path: 'tinh/:id',
    component:TinhDetailComponent,
    data: { permission: 'Pages.DanhMuc.Tinh'}, canActivate: [AppRouteGuard]
  },
  {
    path: 'add-tinh',
    component:AddTinhComponent,
    data: { permission: 'Pages.DanhMuc.Tinh'}, canActivate: [AppRouteGuard]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanhMucRoutingModule { }
