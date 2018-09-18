import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  cars= [
    {id: 1, name: 'Celta'},
    {id: 2, name: 'Corsa'},
    {id: 3, name: 'Uno'},
    {id: 4, name: 'Fusca'},
    {id: 5, name: 'Kombi'},
    {id: 6, name: 'Corolla'},
    {id: 7, name: 'Honda Civic'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
