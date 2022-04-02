import {Component, OnInit} from '@angular/core';
import {BooksService} from "../../../services/books.service";
import {UserService} from "../../../services/user.service";
import {Book} from "../../../models/Book";
import {TokenStorageService} from "../../../services/token-storage.service";
import {User} from "../../../models/User";
import {RentService} from "../../../services/rent.service";
import {RentBook} from "../../../models/RentBook";
import {PriceRentService} from "../../../services/price-rent.service";
import {Price} from "../../../models/Price";

@Component({
  selector: 'app-add-rent-to-user',
  templateUrl: './add-rent-to-user.component.html',
  styleUrls: ['./add-rent-to-user.component.css', '../../common_styles.css']
})
export class AddRentToUserComponent implements OnInit {

  public selectedBookTitle = 0;
  public selectedDateIssue = null;
  public selectedDateReturn = null;
  public selectedEmployee: any;
  public selectedEmployeeId: any;
  public selectedPriceRent = null;
  public selectedUser = null;
  now = new Date();
  maxDate?: string;
  response = 'Ответ: ';

  responseBool= false;

  constructor(private bookService: BooksService,
              private userService: UserService,
              private tokenService: TokenStorageService,
              private priceService: PriceRentService,
              private rentService:RentService) {
  }


  users: User[] = [{
    id: 0,
    bookRental:[{}]
  }]

  rent: Price[] = [{}]

  convertDate(date: Date) {
    let yyyy = date.getFullYear().toString();
    let mm = (date.getMonth() + 1).toString();
    let dd = date.getDate().toString();
    let mmChars = mm.split('');
    let ddChars = dd.split('');
    return yyyy + '-' + (mmChars[1] ? mm : "0" + mmChars[0]) + '-' + (ddChars[1] ? dd : "0" + ddChars[0]);
  }

  book: Book[] = [{
    bookId: 0,
    bookTitle: 'test'
  }];

  getAllBook() {
    this.bookService.getAllBooks().subscribe(res => {
      this.book = res;
      this.getEmployee();
      this.getUser();
      this.getPrice();
      this.getEmployeeId();
    })
  }

  getEmployee() {
    this.selectedEmployee = this.tokenService.getUser().username;
  }
  getEmployeeId(){
    this.selectedEmployeeId = this.tokenService.getUser().id;
  }

  getUser() {
    this.userService.getAllUsers().subscribe({
      next: (value) => {
        this.users = value;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  getPrice() {
    this.priceService.getAllPriceRent().subscribe({
      next: (value) => {
        console.log(value)
        this.rent = value;
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  addRent() {
    let obj: RentBook = {
      bookId: this.selectedBookTitle,
      priceId: this.selectedPriceRent,
      userId: this.selectedUser,
      employeeId: this.selectedEmployeeId,
      dateIssue: this.selectedDateIssue,
      dateReturn: this.selectedDateReturn,
    }
    this.responseBool = true;
    this.rentService.addRent(obj).subscribe({
      next:(value:RentBook)=>{

        this.response = 'Ответ: ';
        this.response += value.dateIssue + ' ';
        if(this.selectedDateIssue == value.dateIssue){
          this.response = 'Ответ: ';
          this.response = this.response +' Аренда для '+ value.userName+ ' успешно добавлена'

        }
        console.log(value)
      },
      error:(err)=>{
        console.log(err)

      },
      complete:()=>{
        this.responseBool = false;
      }
    })
  }

  ngOnInit(): void {
    this.maxDate = this.convertDate(this.now).toString();
    this.getAllBook();
  }

}
