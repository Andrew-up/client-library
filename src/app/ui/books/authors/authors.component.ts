import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthorsService} from "../../../services/authors.service";
import {Author} from "../../../models/Author";
import {Series} from "../../../models/Series";
import {Book} from "../../../models/Book";
import {BooksService} from "../../../services/books.service";
import {User} from "../../../models/User";
import {UserService} from "../../../services/user.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {DatePipe} from "@angular/common";
import {RentBook} from "../../../models/RentBook";
import {RentService} from "../../../services/rent.service";
import {ImageService} from "../../../services/image.service";
import {BasketService} from "../../../services/basket.service";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  authors: Author[] = []

  booksAuthors:Book[]=[];
  isDataLoaded:boolean=false;
  selectedBook: Book = {};
  selectedAuthor: Author = {};

  ngOnInit(): void {
    this.getAllAuthors();
  }

  constructor(private authorsService: AuthorsService,
              private bookService: BooksService,
              private imageService:ImageService,
              private basketService:BasketService,
              private tokenService:TokenStorageService) {
  }


  submitFormSearch(form: NgForm) {
    console.log(form);
    this.authorsService.searchAuthors(this.inputSearch).subscribe({
      next:(value)=>{
   this.authors = value;
      }
    })
  }

  defaultSearch:string='';
  inputSearch:string='';
  getAllAuthors() {
    this.authorsService.getAllAuthor().subscribe({
      next: (value) => {
        this.authors = value;
      }
    })
  }


  addBasketToUser(any) {
    this.isDataLoaded = false;
    // console.log(any)
    this.basketService.addBasketToUser(any).subscribe({
      next: (value) => {
        this.getBasketByBookId(this.selectedBook.bookId);
      },
      complete: () => {
        // this.viewButtons();
      }
    })
  }

  getBasketByBookId(id) {
    this.basketService.getBasketByBookId(id).subscribe({
      next: (value) => {
        for (let i = 0; i < value.length; i++) {
          this.selectedBook.myBooksBasket = value[i].isTheBasket;
          this.selectedBook.myBooksRequest = value[i].isRequestCreated;
          this.selectedBook.myBooksRent = value[i].isIssued;
          this.selectedBook.basketId = value[i].basketId+'';
          this.selectedBook.dateIssue = value[i].dateIssue;
        }
      },
      complete:()=>{
        this.isDataLoaded = true;
        // console.log(this.book);
      }
    })
  }


  deleteBasketToUser(idDelete) {
    console.log(idDelete);
    this.basketService.deleteBasketToUser(idDelete).subscribe({
      next: (value) => {
        console.log(value);
        this.selectedBook.myBooksRequest = false;
        this.selectedBook.myBooksBasket = false;
      },
      complete: () => {
        this.isDataLoaded = true;
      }
    })
  }

  setSelectedAuthor(item: Author) {
    if (item.clickAuthor){
      this.selectedAuthor = item;
    }
    else {
      this.selectedAuthor={};
    }
  }

  backToListAuthors() {
    this.booksAuthors =[];
    this.authors.map(x=>x.clickAuthor=false);
    console.log(this.authors);
    this.selectedAuthor={}
    this.selectedBook = {};
    this.authorsService.getAllAuthor().subscribe(value => this.authors = value);
  }
  backToListBookToAuthor() {
    this.selectedBook = {};
  }

  clickBook(item) {
    this.selectedBook = item;
    this.getImageByBookId(item.bookId);

    this.getBasketByBookId(this.selectedBook.bookId);
  }

  getAllBookByAuthor(item: Author) {
    console.log(item);
    item.clickAuthor = !item.clickAuthor;
    if (item.clickAuthor){
      this.bookService.getAllBooksByAuthorId(item.authorsId).subscribe({
        next: (value) => {
          this.booksAuthors = value;
          item.books = value;
          console.log(this.authors);
        }
      })
    }


  }
  getImageByBookId(bookId?:number) {
    if (bookId!=undefined){


      this.imageService.getBookImg(bookId).subscribe({
        next: (value) => {
          const reader = new FileReader();
          reader.readAsDataURL(value);
          if (bookId > 0) {
            this.selectedBook.imageBlob = value;
            reader.addEventListener("load", () => {
              this.selectedBook.imageSrcTemp = reader.result;
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

}
