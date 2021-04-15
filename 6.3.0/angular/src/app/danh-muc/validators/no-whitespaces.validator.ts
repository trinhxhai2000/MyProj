import { AbstractControl, ValidatorFn, FormGroup, ValidationErrors, AsyncValidatorFn } from "@angular/forms";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, map, mergeMap, switchMap } from "rxjs/operators";

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

import { TinhDTO , TinhServiceProxy } from '@shared/service-proxies/service-proxies';

export class IsUserIdFreeValidator {

  static createValidator(_tinhService: TinhServiceProxy): AsyncValidatorFn {
    let curCtrl : AbstractControl
    console.log("Static factory call");
    const subject = new BehaviorSubject<string>('');
    const debouncedInput$ = subject.asObservable().pipe(
        distinctUntilChanged(),
        debounceTime(1000),
        switchMap(
          name => {
            console.log("Switch map : ", name)
            return _tinhService.tinhNameExist(name)
          }
        ),
        map(
          res => {
            if (res) {
              console.log("Invalid");
              curCtrl.setErrors({ tinhNameExist: true})
              return { tinhNameExist: true}
            }else{
              console.log("Valid");
              return null;
            }
          }
        )
      )


    return (control: AbstractControl):  Observable<ValidationErrors | null> => {
      curCtrl = control
      console.log("Inner AsyncValidator call");
      subject.next(control.value);
      console.log("ctrl val:", control.value)
      console.log(debouncedInput$)
      return debouncedInput$;
    };

  }

}


