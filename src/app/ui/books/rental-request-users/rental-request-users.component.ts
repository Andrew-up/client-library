import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {BooksService} from "../../../services/books.service";
import {User} from "../../../models/User";
import {RentService} from "../../../services/rent.service";
import {RentBook} from "../../../models/RentBook";
import {TokenStorageService} from "../../../services/token-storage.service";
import {BasketService} from "../../../services/basket.service";
import { DatePipe } from '@angular/common'
import {PriceRentService} from "../../../services/price-rent.service";

@Component({
  selector: 'app-rental-request-users',
  templateUrl: './rental-request-users.component.html',
  styleUrls: ['./rental-request-users.component.css']
})
export class RentalRequestUsersComponent implements OnInit {

  constructor(private userService: UserService,
              private bookService: BooksService,
              private rentService: RentService,
              private tokenService: TokenStorageService,
              private baskedService: BasketService,
              private datePipe:DatePipe
             ) {
  }

  ngOnInit(): void {
    this.getAllUsers();

  }
  users: User[] = [{
    id: 0,
  }]

  getAllBasketToUser(userId?: any) {
    this.baskedService.getAllBasketByUserId(userId).subscribe({
      next: (value) => {
        this.users.map(o => {
          if (o.id === userId) {
            o.bookRental = value;
          }
        })
      }
    })

  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe({
        next: (value) => {
          this.users = value;

          for (let i = 0; i < value.length; i++) {
            this.getAllBasketToUser(value[i].id);
          }
        },
        error: (err) => {

        },
        complete: () => {
          console.log(this.users)

        }
      }
    )
  }

  pbooosdf: boolean = false;

  test(item: User) {
    let now = new Date();
    let dateToday = this.datePipe.transform(now,'yyyy-MM-dd');


    // for (let i =0; i<item.length;i++){
    //   // данная функция снимает все флажки
    //   // console.log(item[i].checked = !item[i].checked)
    //   // console.log(item[i].checked)
    //   // console.log(item[i])
    // }
    // console.log(item);
    // console.log(this.users)

    if (item.bookRental != undefined) {
      for (let i = 0; i < item.bookRental?.length; i++) {
        console.log(item.bookRental[i].giveOut);
        if (item.bookRental[i].giveOut) {
          // console.log(item.bookRental[i].basketId);
          // console.log(item.bookRental[i]);
          // console.log(item.id + 'Id юзера')
          console.log(item);
          // console.log( item.bookRental[i].bookId)
          let obj: RentBook = {
            bookId: item.bookRental[i].bookId,
            priceId: item.bookRental[i].priceId,
            userId: item.id,
            employeeId: this.tokenService.getUser().id,
            dateIssue: dateToday,
            // dateReturn: this.selectedDateReturn,
          }
          console.log(item.bookRental[i]);
          this.rentService.addRent(obj, item.bookRental[i].basketId).subscribe({
            next: (value) => {
              console.log(value);
            },
            complete:()=>{
              this.getAllUsers();
            }
          })


        }
      }
    }

    console.log(item.bookRental?.length)


  }


}
