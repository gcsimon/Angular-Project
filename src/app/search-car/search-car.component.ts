import { CarService } from './../car.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-search-car',
  templateUrl: './search-car.component.html',
  styleUrls: ['./search-car.component.css']

})
export class SearchCarComponent implements OnInit {

  constructor(private service: CarService) { }

  ngOnInit() {
    this.search = "";
  }

  search: string;
  searchOnGoing: boolean = false;
  searchDone: boolean = false;
  resultsArray = [];
  array2 = [];
  numResults;

  searchCar(v) {
    this.searchOnGoing = true;
    this.searchDone = false;
    this.search = v;
    
    this.service.getCars(this.search).subscribe( 
      res => { console.warn(res);
        let results;
        this.array2 = res.Search;
        this.numResults=Math.ceil((res.totalResults)/10);       
        this.searchOnGoing = false;
        this.searchDone = true;
        this.orderByYear();
      },
      err => console.log(`Something went wrong: ${err}`)
      
    )
  }

  showNextButton():boolean{
    return ((this.service.pageIndex + 1) <= this.numResults);
  }
  showPrevButton():boolean{
    return ((this.service.pageIndex) > 1);
  }
  showPageNav():boolean{
    return this.searchOnGoing || this.searchDone;
  }
  
  nextPage(){
    if((this.service.pageIndex + 1) <= this.numResults){
      this.service.incrementIndex();
      this.searchCar(this.search);
    }
  }

  prevPage(){
      this.service.decrementIndex();
      this.searchCar(this.search);
  }

  orderByYear(){
    this.array2.sort((left,right): number =>{
      if(left.Year < right.Year){
        return -1;
      }if(left.Year > right.Year){
        return 1;
      }
      return 0;
    })
  }
}
