import {Component, OnInit} from '@angular/core';
import {PriceRentService} from "../../../services/price-rent.service";
import {Price} from "../../../models/Price";

@Component({
  selector: 'app-create-price',
  templateUrl: './create-price.component.html',
  styleUrls: ['./create-price.component.css', '../../common_styles.css']
})
export class CreatePriceComponent implements OnInit {

  constructor(private priceService: PriceRentService) {
  }

  ngOnInit(): void {
  }

  priceName = '';
  response = '';

  createPrice() {
    let obj:Price={
      priceName:this.priceName,
    }
    this.priceService.createPrice(obj).subscribe({
      next:(value:Price)=>{
        console.log(value);
        this.response ='Ответ:  ';
        if(this.priceName==value.priceName){
          this.response = this.response+ value.priceName+'  Успешно добавлен!';
        }
      },
      error:(err)=>{
        console.log('Ошибка'+err);
      },
      complete:()=>{

      }
    })
  }

}
