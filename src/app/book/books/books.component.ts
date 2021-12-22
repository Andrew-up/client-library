import {Component, OnInit} from '@angular/core';
import {BooksService} from "../../services/books.service";
import {Book} from "../../models/Book";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  constructor(public booksService: BooksService) {
  }

  items = [
    'Apple iPhone 7',
    'Huawei Mate 9',
    'Samsung Galaxy S7',
    'Motorola Moto Z',
  ]

  condition: boolean = true
  toggle() {
    this.condition = !this.condition
  }


 // public book: Book[] = [{bookTitle:'',genreCode:'',numberPages:0,releaseDate:''}];
book: Book[] =
  [{bookTitle:'123',genreCode:'222',numberPages:0,releaseDate:'123'}];

  getAllBook() {
    this.booksService.getAllBooks().subscribe(res=>{
      // this.book = res;
      // console.log(this.book);
    })
  }

  ngOnInit(): void {
    this.getAllBook();
  }

}
