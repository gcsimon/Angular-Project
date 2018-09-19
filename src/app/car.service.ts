import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from '../../node_modules/rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  url = 'http://www.omdbapi.com/?apikey=b2380994&s='; 

  constructor(private http: Http) { }

  getCars(serString :string): Observable<any>{

    console.log(this.url + serString);
    return this.http.get(this.url + serString).pipe(map((res:Response) => res.json()));
  }

}
