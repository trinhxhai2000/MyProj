import { AbstractControl, ValidatorFn, ValidationErrors, AsyncValidatorFn } from "@angular/forms";
import { BehaviorSubject, Observable, of, } from "rxjs";
import { debounceTime, distinctUntilChanged, map, switchMap, take } from "rxjs/operators";


import { TinhServiceProxy, HuyenServiceProxy } from '@shared/service-proxies/service-proxies';


export function NoWhitespaceValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    let controlVal = control.value;
    if (typeof controlVal === "number") {
      controlVal = `${controlVal}`;
    }
    let isWhitespace = (controlVal || "").trim().length === 0;
    let isValid = !isWhitespace;
    return isValid ? null : { whitespace: "value is only whitespace" };
  };
}


export class TinhNameExistValidator {

  static createValidator(_tinhService: TinhServiceProxy): AsyncValidatorFn {
    const subject = new BehaviorSubject<string>('');
    const debouncedInput$ = subject.asObservable().pipe(
        distinctUntilChanged(),
        debounceTime(1000),
        take(1),
        switchMap(
          name => {
            return _tinhService.tinhNameExist(name).pipe(
              map<boolean, ValidationErrors>(
                (res) => {
                  if (res){
                    return {tinhNameExist : true};
                  }else{
                    return null;
                  }
                }
              )
            );
          }
        ),
      )

    return (control: AbstractControl):  Observable<ValidationErrors | null> => {
      subject.next(control.value);
      return debouncedInput$;
    };

  }

}

export class TinhNameEditNameValidator {

  static createValidator(_tinhService: TinhServiceProxy, name: String): AsyncValidatorFn {
    const oriName = name;
    const subject = new BehaviorSubject<string>('');
    const debouncedInput$ = subject.asObservable().pipe(
        distinctUntilChanged(),
        debounceTime(1000),
        take(1),
        switchMap(
          name => {
            return _tinhService.tinhNameExist(name).pipe(
              map<boolean, ValidationErrors>(
                (res) => {
                  if (res){
                    return {tinhNameExist : true};
                  }else{
                    return null;
                  }
                }
              )
            );
          }
        ),
      )

    return (control: AbstractControl):  Observable<ValidationErrors | null> => {
      // console.log(control.value.trim()+ " vs " + oriName.trim());
      if (control.value.trim() == oriName.trim()) return of(null);
      // console.log("keep searching !")
      subject.next(control.value);
      return debouncedInput$;
    };

  }

}

export class HuyenNameChange_HuyenNameValidator {

  static createValidator(_huyenService: HuyenServiceProxy, Id: number): AsyncValidatorFn {
    const tinhId = Id;
    const subject = new BehaviorSubject<string>('');
    const debouncedInput$ = subject.asObservable().pipe(
      distinctUntilChanged(),
      debounceTime(300),
        take(1),
        switchMap(
          huyenName => {
            return _huyenService.huyenNameExistInTinh(tinhId,huyenName).pipe(
              map<boolean, ValidationErrors>(
                (res) => {
                  if (res){
                    return {HuyenNameExistInTinh : true};
                  }else{
                    return null;
                  }
                }
              )
            );
          }
        ),
      )

    return (control: AbstractControl):  Observable<ValidationErrors | null> => {
      // console.log(control.value.trim()+ " vs " + oriName.trim());
      // if (control.value.trim() == oriName.trim()) return of(null);
      // console.log("keep searching !")
      if (control.value == null || control.value == undefined || tinhId == null || tinhId == undefined) return of (null);
      console.log("Validating by HuyenName change !")
      subject.next(control.value);
      return debouncedInput$;
    };

  }

}


export class EditHuyen_HuyenNameValidator {

  static createValidator(_huyenService: HuyenServiceProxy, Id: number, oriId: number): AsyncValidatorFn {
    const subject = new BehaviorSubject<string>('');
    const debouncedInput$ = subject.asObservable().pipe(
      distinctUntilChanged(),
      debounceTime(300),
        take(1),
        switchMap(
          huyenName => {
            return _huyenService.huyenNameExistInTinh(Id,huyenName).pipe(
              map<boolean, ValidationErrors>(
                (res) => {
                  if (res){

                    if (oriId == Id)
                      return null;
                    else
                      return {HuyenNameExistInTinh : true};

                  }else{
                    return null;
                  }
                }
              )
            );
          }
        ),
      )

    return (control: AbstractControl):  Observable<ValidationErrors | null> => {
      // console.log(control.value.trim()+ " vs " + oriName.trim());
      // if (control.value.trim() == oriName.trim()) return of(null);
      // console.log("keep searching !")
      if (control.value == null || control.value == undefined || Id == null || Id == undefined) return of (null);
      console.log("Validating by HuyenName change !")

      subject.next(control.value);
      return debouncedInput$;
    };

  }

}
