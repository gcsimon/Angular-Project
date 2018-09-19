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
  inputIsValid: boolean = false;
  searchOnGoing: boolean = false;
  searchDone: boolean = false;
  resultsArray = [];
  array2 = [];

  searchCar(v) {
    this.searchOnGoing = true;
    this.searchDone = false;
    this.search = v;
    
    //Call Service here
    this.service.getCars(this.search).subscribe( 
      res => { console.warn(res);
        let results;
        this.array2 = res.Search;          
        //this.resultsArray.push({'Title' : results.Title, 'Year' : results.Year});
        //When search is done
        this.searchOnGoing = false;
        this.searchDone = true;
      },
      err => console.log(`Something went wrong: ${err}`)
    )
  }

}
