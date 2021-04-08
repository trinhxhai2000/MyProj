import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';


import {
  TinhServiceProxy,
  TinhDTO,
  } from '@shared/service-proxies/service-proxies';


@Component({
  selector: 'app-tinh-detail',
  templateUrl: './tinh-detail.component.html',
  styleUrls: ['./tinh-detail.component.css']
})
export class TinhDetailComponent implements OnInit {

  constructor(
    private tinhService: TinhServiceProxy,
    private route: ActivatedRoute,
    private location: Location
  ) { }
  tinh: TinhDTO = new TinhDTO()
  ngOnInit(): void {
    this.loadData()
  }
  loadData(){
    const input  = new TinhDTO();
    const id = +this.route.snapshot.paramMap.get('id');
    input.id = id;
    this.tinhService.getTinh(input).subscribe(
      result=>{
        this.tinh = result;
      }
    );
  }


}
