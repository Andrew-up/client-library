import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../services/token-storage.service";
import {BooksService} from "../../services/books.service";
import {ImageService} from "../../services/image.service";
import {Book} from "../../models/Book";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

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

}
