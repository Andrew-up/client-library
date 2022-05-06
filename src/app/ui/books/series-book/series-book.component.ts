import {Component, OnInit, PipeTransform} from '@angular/core';
import {NotificationService} from "../../../services/notification.service";
import {CoverCode} from "../../../models/CoverCode";
import {SeriesService} from "../../../services/series.service";
import {Series} from "../../../models/Series";
import {Author} from "../../../models/Author";
import {AuthorsService} from "../../../services/authors.service";
import {keyframes} from "@angular/animations";


@Component({
  selector: 'app-series-book',
  templateUrl: './series-book.component.html',
  styleUrls: ['./series-book.component.css', '../../common_styles.css']
})
export class SeriesBookComponent implements OnInit {

  constructor(private seriesService: SeriesService,
              private toast: NotificationService,
              private authorsService: AuthorsService) {
  }

  searchedKeyword!: string;

  setClickAuthorsInput(value: boolean) {
    this._clickAuthorsInput = !value;
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

  get isDataAuthorsLoad(): boolean {
    return this._isDataAuthorsLoad;
  }
  setIsDataAuthorsLoad(value: boolean) {
    this._isDataAuthorsLoad = value;
  }
  get selectedAuthor(): Author {
    return this._selectedAuthor;
  }

  set selectedAuthor(value: Author) {
    this._selectedAuthor = value;
  }

  private _selectedAuthor: Author = {authorsId: 0};
  private _isDataAuthorsLoad: boolean = false;
  private _clickAuthorsInput = false;
  private _inputTextAuthor?: string = '';
  logConsole(any) {
    console.log(any);
  }


  allObject: Series[] = [{}]
  authors: Author[] = [{}]

  updateThisObject: Series = {}
  response = 'Ответ: ';
  enableEditIndex = null;
  fieldNewName = '';
  isFieldEdit = false;
  idDelete?: number;
  isErrorDataFormat = false;
  loadingInProgress = false;
  public selectedAuthors: any = null;
  public selectedAuthorsUpdate: any = null;
  public dataList = true;

  outputToJson(any: any) {
    console.log(JSON.stringify(any));
  }

  parseTo(any, any2) {
    console.log('1:' + JSON.stringify(any) + '2:' + any2);
  }

  parseToJson(authors?: Author): string {
    let obj: Author = {
      id: authors?.id,
      firstname: authors?.firstname,
      lastname: authors?.lastname,
      dateOfBirth: authors?.dateOfBirth
    }
    if (obj.id != undefined) {
      return obj.firstname + ' ' + obj.lastname + '  ' + obj.dateOfBirth;
    } else {
      return "Автор не найден"
    }


  }

  ngOnInit(): void {
    this.getAllObject();
  }

  getAllAuthors() {
    this.authorsService.getAllAuthor().subscribe(res => {
        this.authors = res;
        this.filterObjAuthors = this.authors;
        for (let i = 0; i < res.length; i++) {
          this.filterObjAuthors[i].filterString = res[i].firstname + ' ' + res[i].lastname + ' ' + res[i].patronymic;
        }
    },
      error => {

      })
  }

  enableEditMethod(e, i) {
    this.isFieldEdit = !this.isFieldEdit;
    this.enableEditIndex = i;
    this.updateThisObject.seriesName = '';
  }

  cancel() {
    this.enableEditIndex = null;
    this.isFieldEdit = false;
    this.selectedAuthorsUpdate = null;
  }

  rememberIdDelete(id?: number) {
    this.idDelete = id;
  }

  updateObject(id, updateIdAuthor) {
    this.isErrorDataFormat = false;
    this.updateThisObject.seriesId = id;
    this.updateThisObject.authorsId = updateIdAuthor;
    console.log(this.updateThisObject);
    this.seriesService.updateSeries(this.updateThisObject).subscribe({
      next: (value) => {
        if (this.updateThisObject.seriesName == value.seriesName) {
          this.response = 'Ответ: ' + value.seriesName + ' успешно сохранено';
          this.getAllObject();
          this.enableEditIndex = null;
          this.isFieldEdit = false;
          this.selectedAuthorsUpdate = null;
          console.log(this.updateThisObject)
        } else {
          this.response = 'Ответ: ' + value.seriesName;
          this.isErrorDataFormat = true;
        }
        if (value.seriesId == -2000) {
          this.isErrorDataFormat = false;
          this.response = 'Ответ: ' + value.seriesName;
        }
      },
      error: (error) => {

      }
    })
  }

  deleteObject(id?: number) {
    this.isErrorDataFormat = false;
    console.log('delete:', this.idDelete)
    this.seriesService.deleteSeries(id).subscribe({
      next: (value) => {
        this.getAllObject();

        this.toast.showSnackBar(value.message);
        this.response = "";
      },
      error: (error) => {

      }
    })

  }

  addObject(value: any) {
    console.log(value);
    this.loadingInProgress = true;
    let obj: Series = {
      seriesName: this.fieldNewName,
      authorsId: value,
    }
    this.seriesService.createSeries(obj).subscribe({
      next: (value) => {
        this.loadingInProgress = false;
        if (this.fieldNewName == value.seriesName) {
          this.response = 'Ответ: ' + value.seriesName + '  Успешно добавлен';
          this.toast.showSnackBar(value.seriesName+' успешно добавлен' );
          this.getAllObject();
          this.fieldNewName = '';
          this.isErrorDataFormat = false;
          this.selectedAuthors = null;
        } else {
          this.toast.showSnackBar(value.seriesName+'');
          this.isErrorDataFormat = true;
        }
        if (value.seriesId == -2000) {
          this.isErrorDataFormat = false;
          this.toast.showSnackBar(value.seriesName+'');
          this.response = 'Ответ: ' + value.seriesName;
        }
      },
      error: (error) => {
        this.loadingInProgress = false;

      }
    })
  }

  getAllObject() {
    this.seriesService.getAllSeries().subscribe({
      next: (value) => {
        this.allObject = value;

        // console.log(value);
      },
      error: (error) => {

      },
      complete:()=>{
        this.getAllAuthors();
      }
    })
  }

  filterObjAuthors: any[] = [{
    filterString: '',
  }];


  valueAuthorsOptionOrInputFilter(objNgModel, inputOrOption, objFilter, item?) {

    this.inputTextAuthor = inputOrOption;
    console.log(inputOrOption)
    if (item != null) {
      this.selectedAuthor.authorsFullName = item.firstname + ' ' + item.lastname + ' ' + item.patronymic;
      this.selectedAuthor.authorsId = item.authorsId;
      this.filterObjAuthors = this.filterInputByObject(inputOrOption, objFilter, objNgModel.name, true);
      this.setIsDataAuthorsLoad(true);
    } else {
      this.setIsDataAuthorsLoad(false);
      this.filterObjAuthors = this.filterInputByObject(inputOrOption, objFilter, objNgModel.name, false);
    }
    console.log(objNgModel);

  }

  filterInputByObject(filterInput: string, objFilter: any, controls: string, click: boolean): any {
    let errorArray: Array<string> = [];
    filterInput = filterInput.toLowerCase();
    let filterOption = objFilter.filter(x => filterInput === "" || x.filterString?.toLowerCase().includes(filterInput));
    if (filterOption.length == 0) {
      errorArray.push('not found length == 0');
      this.selectedAuthor = {};
    }
    if (!click) {
      errorArray.push('no click Value Option');
      this.selectedAuthor = {};
    }
    if (click) {
      errorArray.length = 0;
      console.log('error clear')
    }

    return filterOption;
  }




}
