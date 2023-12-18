import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";
@Injectable({
    providedIn: 'root'
  })
export class validateHelper{
    public numValidator(control: FormControl, num:number) {
        if (control.value && control.value <= num) {
          return { min: true };
        }
        return null;
      }
}