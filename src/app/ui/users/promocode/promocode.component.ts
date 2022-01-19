import { Component, OnInit } from '@angular/core';
import {BooksService} from "../../../services/books.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {animate} from "@angular/animations";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/User";
import {PromoCode} from "../../../models/promoCode";

@Component({
  selector: 'app-promocode',
  templateUrl: './promocode.component.html',
  styleUrls: ['./promocode.component.css']
})
export class PromocodeComponent implements OnInit {

  constructor(public bookService:BooksService,public  token:TokenStorageService,public userService:UserService) { }

textInput?:string='';
otvet:any='123';
stringtest:any;
  sendPromoCode(){
    let obj={
      promoCode:this.textInput
    }
    this.bookService.sendPromoCode(obj).subscribe({
      next:(v:PromoCode) =>{
        this.otvet = JSON.stringify(v);
        this.otvet = v.promoCode;
        this.getUser();
      }
    });
  }
//value => this.otvet = value.promoCode
  getUser(){
    this.userService.getCurrentUser().subscribe({
      next: (v: User) => {
        this.token.saveUser(v);
        this.token.saveRole(v.role+'');
        console.log("test");
      }
  });
  }
  ngOnInit(): void {
  }

}
