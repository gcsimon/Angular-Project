import { Component, OnInit } from '@angular/core';
import { CarService } from '../car.service';

@Component({
  selector: 'car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:any = [];

  constructor(private api: CarService) { }
  

  ngOnInit() {
    this.api.getCars().subscribe(res => {
      this.cars = res.result;
      console.log(JSON.stringify(this.cars));
    });
  }
}
