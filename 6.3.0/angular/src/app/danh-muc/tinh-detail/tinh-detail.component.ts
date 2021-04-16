import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import {TinhServiceProxy,TinhDTO} from '@shared/service-proxies/service-proxies';
import { Subject } from 'rxjs';
import { FormBuilder,FormGroup, Validators } from '@angular/forms'
import { TinhNameEditNameValidator } from '../validators/no-whitespaces.validator';
import { filter, startWith, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-tinh-detail',
  templateUrl: './tinh-detail.component.html',
  styleUrls: ['./tinh-detail.component.css']
})
export class TinhDetailComponent implements OnInit {
  addingForm: any;

  constructor(
    private tinhService: TinhServiceProxy,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder
  ) { }
  tinh: TinhDTO = new TinhDTO()
  editingForm: FormGroup;
  formSubmit$ = new Subject<any>();

  ngOnInit(): void {

    this.editingForm= this.fb.group({
      name: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Za-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+[a-zA-Za-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ 0-9]*$/i),
       ])
      ],

      tttu: false,
    });

    this.loadData()
  }

  loadData(){

    const id: number = +this.route.snapshot.paramMap.get('id');
    this.tinhService.getTinh(id).subscribe(
      res => {
        this.editingForm.controls['name'].setAsyncValidators(TinhNameEditNameValidator.createValidator(this.tinhService,res.name) );

        this.tinh = res;
        this.editingForm.controls["name"].setValue(res.name);
        this.editingForm.controls["tttu"].setValue(res.tttu);

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
    )
  }


  submitForm(): void {
    const input = new TinhDTO();
    input.tinhId = this.tinh.tinhId
    input.name = this.editingForm.value.name
    input.tttu = this.editingForm.value.tttu

    this.tinhService.updateTinh(input).subscribe(
      () => this.goBack()
    )
    console.log(this.editingForm.value.name)
    console.log(this.editingForm.value.tttu)
  }


  goBack(): void {
    this.location.back();
  }


}
