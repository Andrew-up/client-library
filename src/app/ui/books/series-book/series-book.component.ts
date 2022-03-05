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

  logConsole(any) {
    console.log(any);
  }




  addCarStatus = '';
  allObject: Series[] = [{}]
  authors: Author[] = [{}]

  updateThisObject: Series = {}
  response = 'Ответ: ';
  enableEditIndex = null;
  fieldNewName = '';
  isFieldEdit = false;
  idDelete?: number;
  isErrorDataFormat = false;
  errorCount = 0;
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
    this.getAllAuthors();
  }

  getAllAuthors() {
    this.authorsService.getAllAuthor().subscribe(res => {
      this.authors = res;
        this.errorCount = 0;
    },
      error => {
        if (error.status == 401 && this.errorCount < 5) {
          this.errorCount++;
          this.getAllAuthors();
        }
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
          this.errorCount = 0;
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
        if (error.status == 401 && this.errorCount < 5) {
          this.errorCount++;
          this.updateObject(id, updateIdAuthor);
        }
      }
    })
  }

  deleteObject(id?: number) {
    this.isErrorDataFormat = false;
    console.log('delete:', this.idDelete)
    this.seriesService.deleteSeries(id).subscribe({
      next: (value) => {
        this.getAllObject();
        this.errorCount = 0;
        this.toast.showSnackBar(value.message);
        this.response = "";
      },
      error: (error) => {
        if (error.status == 401 && this.errorCount < 5) {
          this.errorCount++;
          this.deleteObject(id);
        }
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
          this.getAllObject();
          this.fieldNewName = '';
          this.errorCount = 0;
          this.isErrorDataFormat = false;
          this.selectedAuthors = null;
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
        this.loadingInProgress = false;
        if (error.status == 401 && this.errorCount < 5) {
          this.errorCount++;
          this.addObject(value);
        }
      }
    })
  }

  getAllObject() {
    this.seriesService.getAllSeries().subscribe({
      next: (value) => {
        this.allObject = value;
        this.errorCount = 0;
        // console.log(value);
      },
      error: (error) => {
        if (error.status == 401 && this.errorCount < 5) {
          this.errorCount++;
          this.getAllObject();
        }
      }
    })
  }
}
