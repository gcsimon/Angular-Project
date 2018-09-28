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
  array2 = [];
  numResults;
  searchStatus: boolean = false;
  moreInfo = [];

  searchCar(v) {
    this.searchOnGoing = true;
    this.searchDone = false;
    this.search = v;

    this.service.getCars(this.search).subscribe(
      res => {
        this.moreInfo.length = 0;
        if (res.Response == "True") {
          console.warn(res);
          let results;

          this.array2 = res.Search;
          this.numResults = Math.ceil((res.totalResults) / 10);
          this.searchStatus = res.Response;
          
          for (let i = 0; i < this.array2.length; i++) 
               this.searchMoreInfo(this.array2[i].imdbID);


          this.searchOnGoing = false;
          this.searchDone = true;
        }
        else
          this.searchStatus = false;
      },
      err => console.log(`Something went wrong: ${err}`)
    )
  }

  searchMoreInfo(v) {
    this.service.getMoreInfo(v).subscribe(
      res => {
        console.warn(res);
        this.moreInfo.push(res);
        this.orderByYear();
      }
    )
  }

  showNextButton(): boolean {
    return ((this.service.pageIndex + 1) <= this.numResults);
  }
  showPrevButton(): boolean {
    return ((this.service.pageIndex) > 1);
  }
  showPageNav(): boolean {
    return (this.searchOnGoing || this.searchDone) && (this.searchStatus);
  }

  nextPage() {
    if ((this.service.pageIndex + 1) <= this.numResults) {
      this.service.incrementIndex(this.numResults);
      this.searchCar(this.search);
    }
  }

  prevPage() {
    this.service.decrementIndex();
    this.searchCar(this.search);
  }

  inputIndex(v){
    if(+v>=1 && +v<=this.numResults){
      this.service.pageIndex=+v;
    }
    else if(+v<1){
      this.service.pageIndex=1;
    }
    else{
      this.service.pageIndex=this.numResults;
    }
    this.searchCar(this.search);
  }

  orderByYear() {
    this.moreInfo.sort((left, right): number => {
      if (left.Year < right.Year) {
        return -1;
      } if (left.Year > right.Year) {
        return 1;
      }
      return 0;
    })
  }
}
