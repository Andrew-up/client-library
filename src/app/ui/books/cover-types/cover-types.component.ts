import {Component, OnInit} from '@angular/core';
import {CoverTypeService} from "../../../services/cover-type.service";
import {CoverCode} from "../../../models/CoverCode";
import {AgeLimit} from "../../../models/AgeLimit";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-cover-types',
  templateUrl: './cover-types.component.html',
  styleUrls: ['./cover-types.component.css', '../../common_styles.css']
})
export class CoverTypesComponent implements OnInit {

  constructor(private coverTypeService: CoverTypeService,
              private toast: NotificationService) {
  }

  allObject: CoverCode[] = [{}]
  updateThisObject: CoverCode = {}
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
    this.updateThisObject.coverBookName = '';
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
    this.updateThisObject.coverBookId = id;
    console.log(this.updateThisObject);
    this.coverTypeService.updateCoverType(this.updateThisObject).subscribe({
      next: (value) => {
        if (this.updateThisObject.coverBookName == value.coverBookName) {
          this.response = 'Ответ: ' + value.coverBookName + ' успешно сохранено';
          this.getAllObject();
          this.enableEditIndex = null;
          this.isFieldEdit = false;
          this.errorCount = 0;
        } else {
          this.response = 'Ответ: ' + value.coverBookName;
          this.isErrorDataFormat = true;
        }
        if (value.coverBookId == -2000) {
          this.isErrorDataFormat = false;
          this.response = 'Ответ: ' + value.coverBookName;
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
    this.coverTypeService.deleteCoverType(id).subscribe({
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
    let obj: CoverCode = {
      coverBookName: this.fieldNewName,
    }
    this.coverTypeService.createCoverType(obj).subscribe({
      next: (value: CoverCode) => {
        this.loadingInProgress = false;
        if (this.fieldNewName == value.coverBookName) {
          this.response = 'Ответ: ' + value.coverBookName + '  Успешно добавлен';
          this.getAllObject();
          this.fieldNewName = '';
          this.errorCount = 0;
          this.isErrorDataFormat = false;
        } else {
          this.response = 'Ответ: ' + value.coverBookName;
          this.isErrorDataFormat = true;
        }
        if (value.coverBookId == -2000) {
          this.isErrorDataFormat = false;
          this.response = 'Ответ: ' + value.coverBookName;
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
    this.coverTypeService.getAllCoverType().subscribe({
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
