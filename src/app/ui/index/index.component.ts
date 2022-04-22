import {Component, OnInit} from '@angular/core';
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
    this.getNewBook();
    this.getMaxRent();
  }
  newBook:Book[] =[];
  maxRent:Book[] =[];

  title = 'client';

  constructor(private token: TokenStorageService,
              private booksService: BooksService,
              private imageService: ImageService) {
  }

  getNewBook() {
    this.booksService.getNewBook().subscribe({
      next: (value) => {
        this.newBook = value;
        console.log(value);
      },
      complete:()=>{
        this.getImageByBookId(this.newBook);
      }
    })
  }
  getMaxRent() {
    this.booksService.getMaxRent().subscribe({
      next: (value) => {
        this.maxRent = value;
        console.log(value);
      },
      complete:()=>{
        this.getImageByBookId(this.maxRent);
      }
    })
  }


  getImageByBookId(book:Book[]) {

    for (let i = 0; i < book.length; i++) {
      this.imageService.getBookImg(book[i].bookId).subscribe({
        next: (value) => {
          const reader = new FileReader();
          reader.readAsDataURL(value);
          if (book.length > 0) {
            book[i].imageBlob = value;
            reader.addEventListener("load", () => {
              book[i].imageSrcTemp = reader.result;
            })
          }
        },
        error: (err) => {
        },
        complete: () => {

        }
      })
    }


  }

}
