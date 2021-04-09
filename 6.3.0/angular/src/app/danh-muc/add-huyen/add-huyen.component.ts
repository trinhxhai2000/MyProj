import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModifingHuyenInput , HuyenServiceProxy , TinhServiceProxy, TinhDTO } from '@shared/service-proxies/service-proxies';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-add-huyen',
  templateUrl: './add-huyen.component.html',
  styleUrls: ['./add-huyen.component.css']
})
export class AddHuyenComponent implements OnInit {

  constructor(
    private huyenService: HuyenServiceProxy,private tinhService: TinhServiceProxy,
    private location : Location,
    private route: ActivatedRoute,
  ) { }

  tinhs: TinhDTO[]
  ngOnInit(): void {
    this.loadData()
  }
  loadData(){
    this.tinhService.getAllTinh().subscribe(
      res=>{
        this.tinhs = res
      }
    )
  }
  curHuyen ={
    tinhId : 0,
    name : "",
  }
  onSubmit(form : NgForm){
    const input = new ModifingHuyenInput();
    input.name = form.value.name
    input.tinhId = form.value.tinhId
    console.log(input)
    this.huyenService.addHuyen(input).subscribe(
      () => this.goBack()
    )
  }
  goBack(): void {
    this.location.back();
  }

}
