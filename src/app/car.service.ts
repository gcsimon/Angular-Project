import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from '../../node_modules/rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  url = 'https://databases.one/api/?format=json&select=make&api_key=Your_Database_Api_Key'; 

  constructor(private http: Http) { }

  getCars(): Observable<any>{

    return this.http.get(this.url).pipe(map((res:Response) => res.json()));
  }

}
