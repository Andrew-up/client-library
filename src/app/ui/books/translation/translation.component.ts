import { Component, OnInit } from '@angular/core';
import {CoverCode} from "../../../models/CoverCode";
import {CoverTypeService} from "../../../services/cover-type.service";
import {NotificationService} from "../../../services/notification.service";
import {TranslationService} from "../../../services/translation.service";
import {Translation} from "../../../models/Translation";

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.css','../../common_styles.css']
})
export class TranslationComponent implements OnInit {

  constructor(private translationService: TranslationService,
              private toast: NotificationService) {

  }

  allObject: Translation[] = [{}]
  updateThisObject: Translation = {}
  response = 'Ответ: ';
  enableEditIndex = null;
  fieldNewName = '';
  isFieldEdit = false;
  idDelete?: number;
  isErrorDataFormat = false;
  loadingInProgress = false;

  ngOnInit(): void {
    this.getAllObject();
  }

  enableEditMethod(e, i) {
    this.isFieldEdit = !this.isFieldEdit;
    this.enableEditIndex = i;
    this.updateThisObject.translationName = '';
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
    this.updateThisObject.translationId = id;
    console.log(this.updateThisObject);
    this.translationService.updateTranslation(this.updateThisObject).subscribe({
      next: (value) => {
        if (this.updateThisObject.translationName == value.translationName) {
          this.response = 'Ответ: ' + value.translationName + ' успешно сохранено';
          this.getAllObject();
          this.enableEditIndex = null;
          this.isFieldEdit = false;
        } else {
          this.response = 'Ответ: ' + value.translationName;
          this.isErrorDataFormat = true;
        }
        if (value.translationId == -2000) {
          this.isErrorDataFormat = false;
          this.response = 'Ответ: ' + value.translationName;
        }
      },
      error: (error) => {
      }
    })
  }

  deleteObject(id?: number) {
    this.isErrorDataFormat = false;
    console.log('delete:', this.idDelete)
    this.translationService.deleteTranslation(id).subscribe({
      next: (value) => {
        this.getAllObject();

        this.toast.showSnackBar(value.message);
      },
      error: (error) => {

      }
    })

  }

  addObject() {
    this.loadingInProgress = true;
    let obj: Translation = {
      translationName: this.fieldNewName,
    }
    this.translationService.createTranslation(obj).subscribe({
      next: (value: Translation) => {
        this.loadingInProgress = false;
        if (this.fieldNewName == value.translationName) {
          this.response = 'Ответ: ' + value.translationName + '  Успешно добавлен';
          this.getAllObject();
          this.fieldNewName = '';
          this.isErrorDataFormat = false;
        } else {
          this.response = 'Ответ: ' + value.translationName;
          this.isErrorDataFormat = true;
        }
        if (value.translationId == -2000) {
          this.isErrorDataFormat = false;
          this.response = 'Ответ: ' + value.translationName;
        }
      },
      error: (error) => {
        this.loadingInProgress = false;
      }
    })
  }

  getAllObject() {
    this.translationService.getAllTranslation().subscribe({
      next: (value) => {
        this.allObject = value;

      },
      error: (error) => {

      }
    })
  }

}
