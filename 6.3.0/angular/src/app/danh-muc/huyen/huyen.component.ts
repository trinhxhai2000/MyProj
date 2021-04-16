import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { HuyenDTO, HuyenServiceProxy, GetHuyenPageInp} from '@shared/service-proxies/service-proxies';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";
import { HuyenDetailComponent } from '../huyen-detail/huyen-detail.component';

@Component({
  selector: 'app-huyen',
  templateUrl: './huyen.component.html',
  styleUrls: ['./huyen.component.css']
})
export class HuyenComponent implements OnInit {

  @Output() onTinhSelectEmitter = new EventEmitter<number>();
  @ViewChild('editHuyenModel') editHuyenModel: TemplateRef<any>;

  _tinhId : number = -1;
  @Input() set tinhId(val: number){
    this._tinhId = val;
    this.loadDataFromServer(this.pageIndex, this.pageSize);
  };
  get tinhId():number{
    return this._tinhId;
  }

  total = 1;
  curHuyens: HuyenDTO[] = [];
  curHuyenId:number = 1
  loading = true;
  pageSize = 5;
  pageIndex = 1;
  constructor(
    private huyenService: HuyenServiceProxy,
    private modalService: NzModalService
    ) {}

  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
  ): void {
    this.loading = true;
    const inp = new GetHuyenPageInp();
    inp.idx = pageIndex;
    inp.numPage = pageSize;
    inp.tinhId = this.tinhId
    if (this.tinhId == -1) {
      this.loading = false;
      return;
    }
    // console.log(inp)
    this.huyenService.getHuyenPage(inp).subscribe(data => {
      this.loading = false;
      this.total = data["total"]; // mock the total data here
      this.curHuyens = data["huyens"];
    });
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    // console.log(params);
    const { pageSize, pageIndex} = params;
    this.loadDataFromServer(pageIndex, pageSize);
  }

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize);
  }
  editHuyen(huyenId:number){
    this.modalService.create({
      nzTitle: "Modal Title shiet 2",
      nzOnOk: (item)=>{ console.log("shiet OK", item.submitForm()); return true},
      nzCancelText: "Bỏ đi",
      nzOkText: "OK bb",
      nzKeyboard: true,
      nzContent: HuyenDetailComponent,
      nzComponentParams: { huyenId : huyenId }
    }).afterClose.subscribe(
      (result)=>{
      if(result)
        this.loadDataFromServer(this.pageIndex, this.pageSize);
      }
    )

  }
  deleteHuyen(id: number){
    console.log(id);
    this.huyenService.getHuyen(id).subscribe(
      huyen => {

        console.log(huyen.id);
        this.modalService.confirm({
          nzTitle: "Bạn chắc chắn muốn xóa huyện " + huyen.name +"  ?",
          nzContent: '',
          nzOkText: 'Xóa',
          nzOkType: 'primary',
          nzOkDanger: true,
          nzOnOk: () =>{
            this.huyenService.deleteHuyen(huyen.id).subscribe();
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
