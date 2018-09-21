import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from '../../node_modules/rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  url = 'http://www.omdbapi.com/?apikey=b2380994&s=';
  pageIndex=1;

  constructor(private http: Http) { }

  getCars(serString :string): Observable<any>{

    console.log(this.url + serString);
    return this.http.get(this.url + serString + '&page=' + this.pageIndex).pipe(map((res:Response) => res.json()));
  }

  incrementIndex(numresults){
    if (this.pageIndex<numresults)
      this.pageIndex = this.pageIndex + 1;
  }
  decrementIndex(){    
    if (this.pageIndex>1)
      this.pageIndex = this.pageIndex - 1;
  }
  resetIndex(){
    this.pageIndex=1;
  }
}
