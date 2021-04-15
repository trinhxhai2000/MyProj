import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, AbstractControl, ValidationErrors, Validators } from '@angular/forms'
import { ModifingHuyenInput , HuyenServiceProxy , TinhServiceProxy, TinhDTO, HuyenDTO } from '@shared/service-proxies/service-proxies';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NoWhitespaceValidator } from '../validators/no-whitespaces.validator';

import { Observable, of, Subject, timer } from "rxjs";
import { debounceTime, delay, distinctUntilChanged, filter, map, startWith, switchMap, take, tap } from "rxjs/operators";

@Component({
  selector: 'app-add-huyen',
  templateUrl: './add-huyen.component.html',
  styleUrls: ['./add-huyen.component.css']
})
export class AddHuyenComponent implements OnInit {

  constructor(
    private huyenService: HuyenServiceProxy,
    private tinhService: TinhServiceProxy,
    private location : Location,
    private fb: FormBuilder
  ) { }


  addingForm: FormGroup;
  formSubmit$ = new Subject<any>();
  curTinhId:number = null;


  tinhs: TinhDTO[]
  ngOnInit(): void {
    this.loadData()
     /*
    validate
      name :
        bao gồm a-zA-Z có thể có dấu và số, không được bắt đầu bằng số !
        xử lí trường hợp rỗng chỉ toàn khoảng trắng
        kiểm tra xem đã tồn tại tên này chưa !
    */
    this.addingForm = this.fb.group(
      {
        name: [
          "",
          Validators.compose([
            Validators.pattern(/^[a-zA-Za-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+[a-zA-Za-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ 0-9]*$/i),
          ]),
          // validate xem huyện này đã tồn tại trong tỉnh hay chưa
          this.validateHyyenNameFromAPI1.bind(this)
        ],
        tinhId: [
          null,
          Validators.compose([
            Validators.required,
          ]),
        // validate xem huyện này đã tồn tại trong tỉnh hay chưa
          this.validateHyyenNameFromAPI2.bind(this)

        ]
      }
    );


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

  loadData(){
    this.tinhService.getAllTinh().subscribe(
      res=>{
        this.tinhs = res
      }
    )
  }

  onChanges(){
    console.log("on change called");
  }

  submitForm(){
    const input = new ModifingHuyenInput();
    input.name = this.addingForm.value.name
    input.tinhId =this.addingForm.value.tinhId
    this.huyenService.addHuyen(input).subscribe(
      () => this.goBack()
    )

  }
  goBack(): void {
    this.location.back();
  }

  validateHyyenNameFromAPI1(control: AbstractControl): Observable<ValidationErrors | null> {

    if (this.addingForm==undefined) return of(null);
    const tinhId = this.addingForm.value.tinhId;
    const huyenName = control.value;
    if(tinhId == null || huyenName == null) return of(null);
    return this.huyenService.huyenNameExistInTinh(tinhId,huyenName).pipe(
      debounceTime(800),
      distinctUntilChanged(),
      map(result => {
        if (!result) {
          if (this.addingForm.controls["tinhId"].hasError('huyenNameExistInTinh')){
            this.addingForm.controls["tinhId"].updateValueAndValidity();
          }
          return null;
        }else
        return {
          huyenNameExistInTinh: true
        };
      })
    )
  }

  validateHyyenNameFromAPI2(control: AbstractControl): Observable<ValidationErrors | null> {
    if (this.addingForm==undefined) return of(null);

    const tinhId = control.value;
    const huyenName = this.addingForm.value.name;
    if(tinhId == null || huyenName == null ) return of(null);
    return this.huyenService.huyenNameExistInTinh(tinhId,huyenName).pipe(
      map(
        result => {
        if (!result) {
          if (this.addingForm.controls["name"].hasError('huyenNameExistInTinh')){
               this.addingForm.controls["name"].updateValueAndValidity();
          }
          return null;
        }else
          return {
            huyenNameExistInTinh: true
          };
      }
      )
    )

  }

}
