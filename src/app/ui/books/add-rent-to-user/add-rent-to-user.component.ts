import {Component, OnInit, ViewChild} from '@angular/core';
import {BooksService} from "../../../services/books.service";
import {UserService} from "../../../services/user.service";
import {Book} from "../../../models/Book";
import {TokenStorageService} from "../../../services/token-storage.service";
import {User} from "../../../models/User";
import {RentService} from "../../../services/rent.service";
import {RentBook} from "../../../models/RentBook";
import {PriceRentService} from "../../../services/price-rent.service";
import {Price} from "../../../models/Price";
import {NgForm} from "@angular/forms";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-add-rent-to-user',
  templateUrl: './add-rent-to-user.component.html',
  styleUrls: ['./add-rent-to-user.component.css']
})
export class AddRentToUserComponent implements OnInit {

  get selectedDateIssue(): string {
    return this._selectedDateIssue+'';
  }

  set selectedDateIssue(value: string) {
    this._selectedDateIssue = value;
  }
  get inputTextUsers(): string {
    return this._inputTextUsers +'';
  }

  set inputTextUsers(value: string) {
    this._inputTextUsers = value;
  }

  get selectedUser(): User {
    return this._selectedUser;
  }

  set selectedUser(value: User) {
    this._selectedUser = value;
  }
  get clickSelectUser(): boolean {
    return this._clickSelectUser;
  }

  setClickSelectUser(value: boolean) {
    this._clickSelectUser = !value;
  }
  get inputTextBookTitle(): string {
    return this._inputTextBookTitle+'';
  }

  set inputTextBookTitle(value: string) {
    this._inputTextBookTitle = value;
  }

  @ViewChild('formElement', {static: false}) public form!: NgForm;

  get selectedBook(): Book {
    return this._selectedBook;
  }

  set selectedBook(value: Book) {
    this._selectedBook = value;
  }

  get clickBook(): boolean {
    return this._clickBook;
  }

  setClickBook(value: boolean) {

    this._clickBook = !value;
  }

  constructor(private bookService:BooksService,
              private userService:UserService,
              private tokenService: TokenStorageService,
              private datePipe:DatePipe,
              private rentService:RentService) {
  }

  private _clickBook = false;
  private _clickSelectUser = false;
  private _inputTextBookTitle?: string = '';
  private _inputTextUsers?: string = '';
  private _selectedDateIssue?: string = '';
  private _selectedBook: Book = {bookId: 0};
  private _selectedUser: User = {bookRental: [], id: 0};
  public employee?:User;
  now = new Date();
  maxDate?: string;

  filterBooks: any[] = [{
    filterString: '',
  }];
  filterUsers: any[] = [{
    filterString: '',
  }];
  books: Book[] = [{}];
  users: User[] = [];
  response:string=' ';

  submitForm(form: NgForm) {
    console.log(form)
    let obj: RentBook = {
      bookId: this.selectedBook?.bookId,
      priceId: this.selectedBook?.priceId,
      userId: this.selectedUser.id,
      employeeId: this.employee?.id,
      dateIssue: this.selectedDateIssue
    }

    this.rentService.addRent(obj,'').subscribe({
      next:(value:RentBook)=>{
        console.log(value);
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
      }
    })
  }

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe(value => {
      this.filterBooks =value;
      this.books =value;
      for (let i = 0; i < value.length; i++) {
        this.filterBooks[i].filterString = value[i].bookTitle;
      }
    })
    this.userService.getAllUsers().subscribe(value => {
      this.users= value;
      this.filterUsers = value;
      for (let i = 0; i < value.length; i++) {
        this.filterUsers[i].filterString = value[i].firstname +' '+ value[i].lastname+ ' '+ value[i].username;
      }
    })
    this.employee = this.tokenService.getUser();
    this.maxDate = this.datePipe.transform(this.now,'yyyy-MM-dd')+'';
  }

  valueBooksOptionOrInputFilter(objNgModel, inputOrOption, objFilter, item?) {
    this.inputTextBookTitle = inputOrOption;
    if (item != null) {
      this.selectedBook.bookId = item.bookId;
      this.selectedBook.bookTitle = item.bookTitle;
      this.selectedBook.priceId = item.priceId;
      this.filterBooks = this.filterInputByObject(inputOrOption, objFilter, objNgModel.name, true);
    } else {
      this.filterBooks = this.filterInputByObject(inputOrOption, objFilter, objNgModel.name, false);
    }
  }
  valueUsersOptionOrInputFilter(objNgModel, inputOrOption, objFilter, item?) {
    this.inputTextUsers = inputOrOption;
    if (item != null) {
      this.selectedUser.id = item.id;
      this.selectedUser.username = item.username;
      this.selectedUser.email = item.email;
      this.filterUsers = this.filterInputByObject(inputOrOption, objFilter, objNgModel.name, true);
    } else {
      this.filterUsers = this.filterInputByObject(inputOrOption, objFilter, objNgModel.name, false);
    }
  }

  filterInputByObject(filterInput: string, objFilter: any, controls: string, click: boolean): any {
    let errorArray: Array<string> = [];
    filterInput = filterInput.toLowerCase();
    let filterOption = objFilter.filter(x => filterInput === "" || x.filterString?.toLowerCase().includes(filterInput));
    if (filterOption.length == 0) {
      errorArray.push('not found length == 0');
    }
    if (!click) {
      errorArray.push('no click Value Option');
    }
    if (click) {
      errorArray.length = 0;
      this.form.controls[controls].setErrors(null);
      console.log('error clear')
    }
    if (errorArray.length > 0) {
      this.form.controls[controls].setErrors({warn: errorArray});
    }

    return filterOption;
  }

  event(event) {
    if (!event.target.form) {
      this._clickBook = false;
      this._clickSelectUser = false;
    }
  }

}
