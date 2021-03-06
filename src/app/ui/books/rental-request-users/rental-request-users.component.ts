import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {BooksService} from "../../../services/books.service";
import {User} from "../../../models/User";
import {RentService} from "../../../services/rent.service";
import {RentBook} from "../../../models/RentBook";
import {TokenStorageService} from "../../../services/token-storage.service";
import {BasketService} from "../../../services/basket.service";
import {DatePipe} from '@angular/common'

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
              private datePipe: DatePipe
  ) {
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.getAllBasket();
  }


  users: User[] = [{
    id: 0,
    bookRental: [{}]
  }]

  usersFilter:User[]=[{
    bookRental:[{}]
  }]

  getAllBasket(){
    this.baskedService.getAllBasket()
  }
  getAllBasketToUser(userId?: any) {
    this.baskedService.getAllBasketByUserId(userId).subscribe({
      next: (value) => {
        this.users.map(o => {
          if (o.id === userId) {
            // o.bookRental = value;
            // console.log(o.bookRental);
          }
        });

        // this.users.map(o=>o.id == value.userId)


        // console.log(this.users)
        // console.log(userId)
        // this.users.
        // console.log(zz.length>0)
        // if(value.length>0){
        // let zz =  this.users.map(o => {
        //     if (o.id === userId) {
        //       o.bookRental = value;
        //       // console.log(o.bookRental);
        //     }
        //   });
        //   console.log(zz)
        // }


      },
      complete: () => {

      }
    })

  }

  getAllUsers() {
    this.userService.getAllUsersRequestCreated().subscribe({
        next: (value) => {
          this.users = value;
        },
        error: (err) => {

        },
        complete: () => {
          console.log(this.users)
        }
      }
    )
  }




  viewButton(number?: number): boolean {
    if (number != undefined) {
      return number > 0;
    } else return false;
  }

  test(item: User) {
    let now = new Date();
    let dateToday = this.datePipe.transform(now, 'yyyy-MM-dd');

    // for (let i =0; i<item.length;i++){
    //   // ???????????? ?????????????? ?????????????? ?????? ????????????
    //   // console.log(item[i].checked = !item[i].checked)
    //   // console.log(item[i].checked)
    //   // console.log(item[i])
    // }
    // console.log(item);
    // console.log(this.users)

    if (item.basketUser != undefined) {
      for (let i = 0; i < item.basketUser?.length; i++) {
        console.log(item.basketUser[i].giveOut);
        if (item.basketUser[i].giveOut) {
          // console.log(item.bookRental[i].basketId);
          // console.log(item.bookRental[i]);
          // console.log(item.id + 'Id ??????????')
          console.log(item);
          // console.log( item.bookRental[i].bookId)
          let obj: RentBook = {
            bookId: item.basketUser[i].bookId,
            priceId: item.basketUser[i].priceId,
            userId: item.id,
            employeeId: this.tokenService.getUser().id,
            dateIssue: dateToday,
            // dateIssue: dateToday,
            // dateReturn: this.selectedDateReturn,
          }
          console.log(item.basketUser[i]);
          this.rentService.addRent(obj, item.basketUser[i].basketId+'').subscribe({
            next: (value) => {
              console.log(value);
            },
            complete: () => {
              this.getAllUsers();
            }
          })


        }
      }
    }

    console.log(item.bookRental?.length)


  }


}
