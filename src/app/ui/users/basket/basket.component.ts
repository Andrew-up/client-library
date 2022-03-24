import {Component, OnInit} from '@angular/core';
import {BasketService} from "../../../services/basket.service";
import {Basket} from "../../../models/Basket";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css', '../../common_styles.css']
})
export class BasketComponent implements OnInit {

  basketUser: Basket[] = [{}]

  idDelete?: number;

  constructor(private basketService: BasketService) {
  }

  rememberIdDelete(number?: number) {
    this.idDelete = number;
  }

  createBookRequest(any){
    console.log(any)
    this.basketService.createBookRequest(any).subscribe({
      next:(value)=>{
        console.log(value);
      },
      complete:()=>{
        this.getMyBasket();
      }
    })
  }

  createAllBookRequest(createRequestBook:Basket[]){
  for (let i =0;i<createRequestBook.length;i++){
    this.basketService.createBookRequest(createRequestBook[i].basketId).subscribe({
      next:(value)=>{
        console.log(value);
      },
      complete:()=>{
      }
    })
  }
    this.getMyBasket();
  }

  deleteObject(idDelete?: number) {
    this.basketService.deleteBasketToUser(idDelete).subscribe({
      next: (value) => {
        console.log(value);
        this.getMyBasket();
      }
    })
  }



  getMyBasket() {
    this.basketService.getMyBasket().subscribe({
      next: (value) => {
        this.basketUser = value;
        console.log(value)
      }
    })
  }

  ngOnInit(): void {
    this.getMyBasket();
  }

}
