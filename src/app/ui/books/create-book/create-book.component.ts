import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {BooksService} from "../../../services/books.service";
import {Book} from "../../../models/Book";
import {Author} from "../../../models/Author";
import {CoverCode} from "../../../models/CoverCode";
import {AgeLimit} from "../../../models/AgeLimit";
import {Series} from "../../../models/Series";
import {BookGenres} from "../../../models/BookGenres";
import {EditionLanguage} from "../../../models/EditionLanguage";
import {Translation} from "../../../models/Translation";
import {UserService} from "../../../services/user.service";
import {from, fromEvent, map, Observable, Observer, of} from "rxjs";
import {ImageUploadedFile} from "../../../models/ImageUploadedFile";
import {concatMap, catchError, take} from 'rxjs/operators';
import {ImageService} from "../../../services/image.service";
import {SeriesService} from "../../../services/series.service";
import {RentBook} from "../../../models/RentBook";
import {PriceRentService} from "../../../services/price-rent.service";
import {Price} from "../../../models/Price";
import {Publisher} from "../../../models/Publisher";
import {NgForm} from "@angular/forms";
import {NotificationService} from "../../../services/notification.service";


const INVALID_FILE = ' Invalid file.';
const INVALID_IMAGE = ' Invalid image.';
const INVALID_SIZE = ' Invalid Size.';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css', '../../common_styles.css']
})

export class CreateBookComponent implements OnInit {



  @ViewChild('formElement', {static: false}) public form!: NgForm;

  constructor(public booksService: BooksService,
              private userService: UserService,
              private imageUploadService: ImageService,
              private seriesService: SeriesService,
              private priceService: PriceRentService,
              private novificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.getAllAuthors();
  }

  filterObjAuthors: any[] = [{
    filterString: '',
  }];
  filterObjGenre: any[] = [{
    filterString: '',
  }];
  filterCoverType: any[] = [{
    filterString: '',
  }];
  filterBookSeries: any[] = [{
    filterString: '',
  }];
  filterAgeLimit: any[] = [{
    filterString: '',
  }];
  filterEditionLanguage: any[] = [{
    filterString: '',
  }];
  filterTranslation: any[] = [{
    filterString: '',
  }];
  filterRentPrice: any[] = [{
    filterString: '',
  }];
  filterPublisher: any[] = [{
    filterString: '',
  }];
  authors: Author[] = [{}];
  genre: BookGenres[] = [{}];
  coverType: CoverCode[] = [{}];
  bookSeries: Series[] = [{}];
  ageLimit: AgeLimit[] = [{}];
  editionLanguage: EditionLanguage[] = [{}];
  translation: Translation[] = [{}];
  rentPrice: Price[] = [{}];
  publisher: Publisher[] = [{}];
  private _clickAuthorsInput = false;
  private _inputTextAuthor?: string = '';
  private _inputTextGenre?: string = '';
  private _inputTextTypeCover?: string = '';
  private _inputTextBookSeries?: string = '';
  private _inputTextAgeLimit?: string = '';
  private _inputTextEditionLanguage?: string = '';
  private _inputTextTranslation?: string = '';
  private _inputTextRentPrice?: string = '';
  private _inputTextPublisher?: string = '';
  public inputTextBookTitle: string|null =null;
  public inputTextCountNumber: number =1;
  public inputTextNumberPages?: number|null = null;
  public inputTextISBN?: string|null = null;
  public inputTextReleaseDate?: string|null = null;
  private _clickTypeCover = false;
  private _clickGenreInput = false;
  private _clickBookSeries = false;
  private _clickAgeLimit = false;
  private _clickEditionLanguage = false;
  private _clickTranslation = false;
  private _clickRentPrice = false;
  private _clickPublisher = false;
  private _selectedAuthor: Author = {authorsId: 0};
  private _selectedGenre: BookGenres = {bookGenresId: 0};
  private _selectedCoverType: CoverCode = {coverBookId: 0};
  private _selectedBookSeries: Series = {seriesId: 0};
  private _selectedAgeLimit: AgeLimit = {ageLimitId: 0};
  private _selectedEditionLanguage: EditionLanguage = {languageId: 0};
  private _selectedTranslation: Translation = {translationId: 0};
  private _selectedRentPrice: Price = {id: 0};
  private _selectedPublisher: Publisher = {publisherId: 0};
  private _isDataAuthorsLoad: boolean = false;
  url: any;
  response: any;
  bookId: any;
  get inputTextPublisher(): string {
    return this._inputTextPublisher + '';
  }

  set inputTextPublisher(value: string) {
    this._inputTextPublisher = value;
  }

  get clickPublisher(): boolean {
    return this._clickPublisher;
  }

  setClickRentPublisher(value: boolean) {
    this._clickPublisher = value;
  }

  get selectedPublisher(): Publisher {
    return this._selectedPublisher;
  }

  set selectedPublisher(value: Publisher) {
    this._selectedPublisher = value;
  }

  get inputTextRentPrice(): string {
    return this._inputTextRentPrice + '';
  }

  set inputTextRentPrice(value: string) {
    this._inputTextRentPrice = value;
  }

  get clickRentPrice(): boolean {
    return this._clickRentPrice;
  }

  setClickRentPrice(value: boolean) {
    this._clickRentPrice = value;
  }

  get selectedRentPrice(): Price {
    return this._selectedRentPrice;
  }

  set selectedRentPrice(value: Price) {
    this._selectedRentPrice = value;
  }

  get inputTextTranslation(): string {
    return this._inputTextTranslation + '';
  }

  set inputTextTranslation(value: string) {
    this._inputTextTranslation = value;
  }

  get selectedTranslation(): Translation {
    return this._selectedTranslation;
  }

  set selectedTranslation(value: Translation) {
    this._selectedTranslation = value;
  }

  get clickTranslation(): boolean {
    return this._clickTranslation;
  }

  setClickTranslation(value: boolean) {
    this._clickTranslation = value;
  }

  get clickEditionLanguage(): boolean {
    return this._clickEditionLanguage;
  }

  setClickEditionLanguage(value: boolean) {
    this._clickEditionLanguage = value;
  }

  get inputTextEditionLanguage(): string {
    return this._inputTextEditionLanguage + '';
  }

  set inputTextEditionLanguage(value: string) {
    this._inputTextEditionLanguage = value;
  }

  get selectedEditionLanguage(): EditionLanguage {
    return this._selectedEditionLanguage;
  }

  set selectedEditionLanguage(value: EditionLanguage) {
    this._selectedEditionLanguage = value;
  }

  get selectedAgeLimit(): AgeLimit {
    return this._selectedAgeLimit;
  }

  set selectedAgeLimit(value: AgeLimit) {
    this._selectedAgeLimit = value;
  }

  get inputTextAgeLimit(): string {
    return this._inputTextAgeLimit + '';
  }

  set inputTextAgeLimit(value: string) {
    this._inputTextAgeLimit = value;
  }

  get clickAgeLimit(): boolean {
    return this._clickAgeLimit;
  }

  setClickAgeLimit(value: boolean) {
    this._clickAgeLimit = value;
  }

  get isDataAuthorsLoad(): boolean {
    return this._isDataAuthorsLoad;
  }

  setIsDataAuthorsLoad(value: boolean) {
    this._isDataAuthorsLoad = value;
  }

  get selectedBookSeries(): Series {
    return this._selectedBookSeries;
  }

  set selectedBookSeries(value: Series) {
    this._selectedBookSeries = value;
  }

  get inputTextBookSeries(): string {
    return this._inputTextBookSeries + '';
  }

  set inputTextBookSeries(value: string) {
    this._inputTextBookSeries = value;
  }

  get clickBookSeries(): boolean {
    return this._clickBookSeries;
  }

  setClickBookSeries(value: boolean) {
    this._clickBookSeries = value;
  }

  get selectedCoverType(): CoverCode {
    return this._selectedCoverType;
  }

  set selectedCoverType(value: CoverCode) {
    this._selectedCoverType = value;
  }

  get selectedGenre(): BookGenres {
    return this._selectedGenre;
  }

  set selectedGenre(value: BookGenres) {
    this._selectedGenre = value;
  }

  get selectedAuthor(): Author {
    return this._selectedAuthor;
  }

  set selectedAuthor(value: Author) {
    this._selectedAuthor = value;
  }

  get inputTextTypeCover(): string {
    return this._inputTextTypeCover + '';
  }

  set inputTextTypeCover(value: string) {
    this._inputTextTypeCover = value;
  }

  get clickTypeCover(): boolean {
    return this._clickTypeCover;
  }

  setClickTypeCover(value: boolean) {
    this._clickTypeCover = value;
  }

  setClickAuthorsInput(value: boolean) {
    this._clickAuthorsInput = !value;
    this._clickGenreInput = false;
  }

  get clickAuthorsInput(): boolean {
    return this._clickAuthorsInput;
  }

  set inputTextAuthor(value: string) {
    this._inputTextAuthor = value + '';
  }

  get inputTextAuthor(): string {
    return this._inputTextAuthor + '';
  }

  setClickGenreInput() {
    this._clickAuthorsInput = false;
    this._clickGenreInput = !this._clickGenreInput;
  }

  get clickGenreInput(): boolean {
    return this._clickGenreInput;
  }

  get inputTextGenre(): string {
    return this._inputTextGenre + '';
  }

  set inputTextGenre(value: string) {
    this._inputTextGenre = value;
  }


  valueAuthorsOptionOrInputFilter(objNgModel, inputOrOption, objFilter, item?) {

    this.inputTextAuthor = inputOrOption;
    console.log(inputOrOption)
    if (item != null) {
      this.selectedAuthor.authorsFullName = item.firstname + ' ' + item.lastname + ' ' + item.patronymic;
      this.selectedAuthor.authorsId = item.authorsId;
      this.filterObjAuthors = this.filterInputByObject(inputOrOption, objFilter, objNgModel.name, true);
      this.getAuthorsBySeriesId(item.authorsId);
      this.setIsDataAuthorsLoad(true);
    } else {
      this.setIsDataAuthorsLoad(false);
      this.filterObjAuthors = this.filterInputByObject(inputOrOption, objFilter, objNgModel.name, false);
    }
    console.log(objNgModel);

  }

  valueGenreOptionOrInputFilter(objNgModel, inputOrOption, objFilter, item?) {
    console.log(objNgModel.name);
    this.inputTextGenre = inputOrOption;
    if (item != null) {
      this.selectedGenre.bookGenresId = item.bookGenresId;
      this.selectedGenre.genresName = item.genresName;
      this.filterObjGenre = this.filterInputByObject(inputOrOption, objFilter, objNgModel.name, true);
    } else {
      this.filterObjGenre = this.filterInputByObject(inputOrOption, objFilter, objNgModel.name, false);
    }

  }

  valueCoverTypeOptionOrInputFilter(objNgModel, inputOrOption, objFilter, item?) {
    this.inputTextTypeCover = inputOrOption;
    if (item != null) {
      this.selectedCoverType.coverBookId = item.coverBookId;
      this.selectedCoverType.coverBookName = item.coverBookName;
      this.filterCoverType = this.filterInputByObject(inputOrOption, objFilter, objNgModel.name, true);
    } else {
      this.filterCoverType = this.filterInputByObject(inputOrOption, objFilter, objNgModel.name, false);
    }
  }

  valuePublisherOptionOrInputFilter(objNgModel, inputOrOption, objFilter, item?) {
    this.inputTextPublisher = inputOrOption;
    if (item != null) {
      this.selectedPublisher.publisherId = item.publisherId;
      this.selectedPublisher.publisherName = item.publisherName;
      this.filterPublisher = this.filterInputByObject(inputOrOption, objFilter, objNgModel.name, true);
    } else {
      this.filterPublisher = this.filterInputByObject(inputOrOption, objFilter, objNgModel.name, false);
    }
  }


  valueAgeLimitOptionOrInputFilter(objNgModel, inputOrOption, objFilter, item?) {
    this.inputTextAgeLimit = inputOrOption;
    if (item != null) {
      this.selectedAgeLimit.ageLimitId = item.ageLimitId;
      this.selectedAgeLimit.ageLimitName = item.ageLimitName;
      this.filterAgeLimit = this.filterInputByObject(inputOrOption, objFilter, objNgModel.name, true);
    } else {
      this.filterAgeLimit = this.filterInputByObject(inputOrOption, objFilter, objNgModel.name, false);
    }
  }

  valueEditionLanguageOptionOrInputFilter(objNgModel, inputOrOption, objFilter, item?) {
    this.inputTextEditionLanguage = inputOrOption;
    if (item != null) {
      this.selectedEditionLanguage.languageId = item.languageId;
      this.selectedEditionLanguage.languageName = item.languageName;
      this.filterEditionLanguage = this.filterInputByObject(inputOrOption, objFilter, objNgModel.name, true);
    } else {
      this.filterEditionLanguage = this.filterInputByObject(inputOrOption, objFilter, objNgModel.name, false);
    }
  }

  valueTranslationOptionOrInputFilter(objNgModel, inputOrOption, objFilter, item?) {
    this.inputTextTranslation = inputOrOption;
    if (item != null) {
      this.selectedTranslation.translationId = item.translationId;
      this.selectedTranslation.translationName = item.translationName;
      this.filterTranslation = this.filterInputByObject(inputOrOption, objFilter, objNgModel.name, true);
    } else {
      this.filterTranslation = this.filterInputByObject(inputOrOption, objFilter, objNgModel.name, false);
    }
  }

  valueRentPriceModelOptionOrInputFilter(objNgModel, inputOrOption, objFilter, item?) {
    this.inputTextRentPrice = inputOrOption;
    if (item != null) {
      this.selectedRentPrice.id = item.id;
      this.selectedRentPrice.priceName = item.priceName;
      this.filterRentPrice = this.filterInputByObject(inputOrOption, objFilter, objNgModel.name, true);
    } else {
      this.filterRentPrice = this.filterInputByObject(inputOrOption, objFilter, objNgModel.name, false);
    }
  }

  valueBookSeriesOptionOrInputFilter(objNgModel, inputOrOption, objFilter, item?) {
    console.log(inputOrOption);
    this.inputTextBookSeries = inputOrOption;
    if (item != null) {
      this.selectedBookSeries.seriesId = item.seriesId;
      this.selectedBookSeries.seriesName = item.seriesName;
      this.filterBookSeries = this.filterInputByObject(inputOrOption, objFilter, objNgModel.name, true);
    } else {
      this.filterBookSeries = this.filterInputByObject(inputOrOption, objFilter, objNgModel.name, false);
    }
  }

  filterInputByObject(filterInput: string, objFilter: any, controls: string, click: boolean): any {
    let errorArray: Array<string> = [];
    filterInput = filterInput.toLowerCase();
    let filterOption = objFilter.filter(x => filterInput === "" || x.filterString?.toLowerCase().includes(filterInput));
    if (filterOption.length == 0) {
      errorArray.push('not found length == 0');
    }
    if (!click) {
      errorArray.push('no click Value Option');
    }
    if (click) {
      errorArray.length = 0;
      this.form.controls[controls].setErrors(null);
      console.log('error clear')
    }
    if (errorArray.length > 0) {
      this.form.controls[controls].setErrors({warn: errorArray});
    }

    return filterOption;
  }




  submitForm(form: NgForm) {
    console.log(form);
    console.log(this.selectedAuthor);
    console.log(this.selectedGenre);
    console.log(this.selectedCoverType);
    console.log(this.selectedBookSeries);
    this.createBook();
  }

  event(event) {
    if (!event.target.form) {
      this._clickGenreInput = false;
      this._clickAuthorsInput = false;
    }
  }

  getAllGenre() {
    this.booksService.getAllGenres().subscribe(res => {
      this.genre = res;
      this.filterObjGenre = res;
      for (let i = 0; i < res.length; i++) {
        this.filterObjGenre[i].filterString = res[i].genresName;
      }
    })
  }

  getAllCoverType() {
    this.booksService.getAllCoverCode().subscribe(res => {
      this.coverType = res;
      this.filterCoverType = res;
      for (let i = 0; i < res.length; i++) {
        this.filterCoverType[i].filterString = res[i].coverBookName;
      }
    })
  }

  getAllAgeLimit() {
    this.booksService.getAllAgeLimit().subscribe(res => {
      this.ageLimit = res;
      this.filterAgeLimit = res;
      for (let i = 0; i < res.length; i++) {
        this.filterAgeLimit[i].filterString = res[i].ageLimitName;
      }
    })
  }

  getAllEditionLanguage() {
    this.booksService.getAllEditionLanguage().subscribe(res => {
      this.editionLanguage = res;
      this.filterEditionLanguage = res;
      for (let i = 0; i < res.length; i++) {
        this.filterEditionLanguage[i].filterString = res[i].languageName;
      }
    })
  }

  getAllTranslation() {
    this.booksService.getAllTranslation().subscribe(res => {
      this.translation = res;
      this.filterTranslation = res;
      for (let i = 0; i < res.length; i++) {
        this.filterTranslation[i].filterString = res[i].translationName;
      }
    })
  }

  getAllRentPrice() {
    this.priceService.getAllPriceRent().subscribe(res => {
      this.rentPrice = res;
      this.filterRentPrice = res;
      for (let i = 0; i < res.length; i++) {
        this.filterRentPrice[i].filterString = res[i].priceName;
      }
    })
  }

  getAllPublisher() {
    this.booksService.getAllPublisher().subscribe(res => {
      this.publisher = res;
      this.filterPublisher = res;
      for (let i = 0; i < res.length; i++) {
        this.filterPublisher[i].filterString = res[i].publisherName;
      }
    })
  }

  getAuthorsBySeriesId(idAuthors) {
    if (idAuthors != "null") {
      this.seriesService.getAllAuthorsBySeriesId(idAuthors).subscribe({
        next: (res) => {
          this.bookSeries = res;
          // console.log(res)
          this.filterBookSeries = res;
          for (let i = 0; i < res.length; i++) {
            this.filterBookSeries[i].filterString = res[i].seriesName;
          }
          // if (value.length == 0) {
          //   this.authorsFullName = "У автора нет серии книг"
          //   this.isBookSeriesExist = false;
          //   this.selectedSeries = null;
          // } else this.isBookSeriesExist = true;
        },
        error: (error) => {
          // console.log(error);
        }
      })
    }

  }


  getAllAuthors() {
    this.booksService.getAllAuthors().subscribe({
      next: (res) => {
        this.authors = res;
        this.filterObjAuthors = this.authors;
        for (let i = 0; i < res.length; i++) {
          this.filterObjAuthors[i].filterString = res[i].firstname + ' ' + res[i].lastname + ' ' + res[i].patronymic;
        }
      },
      complete: () => {
        this.getAllGenre();
        this.getAllCoverType();
        this.getAllAgeLimit();
        this.getAllEditionLanguage();
        this.getAllTranslation();
        this.getAllRentPrice();
        this.getAllPublisher();
      }
    });
  }

  selectedFile: any = null;

  onFileSelected(event) {
    let listError: Array<String> = [];
    this.selectedFile = <File>event.target.files[0];
    const reader = new FileReader();
    console.log(this.selectedFile.type)
    if (!this.selectedFile.name.match("\\.(jpg|jpeg|png|gif)$")) {
      listError.push("Неверный формат")
    }
    if (this.selectedFile.size > 1000000) {
      console.log("Размер слишком большой")
      listError.push("Размер слишком большой")
    }
    console.log(listError);
    if (listError.length == 0) {
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
      reader.onerror = (event: any) => {
        console.log("File could not be read: " + event.target.error.code);
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      this.novificationService.showSnackBar(listError.toString())
      this.url = null;
    }
    console.log(this.selectedFile);
  }




  createBook() {
    let obj: Book = {
      ageLimitCode: this.selectedAgeLimit.ageLimitId + '',
      bookTitle: this.inputTextBookTitle + '',
      authors: this.selectedAuthor.authorsId+'',
      genreCode: this.selectedGenre.bookGenresId + '',
      bookReleaseDate: this.inputTextReleaseDate + '',
      publisherId: this.selectedPublisher.publisherId + '',
      numberPages: this.inputTextNumberPages + '',
      coverId: this.selectedCoverType.coverBookId + '',
      bookSeries: this.selectedBookSeries.seriesId + '',
      nameISBN: this.inputTextISBN + '',
      languageId: this.selectedEditionLanguage.languageId + '',
      translationId: this.selectedTranslation.translationId + '',
      priceId: this.selectedRentPrice.id + '',
      countBooks: this.inputTextCountNumber
    }
    console.log(JSON.stringify(obj));
    this.booksService.CreateBook(obj).subscribe({
        next: (res: Book) => {
          this.response = 'Ответ: ';
          this.response += res.bookTitle + ' ';
          if (this.inputTextBookTitle == res.bookTitle) {
            this.response = 'Ответ: ';
            this.response = this.response + res.bookTitle + ' Успешно добавлен';
            this.bookId = res.bookId;
            console.log('ID книги: ' + this.bookId)
            this.onUploadImage(res.bookId);
          }
        },
        error: (err) => {
          console.log(err)
          this.response = err.error.error + '\n' + err.error.status;
        }
      }
    )
  }

  onUploadImage(bookId?: number) {
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    console.log(this.selectedFile)
    this.imageUploadService.uploadImgToBook(this.selectedFile, bookId).subscribe({
      next: (value) => {
        console.log(value)
      },
      error: (err) => {
        console.log(err)
      },
      complete: () => {
        console.log('complete')
      }
    })
  }


}
