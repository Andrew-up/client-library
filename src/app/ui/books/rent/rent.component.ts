import { Component, OnInit } from '@angular/core';
import {RentBook} from "../../../models/RentBook";
import {RentService} from "../../../services/rent.service";

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {

  constructor(private rentService:RentService) { }

  rent:RentBook[] =[{
  }]

  getAllRent(){
    this.rentService.getAllRent().subscribe( res=>{
      this.rent = res;
      console.log(res);
    })
  }

  ngOnInit(): void {
    this.getAllRent();

  }

}
