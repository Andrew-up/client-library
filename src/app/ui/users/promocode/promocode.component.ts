import { Component, OnInit } from '@angular/core';
import {BooksService} from "../../../services/books.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {animate} from "@angular/animations";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/User";
import {PromoCode} from "../../../models/promoCode";
import {Router} from "@angular/router";

@Component({
  selector: 'app-promocode',
  templateUrl: './promocode.component.html',
  styleUrls: ['./promocode.component.css']
})
export class PromocodeComponent implements OnInit {

  constructor(private bookService:BooksService,
              private token: TokenStorageService,
              private userService:UserService) { }

textInput?:string='';
response:any='';
  sendPromoCode(){
    let obj={
      promoCode:this.textInput
    }

    this.bookService.sendPromoCode(obj).subscribe({
      next:(v:PromoCode) =>{
        this.response = JSON.stringify(v);
        this.response = v.promoCode;
        this.getUser();
      }
    });
  }
  getUser(){
    this.userService.getCurrentUser().subscribe({
      next: (v: User) => {
        this.token.saveUser(v);
        this.token.saveRole(v.role+'');
        window.location.reload();
        console.log("test");
      }
  });
  }
  ngOnInit(): void {
  }

}
