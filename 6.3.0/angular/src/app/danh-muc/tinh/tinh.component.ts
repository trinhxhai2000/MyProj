import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TinhDTO, TinhServiceProxy, GetTinhPageInp, GetHuyenPageOut} from '@shared/service-proxies/service-proxies';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";
@Component({
  selector: 'app-tinh',
  templateUrl: './tinh.component.html',
  styleUrls: ['./tinh.component.css']
})
export class TinhComponent implements OnInit {


  @Output() onTinhSelectEmitter = new EventEmitter<number>();
  total = 1;
  curTinhs: TinhDTO[] = [];
  loading = true;
  pageSize = 10;
  pageIndex = 1;


  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
  ): void {
    this.loading = true;
    const inp = new GetTinhPageInp();
    inp.idx = pageIndex;
    inp.numPage = pageSize;
    this.tinhService.getTinhPage(inp).subscribe(
      res => {
        this.loading = false;
        this.total = res.total; // mock the total data here
        this.curTinhs = res.tinhs;
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    this.loadDataFromServer(pageIndex, pageSize);
  }

  constructor(
    private tinhService: TinhServiceProxy,
    private modalService: NzModalService
    ) {}

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize);
  }
  onTinhSelect($event,tinhid){
    // console.log("Select ", tinhid)
    this.onTinhSelectEmitter.emit(tinhid);
  }
  deleteTinh(id: number){
    console.log(id);
    this.tinhService.getTinh(id).subscribe(
      tinh => {

        console.log(tinh.tinhId);
        this.modalService.confirm({
          nzTitle: "Bạn chắc chắn muốn xóa tỉnh " + tinh.name +"  ?",
          nzContent: '<b style="color: red;"> Khi xóa tỉnh tất cả các huyện thuộc tỉnh cũng sẽ bị xóa !! </b>',
          nzOkText: 'Xóa',
          nzOkType: 'primary',
          nzOkDanger: true,
          nzOnOk: () =>{
            this.tinhService.deleteTinh(tinh.tinhId).subscribe();
          },
          nzCancelText: 'No',
          nzOnCancel: () => console.log('Cancel delete tinh !')
        }).afterClose.subscribe(
          ()=>{
            this.loadDataFromServer(this.pageIndex, this.pageSize);
          }
        );


      }
    )
  }
}
