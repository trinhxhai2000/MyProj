import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

import {TinhServiceProxy,TinhDTO, HuyenDTO, HuyenIdInput} from '@shared/service-proxies/service-proxies';


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
    const id: number = +this.route.snapshot.paramMap.get('id');
    const input :number = id
    this.tinhService.getTinh(input).subscribe(
      result=>{
        this.tinh = result;
        this.tinh.tinhId = id;
        this.tinh.name = result.name
        console.log(result)
      }
    );
  }


  onSubmit(form : NgForm){

    const input = new TinhDTO();
    input.tinhId = this.tinh.tinhId
    input.name = form.value.name
    input.tttu = form.value.tttu

    this.tinhService.updateTinh(input).subscribe(
      () => this.goBack()
    )
    console.log(form.value)
    console.log(form.value.name)
  }
  goBack(): void {
    this.location.back();
  }


}
