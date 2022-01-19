import {Component, OnInit} from '@angular/core';
import {BooksService} from "../../../services/books.service";
import {Book} from "../../../models/Book";
import {Author} from "../../../models/Author";
import {CoverCode} from "../../../models/CoverCode";
import {formatDate} from "@angular/common";
import {AgeLimit} from "../../../models/AgeLimit";
import {Series} from "../../../models/Series";
import {BookGenres} from "../../../models/BookGenres";
import {EditionLanguage} from "../../../models/EditionLanguage";
import {Translation} from "../../../models/Translation";
import {BooksComponent} from "../books-list/books.component";

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css','../../common_styles.css']
})
export class CreateBookComponent implements OnInit {

  constructor(public booksService: BooksService) {
  }

  now = new Date();
  maxDate?: string;
  response = 'Ответ: ';

  ageLimit: AgeLimit[] = [{
    ageLimitId: '1',
    ageLimitName: 'test'
  }]

  editionLanguage: EditionLanguage[] = [{
    languageId: '1',
    languageName: 'test'
  }]
  translation: Translation[] = [{
    translationId: '1',
    translationName: 'test'
  }]

  series: Series[] = [{
    seriesId: '1',
    seriesName: 'test'
  }]

  coverCodeName: CoverCode[] = [{
    coverCodeId: '1',
    coverCodeName: 'test'
  }]

  publisherName: Book[] = [{
    publisherId: '1',
    publisherName: 'test'
  }];

  bookGenresName: BookGenres[] = [{
    bookGenresId: '1',
    genresName: 'test'
  }]

  AuthorsName: Author[] = [{
    authorsId: '1',
    firstname: 'ivan',
    lastname: 'ivanov',
    patronymic: 'ivanovich',
    dateOfBirth: '2000-01-01'
  }];

  getAllPublisher() {
    this.booksService.getAllPublisher().subscribe(res => {
      this.publisherName = res;
    })
  }

  getAllGenres() {
    this.booksService.getAllGenres().subscribe(res => {
      this.bookGenresName = res;
    })
  }

  getAllAuthors() {
    this.booksService.getAllAuthors().subscribe(res => {
      this.AuthorsName = res;
    })
  }

  getAllCoverCode() {
    this.booksService.getAllCoverCode().subscribe(res => {
      this.coverCodeName = res;
    })
  }

  getAllAgeLimit() {
    this.booksService.getAllAgeLimit().subscribe(res => {
      this.ageLimit = res;
    })
  }

  getAllSeries() {
    this.booksService.getAllSeries().subscribe(res => {
      this.series = res;
    })
  }

  getAllEditionLanguage() {
    this.booksService.getAllEditionLanguage().subscribe(res => {
      this.editionLanguage = res;
    })
  }

  getAllTranslation() {
    this.booksService.getAllTranslation().subscribe(res => {
      this.translation = res;
    })
  }

  public selectedBookTitle = 'default name book for the test';
  public selectedNumberPages = null;
  public selectedPublisherId = null;
  public selectedAuthors = null;
  public selectedCoverCode = null;
  public selectedAgeLimit = null;
  public selectedSeries = null;
  public selectedGenres = null;
  public selectedEditionLanguage = null;
  public selectedTranslation =null;
  public selectedISBN = null;
  public selectedReleaseDate = null;
  public selectedImageId = null;

  ngOnInit(): void {
    this.maxDate = this.convertDate(this.now).toString();
    this.getAllPublisher();
    this.getAllAuthors();
    this.getAllCoverCode();
    this.getAllAgeLimit();
    this.getAllSeries();
    this.getAllGenres();
    this.getAllEditionLanguage();
    this.getAllTranslation();
    console.log(this.selectedISBN);
  }

  convertDate(date: Date) {
    let yyyy = date.getFullYear().toString();
    let mm = (date.getMonth() + 1).toString();
    let dd = date.getDate().toString();
    let mmChars = mm.split('');
    let ddChars = dd.split('');
    return yyyy + '-' + (mmChars[1] ? mm : "0" + mmChars[0]) + '-' + (ddChars[1] ? dd : "0" + ddChars[0]);
  }


  testResponse?: any;
  createBook() {
    let obj: Book = {
      bookTitle: this.selectedBookTitle + '',
      authors: this.selectedAuthors + '',
      genreCode: this.selectedGenres + '',
      bookReleaseDate: this.selectedReleaseDate + '',
      publisherId: this.selectedPublisherId + '',
      numberPages: this.selectedNumberPages + '',
      coverId: this.selectedCoverCode + '',
      series: this.selectedSeries + '',
      nameISBN: this.selectedISBN + '',
      ageLimitCode: this.selectedAgeLimit + '',
      languageId: this.selectedEditionLanguage + '',
      translation: this.selectedTranslation + '',
      imageId: this.selectedImageId + '',
    }
    console.log(JSON.stringify(obj));
    this.booksService.CreateBook(obj).subscribe({
      next:(res:Book)=>{
        this.response = 'Ответ: ';
        this.response += res.bookTitle+' ';
        if (this.selectedBookTitle == res.bookTitle) {
          this.response = 'Ответ: ';
          this.response = this.response + res.bookTitle + ' Успешно добавлен';
        }
    }
  }
    )
    // console.log('Test response2:  ' + this.testResponse+ '' );
    // console.log('Test stringify:  ' + JSON.stringify(this.testResponse)+ '' );
    // this.zzzz = JSON.parse(this.testResponse);
    // console.log('Test response:  ' + this.zzzz+ '' );

  }

}
