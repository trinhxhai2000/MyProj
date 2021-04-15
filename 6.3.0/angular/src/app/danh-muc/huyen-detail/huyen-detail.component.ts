import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgForm } from '@angular/forms';

import {HuyenDTO, HuyenServiceProxy, ModifingHuyenInput } from '@shared/service-proxies/service-proxies';
import {TinhServiceProxy, TinhDTO} from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-huyen-detail',
  templateUrl: './huyen-detail.component.html',
  styleUrls: ['./huyen-detail.component.css']
})
export class HuyenDetailComponent implements OnInit {

  constructor(
    private huyenService: HuyenServiceProxy,
    private tinhService: TinhServiceProxy,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  @Input() huyenId:number
  huyen: ModifingHuyenInput = new ModifingHuyenInput()

  tinhs: TinhDTO[] = []

  ngOnInit(): void {
    // huyen
    this.loadData()
  }
  loadData(){
    // load current Huyen
    // const id: number = +this.route.snapshot.paramMap.get('id');
    // console.log("Huyen id: ", this.huyenId)
    this.huyenService.getHuyen(this.huyenId).subscribe(
      result=>{
        this.huyen.name = result.name;
        this.huyen.huyenId = result.id
        this.huyen.tinhId = result.tinhDto.tinhId;

      }
    );
    // load list Tinh
    this.tinhService.getAllTinh().subscribe(
      res=>{
        this.tinhs = res
      }
    )
  }


  onSubmit(form : NgForm){
    console.log(form.value)

    const input = new ModifingHuyenInput();

    input.name = form.value.name
    input.huyenId = this.huyen.huyenId
    input.tinhId = form.value.tinhId

    this.huyenService.updateHuyen(input).subscribe(
      // () => this.goBack()
    )

  }
  // goBack(): void {
  //   this.location.back();
  // }

}
