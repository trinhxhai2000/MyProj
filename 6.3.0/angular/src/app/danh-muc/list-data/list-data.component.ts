import { Component, Input, OnInit } from '@angular/core';
import { TinhDTO, TinhServiceProxy, HuyenServiceProxy, HuyenDTO, GetHuyenByTinhIdDto} from '@shared/service-proxies/service-proxies';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.css'],
  providers: [ROUTER_PROVIDERS]
})
export class ListDataComponent implements OnInit {

  tinhs: TinhDTO[] = [];
  huyens: HuyenDTO[] = [];
  tinhId = -1;

  constructor(
    private tinhService: TinhServiceProxy,
    private huyenService: HuyenServiceProxy,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
    const input  = new TinhDTO();
    this.tinhService.getAllTinh().subscribe(
      result=>{
        this.tinhs = result;
    });
  }
  selectTinh(id: number){
    console.log("list-data : selecting tinh ", id);
    const input = new GetHuyenByTinhIdDto();
    input.tinhId = id;
    this.huyenService.getAllHuyenByTinhId(input).subscribe(
      result =>{
        this.huyens = result
      }
    )

  }
  deleteTinh(id:number){
    const input :number = id
    console.log("Xoa tinh");
    this.tinhService.deleteTinh(input).subscribe(
      () => {
        this.tinhs = this.tinhs.filter(t => t.tinhId != id)
        console.log("Xoa tinh COMPLETE !");
      }

    )
  }
  deleteHuyen(id:number){
    const input :number = id
    console.log("Xoa huyen",id);
    this.huyenService.deleteHuyen(input).subscribe(
      () => {
        this.huyens = this.huyens.filter(h => h.id != id)
        console.log("Xoa huyen COMPLETE !");
      }

    )
  }
  goAddTinh(){
    this.router.navigateByUrl('../add-tinh');
  }

}
