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


  coverType: CoverCode[] = [{}]
  updateCoverType: CoverCode = {}
  enableEditIndex = null;
  coverTypeName = '';
  enableEdit = false;
  response = 'Ответ: ';
  idBook?: number;
  errorDataBase = false;
  errorCount = 5;

  ngOnInit(): void {
    this.getAllCoverType();
  }

  createCoverType() {
    let obj: CoverCode = {
      coverCodeName: this.coverTypeName,
    }
    this.coverTypeService.createCoverType(obj).subscribe({
      next: (res: CoverCode) => {
        console.log(res);
        this.response = 'Ответ: ';
        this.response += res.coverCodeName + ' ';
        if (this.coverTypeName == res.coverCodeName) {
          this.response = 'Ответ: ';
          this.response = this.response + res.coverCodeName + ' Успешно добавлен';

        }
      }
    })
  }

  enableEditMethod(e, i) {
    this.enableEdit = !this.enableEdit;
    this.enableEditIndex = i;
    this.updateCoverType.coverCodeName = '';
    console.log('enableEditMethod: ' + i);
  }

  cancel() {
    this.enableEditIndex = null;
    this.enableEdit = false;
  }

  idClickAgeLimit(id?: number) {
    this.idBook = id;
  }

  saveCoverBook(id) {
    this.errorDataBase = false;
    this.updateCoverType.coverCodeId = id;
    console.log(this.updateCoverType);
    this.coverTypeService.updateCoverType(this.updateCoverType).subscribe({
      next: (value) => {
        if (this.updateCoverType.coverCodeName == value.coverCodeName) {
          this.response = 'Ответ: ' + value.coverCodeName + ' успешно сохранено';
          this.getAllCoverType();
          this.enableEditIndex = null;
          this.enableEdit = false;
          this.errorCount = 5;
        } else {
          this.response = 'Ответ: ' + value.coverCodeName;
          this.errorDataBase = true;
        }
        if (value.coverCodeId == -2000) {
          this.errorDataBase = false;
          this.response = 'Ответ: ' + value.coverCodeName;
        }
      },
      error: (err) => {
        if (err.status == 401 && this.errorCount != 0) {
          this.errorCount--;
          this.saveCoverBook(id);
        }
      }
    })
  }

  deleteCoverType(id?: number) {
    this.errorDataBase = false;
    console.log('delete:', this.idBook)
    this.coverTypeService.deleteCoverType(id).subscribe({
      next: (value) => {
        this.getAllCoverType();
        this.errorCount = 5;
        this.toast.showSnackBar(value.message);
      },
      error: (error) => {
        if (error.status == 401 && this.errorCount != 0) {
          this.errorCount--;
          this.deleteCoverType(id);
        }
      }
    })

  }

  addBook() {
    let obj: CoverCode = {
      coverCodeName: this.coverTypeName,
    }
    this.coverTypeService.createCoverType(obj).subscribe({
      next: (value: AgeLimit) => {
        if (this.coverTypeName == value.coverCodeName) {
          this.response = 'Ответ: ' + value.coverCodeName + '  Успешно добавлен';
          this.getAllCoverType();
          this.coverTypeName = '';
          this.errorCount = 5;
          this.errorDataBase = false;
        } else {
          this.response = 'Ответ: ' + value.coverCodeName;
          this.errorDataBase = true;
        }
        if (value.ageLimitId == -2000) {
          this.errorDataBase = false;
          this.response = 'Ответ: ' + value.coverCodeName;
        }

      },
      error: (error) => {
        if (error.status == 401 && this.errorCount != 0) {
          this.errorCount++;
          this.addBook();
        }
      }
    })
  }

  getAllCoverType() {
    this.coverTypeService.getAllCoverType().subscribe({
      next: (value) => {
        this.coverType = value;
        this.errorCount = 5;
      },
      error: (error) => {
        if (error.status == 401 && this.errorCount != 0) {
          this.errorCount--;
          this.getAllCoverType();
          // console.log(this.errorCount);
        }
      }
    })
  }

}
