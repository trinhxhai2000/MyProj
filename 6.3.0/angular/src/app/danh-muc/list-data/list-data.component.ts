import { Component, Input, OnInit } from '@angular/core';
import { TinhDTO, TinhServiceProxy, HuyenServiceProxy, HuyenDTO, GetHuyenByTinhIdDto} from '@shared/service-proxies/service-proxies';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-list-data',
  templateUrl: './list-data.component.html',
  styleUrls: ['./list-data.component.css'],
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
  }
  onTinhSelect(tinhId){
    this.tinhId = tinhId;
  }



}
