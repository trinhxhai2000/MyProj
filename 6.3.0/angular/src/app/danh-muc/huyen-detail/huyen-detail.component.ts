import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {HuyenServiceProxy, ModifingHuyenInput } from '@shared/service-proxies/service-proxies';
import {TinhServiceProxy, TinhDTO} from '@shared/service-proxies/service-proxies';

import { Subject } from 'rxjs';
import { filter, startWith, switchMap, take, tap } from 'rxjs/operators';

import { EditHuyen_HuyenNameValidator } from '../validators/no-whitespaces.validator';

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
    private location: Location,
    private fb: FormBuilder
  ) { }

  @Input() huyenId:number
  huyen: ModifingHuyenInput = new ModifingHuyenInput()

  tinhs: TinhDTO[] = []
  oriTinhId:number;

  tinh: TinhDTO = new TinhDTO()
  editingForm: FormGroup;
  formSubmit$ = new Subject<any>();
  selectedTinh = new TinhDTO();
  ngOnInit(): void {
    // huyen

    this.editingForm= this.fb.group({
      name: [
        "",
        Validators.compose([
          Validators.pattern(/^[a-zA-Za-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+[a-zA-Za-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ 0-9]*$/i),
       ]),

       ,

    ],
      tinhId: -1,
    });
    this.loadData()

    this.editingForm.controls['tinhId'].valueChanges.subscribe(
      val => {
        const nameCtrl = this.editingForm.controls['name'];
        nameCtrl.setAsyncValidators(EditHuyen_HuyenNameValidator.createValidator(this.huyenService,val.tinhId, this.oriTinhId));
        console.log("set async valid "+ val.tinhId +" "+ this.oriTinhId)
        nameCtrl.markAsDirty();
        nameCtrl.updateValueAndValidity();
      }
    )

  }

  loadData(){

    this.tinhService.getAllTinh().subscribe(
      res=>{
        this.tinhs = res
      }
    )
    // load current Huyen
    // const id: number = +this.route.snapshot.paramMap.get('id');
    // console.log("Huyen id: ", this.huyenId)
    this.huyenService.getHuyen(this.huyenId).subscribe(
      result=>{
        this.huyen.huyenId = result.id;
        this.editingForm.controls['name'].setValue(result.name);

        this.selectedTinh = this.tinhs.find(t=>t.tinhId == result.tinhDto.tinhId);
        this.oriTinhId  = result.tinhDto.tinhId;
        // this.editingForm.controls['tinhId'].setValue(selectedTinh);
        this.huyen.tinhId = result.tinhDto.tinhId
      }
    );


    this.formSubmit$
      .pipe(
        tap(() => this.editingForm.markAsDirty()),
        switchMap(() =>
          this.editingForm.statusChanges.pipe(
            startWith(this.editingForm.status),
            filter(status => status !== "PENDING"),
            take(1)
          )
        ),
        filter(status => status === "VALID")
      )
      .subscribe(validationSuccessful => this.submitForm());
  }


  submitForm(): void {

    const input = new ModifingHuyenInput();

    input.name = this.editingForm.value.name
    input.tinhId = this.editingForm.value.tinhId.tinhId
    input.huyenId = this.huyen.huyenId
    console.log(input);
    this.huyenService.updateHuyen(input).subscribe()
  }



}
