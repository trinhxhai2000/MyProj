import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TinhDTO , TinhServiceProxy } from '@shared/service-proxies/service-proxies';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-tinh',
  templateUrl: './add-tinh.component.html',
  styleUrls: ['./add-tinh.component.css']
})
export class AddTinhComponent implements OnInit {

  constructor(
    private tinhService: TinhServiceProxy,
    private location : Location,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }
  curTinh = {
    id : -1,
    name : "",
    TTTU : false
  }
  onSubmit(form : NgForm){

    const input = new TinhDTO();
    input.name = form.value.name
    input.tttu = form.value.tttu
    this.tinhService.postTodoItem(input).subscribe(
      () => this.goBack()
    )
    console.log(form.value)
    console.log(form.value.name)
  }
  goBack(): void {
    this.location.back();
  }

}
