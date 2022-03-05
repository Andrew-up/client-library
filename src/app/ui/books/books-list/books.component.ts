import {Component, OnInit} from '@angular/core';
import {BooksService} from "../../../services/books.service";
import {Book} from "../../../models/Book";
import {ImageService} from "../../../services/image.service";
import {LoginComponent} from "../../../auth/login/login.component";
import {DomSanitizer} from "@angular/platform-browser";
import * as url from "url";
import * as URL from "url";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  constructor(private booksService: BooksService,
              private imageService: ImageService) {
  }

  isBooksNull:boolean = true;

  book: Book[] =
    [{
      bookTitle: '123',
      genreCode: '222',
      numberPages: '0',
      bookReleaseDate: '123',
      genreName: '123'
    }];

  getAllBook() {
    this.booksService.getAllBooks().subscribe({
      next: (value) => {
        console.log()
        if(value.length.valueOf()==0){
          this.isBooksNull = true;
        }
        else {
          this.isBooksNull = false;
        }
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
                // console.log(reader.result)
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

  ngOnInit(): void {
    this.getAllBook();
  }

}
