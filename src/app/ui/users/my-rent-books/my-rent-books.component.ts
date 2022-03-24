import {Component, OnInit} from '@angular/core';
import {RentService} from "../../../services/rent.service";
import {RentBook} from "../../../models/RentBook";
import {BasketService} from "../../../services/basket.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {Basket} from "../../../models/Basket";

@Component({
  selector: 'app-my-rent-books',
  templateUrl: './my-rent-books.component.html',
  styleUrls: ['./my-rent-books.component.css']
})
export class MyRentBooksComponent implements OnInit {

  constructor(private rentService: RentService,
              private baskedService: BasketService,
              private tokenService: TokenStorageService) {
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
        this.myRequestRent = value;
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

}
