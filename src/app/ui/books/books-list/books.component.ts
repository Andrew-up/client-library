import {Component, OnInit} from '@angular/core';
import {BooksService} from "../../../services/books.service";
import {Book} from "../../../models/Book";
import {ImageService} from "../../../services/image.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {BasketService} from "../../../services/basket.service";
import {UserService} from "../../../services/user.service";
import {RentService} from "../../../services/rent.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {


  name:any='123123123';
  age:any;
  constructor(private booksService: BooksService,
              private imageService: ImageService,
              private tokenService: TokenStorageService,
              private basketService: BasketService,
              private userService: UserService,
              private rentService: RentService) {
  }

  isBooksNull: boolean = false;
  isDataLoaded = false;
  inputSearch?: string='';
  defaultSearch ='bookTitle';
  isSearchData = false;

  isWorkSearch():boolean{
    if(this.inputSearch!=''){
      return true;
    }
    else return false;
  }

  submitFormSearch(form: NgForm) {
    console.log(form);
    this.booksService.searchBook(form.value.inputSearch,form.value.typeSearch).subscribe({
      next: (value) => {
        this.book = value;
        if (value.length==0){
          this.isSearchData =  true
        }
        else {
          this.isSearchData = false;
        }
        console.log(value);
      },
      complete: () => {
        this.viewButtons();
        this.getImageByBookId();
      }
    })


  }

  addBasketToUser(any) {
    // console.log(any)
    this.basketService.addBasketToUser(any).subscribe({
      next: (value) => {

      },
      complete: () => {
        this.viewButtons();
      }
    })
  }


  deleteBasketToUser(idDelete, bookId) {
    console.log(idDelete);
    this.basketService.deleteBasketToUser(idDelete).subscribe({
      next: (value) => {
        console.log(value);
        let index = this.book.findIndex(x => x.bookId === bookId);
        this.book[index].myBooksRequest = false;
        this.book[index].myBooksBasket = false;
      },
      complete: () => {
      }
    })
  }




  zzzzzzzzzz(id) {

    this.basketService.getAllBasketByUserId(id).subscribe({
      next: (value) => {
        for (let i = 0; i < value.length; i++) {
          let index = this.book.findIndex(x => x.bookId === value[i].bookId);
          // console.log(index);
          // console.log(this.book);
            if (this.book[index] != undefined) {
              this.book[index].myBooksRequest = value[i].isRequestCreated;
              this.book[index].myBooksRequest = value[i].isRequestCreated;
              this.book[index].myBooksRent = value[i].isIssued;
              this.book[index].myBooksBasket = value[i].isTheBasket;
              this.book[index].basketId = value[i].basketId+'';
              this.book[index].dateIssue = value[i].dateIssue;
            }

        }
      },
      complete:()=>{
        this.isDataLoaded = true;
        console.log(this.book);
      }
    })
  }


  viewButtons() {

    if (this.tokenService.getToken() != null) {
      this.userService.getCurrentUser().subscribe({
        next: (value) => {
          this.zzzzzzzzzz(value.id);
        }

      })
    }
  }




  indexPage: number = 0;
  sizeElement: number = 5;
  maxIndex: number = 5;

  editSizeElement(size: number) {
    this.sizeElement = size;
    this.getAllBook();
  }

  indexPlus() {
    this.indexPage = this.indexPage + 1;
    this.getAllBook();
  }

  indexMinus() {
    this.indexPage = this.indexPage - 1;
    this.getAllBook();
  }


  book: Book[] =
    [

    ];

  bookSearch: Book[] = [];

  getAllBook() {
    this.isDataLoaded = false;
    this.booksService.getAllBooksByNumberPage(this.indexPage, this.sizeElement).subscribe({
      next: (value) => {
        if (value.length.valueOf() == 0) {
          this.isBooksNull = true;
        } else {
          this.isBooksNull = false;
        }
        this.book = value;
      },
      error: (err) => {
      },
      complete: () => {
        this.viewButtons();
        this.getImageByBookId();
      }
    })
  }

  getImageByBookId() {

      for (let i = 0; i < this.book.length; i++) {
        this.imageService.getBookImg(this.book[i].bookId).subscribe({
          next: (value) => {
            const reader = new FileReader();
            reader.readAsDataURL(value);
            if (this.book.length > 0) {
              this.book[i].imageBlob = value;
              reader.addEventListener("load", () => {
                this.book[i].imageSrcTemp = reader.result;
              })
            }
          },
          error: (err) => {
            // console.log(err)
          },
          complete: () => {

          }
        })
      }


  }

  ngOnInit(): void {
    this.getAllBook();
  }

  console(item: Book) {
    console.log(item)
  }
}
