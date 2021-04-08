import { Component, OnInit } from '@angular/core';
import { TinhDTO, TinhServiceProxy } from '@shared/service-proxies/service-proxies';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.css']
})
export class ListDataComponent implements OnInit {

  tinhs: TinhDTO[] = [];
  tinhId = -1;
  constructor(
    private tinhService: TinhServiceProxy,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
    const input  = new TinhDTO();
    this.tinhService.getAllServerPaging(input).subscribe(
      result=>{
        this.tinhs = result;
    });
  }
  selectTinh(id: number){
    console.log("list-data : selecting tinh ", id);

  }

}
