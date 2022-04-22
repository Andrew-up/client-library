import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../models/Book";
import {Author} from "../models/Author";
import {CoverCode} from "../models/CoverCode";
import {AgeLimit} from "../models/AgeLimit";
import {Series} from "../models/Series";
import {BookGenres} from "../models/BookGenres";
import {EditionLanguage} from "../models/EditionLanguage";
import {Translation} from "../models/Translation";
import {Publisher} from "../models/Publisher";

const BOOKS_API = 'http://localhost:8099/api/';
const AUTHORS_API = 'http://localhost:8099/api/authors/';
const COVER_CODE_API = 'http://localhost:8099/api/books/cover-code/';
const AGE_LIMIT_API = 'http://localhost:8099/api/books/age-limit/';
const SERIES_API = 'http://localhost:8099/api/books/series/';
const GENRES_API = 'http://localhost:8099/api/books/genres/';
const EDITION_LANGUAGE_API = 'http://localhost:8099/api/books/edition-language/';
const TRANSLATION_API = 'http://localhost:8099/api/books/translation/';
const PROMOCODE_API = 'http://localhost:8099/api/promocode/apply/';


@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private httpClient: HttpClient) {
  }

  public CreateBook(book: any): Observable<Book> {
    // console.log('crete book thhp: '+JSON.stringify(book));
    return this.httpClient.post(BOOKS_API + 'staff/books/create', book);
  }

  public getBookById(id): Observable<Book> {
    return this.httpClient.get<Book>(BOOKS_API + 'book/' + id);
  }

  public getAllBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(BOOKS_API + 'books/all/');
  }
  public getAllBooksByAuthorId(authorId?:number): Observable<Book[]> {
    return this.httpClient.get<Book[]>(BOOKS_API + 'books/allByAuthorId/'+authorId);
  }
  public getNewBook(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(BOOKS_API + 'books/newBook/');
  }
  public getMaxRent(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(BOOKS_API + 'books/maxRent/');
  }

  public getAllBooksByNumberPage(page, size): Observable<Book[]> {
    return this.httpClient.get<Book[]>(BOOKS_API + 'books/AllBookByPage', {
      params: {
        page: page,
        size: size,
      }
    });
  }

  public getAllPublisher(): Observable<Publisher[]> {
    return this.httpClient.get<Publisher[]>(BOOKS_API + 'books/publisher/all');
  }

  public getAllAuthors(): Observable<Author[]> {
    return this.httpClient.get<Author[]>(AUTHORS_API + 'all');
  }

  public getAllCoverCode(): Observable<CoverCode[]> {
    return this.httpClient.get<CoverCode[]>(COVER_CODE_API + 'all');
  }

  public getAllAgeLimit(): Observable<AgeLimit[]> {
    return this.httpClient.get<AgeLimit[]>(AGE_LIMIT_API + 'all');
  }

  public getAllSeries(): Observable<Series[]> {
    return this.httpClient.get<Series[]>(SERIES_API + 'all');
  }

  public getAllGenres(): Observable<BookGenres[]> {
    return this.httpClient.get<BookGenres[]>(GENRES_API + 'all');
  }

  public getAllEditionLanguage(): Observable<EditionLanguage[]> {
    return this.httpClient.get<EditionLanguage[]>(EDITION_LANGUAGE_API + 'all');
  }

  public getAllTranslation(): Observable<Translation[]> {
    return this.httpClient.get<Translation[]>(TRANSLATION_API + 'all');
  }

  public sendPromoCode(promoCode: any): Observable<any> {
    return this.httpClient.post(PROMOCODE_API, promoCode);
  }

  public searchBook(searchInput?:string,typeSearch?:string):Observable<any>{
    return this.httpClient.post(BOOKS_API+'books/search',{
      search:searchInput,
      typeSearch:typeSearch
    });
  }

}
