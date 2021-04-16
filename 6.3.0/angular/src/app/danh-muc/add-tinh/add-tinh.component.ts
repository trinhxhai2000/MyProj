import { Component, OnInit } from '@angular/core';
import { TinhDTO , TinhServiceProxy } from '@shared/service-proxies/service-proxies';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder,FormGroup, Validators } from '@angular/forms'
import { TinhNameExistValidator } from '../validators/no-whitespaces.validator';

import { Subject } from "rxjs";
import {filter, startWith, switchMap, take, tap } from "rxjs/operators";

@Component({
  selector: 'app-add-tinh',
  templateUrl: './add-tinh.component.html',
  styleUrls: ['./add-tinh.component.css']
})
export class AddTinhComponent implements OnInit {

  constructor(
    private tinhService: TinhServiceProxy,
    private location : Location,
    private fb: FormBuilder
  ) { }

  curTinh = {
    id : -1,
    name : "",
    TTTU : false
  }
  addingForm: FormGroup;
  formSubmit$ = new Subject<any>();

  ngOnInit(): void {

    /*
    validate
      name :
        bao gồm a-zA-Z có thể có dấu và số, không được bắt đầu bằng số !
        xử lí trường hợp rỗng chỉ toàn khoảng trắng
        kiểm tra xem đã tồn tại tên này chưa !
        ? thường thì ng ta sẽ check cái này ở api hay server ?

    */

    this.addingForm = this.fb.group({
      name: [
        "",
        Validators.compose([
          Validators.pattern(/^[a-zA-Za-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+[a-zA-Za-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ 0-9]*$/i),
       ]),
        TinhNameExistValidator.createValidator(this.tinhService)
      ],
      tttu: false,
    });


    this.formSubmit$
      .pipe(
        tap(() => this.addingForm.markAsDirty()),
        switchMap(() =>
          this.addingForm.statusChanges.pipe(
            startWith(this.addingForm.status),
            filter(status => status !== "PENDING"),
            take(1)
          )
        ),
        filter(status => status === "VALID")
      )
      .subscribe(validationSuccessful => this.submitForm());
  }

  submitForm(): void {

    const input = new TinhDTO();
    input.name = this.addingForm.value.name
    input.tttu =this.addingForm.value.tttu
    this.tinhService.postTodoItem(input).subscribe(
      () => this.goBack()
    )

  }
  goBack(): void {
    this.location.back();
  }

}
