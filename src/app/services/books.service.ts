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

const BOOKS_API = 'http://localhost:8099/api/books/';
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

  public CreateBook(book:any):Observable<Book>{
    // console.log('crete book thhp: '+JSON.stringify(book));
    return this.httpClient.post(BOOKS_API+'create',book);

  }

  public getAllBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(BOOKS_API + 'all');
  }

  public getAllPublisher():Observable<Book[]>{
    return this.httpClient.get<Book[]>(BOOKS_API+'publisher/all');
  }
  public getAllAuthors():Observable<Author[]>{
    return this.httpClient.get<Author[]>(AUTHORS_API+'all');
  }
  public getAllCoverCode():Observable<CoverCode[]>{
    return this.httpClient.get<CoverCode[]>(COVER_CODE_API+'all');
  }
  public getAllAgeLimit():Observable<AgeLimit[]>{
    return this.httpClient.get<AgeLimit[]>(AGE_LIMIT_API+'all');
  }
  public getAllSeries():Observable<Series[]>{
    return this.httpClient.get<Series[]>(SERIES_API+'all');
  }
  public getAllGenres():Observable<BookGenres[]>{
    return this.httpClient.get<BookGenres[]>(GENRES_API+'all');
  }
  public getAllEditionLanguage():Observable<EditionLanguage[]>{
    return this.httpClient.get<EditionLanguage[]>(EDITION_LANGUAGE_API+'all');
  }
  public getAllTranslation():Observable<Translation[]>{
    return this.httpClient.get<Translation[]>(TRANSLATION_API+'all');
  }
  public sendPromoCode(promoCode:any):Observable<any>{
    return this.httpClient.post(PROMOCODE_API, promoCode);
  }

}
