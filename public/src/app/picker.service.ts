import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class PickerService {

  constructor(private _http: HttpClient) { }

  test(){
    console.log('hit service');
    return this._http.get('/test');
  }

  areaSearch(area){
     return this._http.get('/searchArea/'+area);
  }

  randomSelect(term, city, radius, price, mood){
    return this._http.get('/randomPick/'+term+'/'+city+'/'+radius+'/'+price+'/'+mood);
  }

}
