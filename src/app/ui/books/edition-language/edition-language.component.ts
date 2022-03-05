import {Component, OnInit} from '@angular/core';
import {EditionLanguage} from "../../../models/EditionLanguage";
import {EditionLanguageService} from "../../../services/edition-language.service";
import {Translation} from "../../../models/Translation";
import {TranslationService} from "../../../services/translation.service";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-edition-language',
  templateUrl: './edition-language.component.html',
  styleUrls: ['./edition-language.component.css', '../../common_styles.css']
})
export class EditionLanguageComponent implements OnInit {

  constructor(private editionLanguageService: EditionLanguageService,
              private toast: NotificationService) {

  }

  allObject: EditionLanguage[] = [{}]
  updateThisObject: EditionLanguage = {}
  response = 'Ответ: ';
  enableEditIndex = null;
  fieldNewName = '';
  isFieldEdit = false;
  idDelete?: number;
  isErrorDataFormat = false;
  errorCount = 0;
  loadingInProgress = false;

  ngOnInit(): void {
    this.getAllObject();
  }

  enableEditMethod(e, i) {
    this.isFieldEdit = !this.isFieldEdit;
    this.enableEditIndex = i;
    this.updateThisObject.languageName = '';
  }

  cancel() {
    this.enableEditIndex = null;
    this.isFieldEdit = false;
  }

  rememberIdDelete(id?: number) {
    this.idDelete = id;
  }

  updateObject(id) {
    this.isErrorDataFormat = false;
    this.updateThisObject.languageId = id;
    console.log(this.updateThisObject);
    this.editionLanguageService.updateEditionLanguage(this.updateThisObject).subscribe({
      next: (value) => {
        if (this.updateThisObject.languageName == value.languageName) {
          this.response = 'Ответ: ' + value.languageName + ' успешно сохранено';
          this.getAllObject();
          this.enableEditIndex = null;
          this.isFieldEdit = false;
          this.errorCount = 0;
        } else {
          this.response = 'Ответ: ' + value.languageName;
          this.isErrorDataFormat = true;
        }
        if (value.languageId == -2000) {
          this.isErrorDataFormat = false;
          this.response = 'Ответ: ' + value.languageName;
        }
      },
      error: (error) => {
        if (error.status == 401 && this.errorCount<5) {
          this.errorCount++;
          this.updateObject(id);
        }
      }
    })
  }

  deleteObject(id?: number) {
    this.isErrorDataFormat = false;
    console.log('delete:', this.idDelete)
    this.editionLanguageService.deleteEditionLanguage(id).subscribe({
      next: (value) => {
        this.getAllObject();
        this.errorCount = 0;
        this.toast.showSnackBar(value.message);
      },
      error: (error) => {
        if (error.status == 401 && this.errorCount<5) {
          this.errorCount++;
          this.deleteObject(id);
        }
      }
    })

  }

  addObject() {
    this.loadingInProgress = true;
    let obj: EditionLanguage = {
      languageName: this.fieldNewName,
    }
    this.editionLanguageService.createEditionLanguage(obj).subscribe({
      next: (value: EditionLanguage) => {
        this.loadingInProgress = false;
        if (this.fieldNewName == value.languageName) {
          this.response = 'Ответ: ' + value.languageName + '  Успешно добавлен';
          this.getAllObject();
          this.fieldNewName = '';
          this.errorCount = 0;
          this.isErrorDataFormat = false;
        } else {
          this.response = 'Ответ: ' + value.languageName;
          this.isErrorDataFormat = true;
        }
        if (value.languageId == -2000) {
          this.isErrorDataFormat = false;
          this.response = 'Ответ: ' + value.languageName;
        }
      },
      error: (error) => {
        this.loadingInProgress = false;
        if (error.status == 401 && this.errorCount<5) {
          this.errorCount++;
          this.addObject();
        }
      }
    })
  }

  getAllObject() {
    this.editionLanguageService.getAllEditionLanguage().subscribe({
      next: (value) => {
        this.allObject = value;
        this.errorCount = 0;
      },
      error: (error) => {
        if (error.status == 401 && this.errorCount<5) {
          this.errorCount++;
          this.getAllObject();
        }
      }
    })
  }

}
