import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })
export class sortingService{
    public changeSortOrder(currentOrder:string){
        if(currentOrder == 'ASC'){
            return 'DESC';
        }
        if(currentOrder == 'DESC'){
            return '';
        }
        return 'ASC';
    }
}