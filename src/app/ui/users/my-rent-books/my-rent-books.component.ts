import {Component, OnInit} from '@angular/core';
import {RentService} from "../../../services/rent.service";
import {RentBook} from "../../../models/RentBook";
import {BasketService} from "../../../services/basket.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {Basket} from "../../../models/Basket";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-my-rent-books',
  templateUrl: './my-rent-books.component.html',
  styleUrls: ['./my-rent-books.component.css']
})
export class MyRentBooksComponent implements OnInit {

  constructor(private rentService: RentService,
              private baskedService: BasketService,
              private tokenService: TokenStorageService,
              private datePipe: DatePipe) {
  }

  myBooksRent?: RentBook[];
  myRequestRent?: Basket[];

  ngOnInit(): void {
    this.getAllRentUser();
  }

  getAllRentUser() {
    this.rentService.getAllRentByUser().subscribe({
      next: (value) => {
        this.myBooksRent = value;
      },
      complete:()=>{
        this.getAllRentRequestUser();
      }
    })
  }

  getAllRentRequestUser() {
    this.baskedService.getAllBasketByUserId(this.tokenService.getUser().id).subscribe({
      next: (value) => {
        this.myRequestRent = value.filter(x => !x.isIssued && !x.isTheBasket);
      }
    })
  }

  cancelRentRequestUser(idRequest) {
    this.baskedService.cancelRentRequestByUser(idRequest).subscribe({
      next:(value)=>{
        console.log(value);
      },
      complete:()=>{
        this.getAllRentUser();
        this.getAllRentRequestUser();
      }
    })
  }


  summaPriceToday(item,price):number{

    let dateToday = this.datePipe.transform(Date.now(), 'YYYY-MM-dd');
    let dateIssue = this.datePipe.transform(item,'MM-dd-YYYY')?.toString();

    var date1 = new Date();
    var date2
    if(dateIssue!=undefined){
      date2 = new Date(dateIssue);
    }
    var daysLag = Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24)-1);
    let  zzz = Math.round(price/30 *daysLag) ;
    return zzz;
  }

}
