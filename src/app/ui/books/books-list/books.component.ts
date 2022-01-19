import {Component, OnInit} from '@angular/core';
import {BooksService} from "../../../services/books.service";
import {Book} from "../../../models/Book";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  constructor(private booksService: BooksService) {
  }

book: Book[] =
  [{bookTitle:'123',genreCode:'222',numberPages:'0',bookReleaseDate:'123'}];

  getAllBook() {
    this.booksService.getAllBooks().subscribe(res=>{
      this.book = res;
      console.log(this.book);
      console.log(res);
    })
  }

  ngOnInit(): void {
    this.getAllBook();

  }

}
