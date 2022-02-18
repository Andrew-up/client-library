import {Component, EventEmitter, OnInit, ViewEncapsulation} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {TokenStorageService} from "./services/token-storage.service";
import {ErrorInterceptorService} from "./helper/error-interceptor.service";
import {BooksService} from "./services/books.service";
import {Book} from "./models/Book";
import {ImageService} from "./services/image.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    this.getAllBooks();
  }

  title = 'client';

  constructor(private token: TokenStorageService,
              private booksService: BooksService,
              private imageService: ImageService) {
  }

  logout() {
    this.token.logOut();
  }

  book: Book[] =
    [{
      bookTitle: '123',
      genreCode: '222',
      numberPages: '0',
      bookReleaseDate: '123',
      genreName: '123'
    }];


  getAllBooks() {
    this.booksService.getAllBooks().subscribe({
      next: (value) => {
        this.book = value;
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        console.log('complete')
        for (let i = 0; i < this.book.length; i++) {
          this.imageService.getBookImg(this.book[i].bookId).subscribe({
            next: (value) => {
              this.book[i].imageBlob = value;
              const reader = new FileReader();
              reader.readAsDataURL(value);
              reader.addEventListener("load", () => {
                this.book[i].imageSrcTemp = reader.result;
              })
            },
            error: (err) => {
              console.log(err)
            },
            complete: () => {
            }
          })
        }
      }
    })
  }

  getLoggedInStatus() {
    return this.token.getToken() == null;
  }

  public getLoggerInUser = false;
  public getLoggerInWorker = false;
  public getLoggerInAdmin = false;
  isResizeble = true;


  public getLoggerInUserRole() {
    if (this.token.getRole() == 'ROLE_USER') {
      this.getLoggerInUser = true;
      this.getLoggerInWorker = false;
      this.getLoggerInAdmin = false;
      console.log('ROLE_USER')
      return 'user'
    }
    if (this.token.getRole() == 'ROLE_WORKER') {
      this.getLoggerInUser = true;
      this.getLoggerInWorker = true;
      this.getLoggerInAdmin = false;
      console.log('ROLE_WORKER')
      return 'worker'
    }
    if (this.token.getRole() == 'ROLE_ADMIN') {
      this.getLoggerInUser = true;
      this.getLoggerInWorker = true;
      this.getLoggerInAdmin = true;
      // console.log('ROLE_ADMIN')
      return 'admin'
    }
    return ''
  }

  test?: string;

  checkStorage(): string {
    this.test = this.token.getRole() + '';
    return this.token.getRole() + '';
  }


  public isVisited = false;

  openSubmenu() {
    this.isVisited = !this.isVisited;
  }


}
