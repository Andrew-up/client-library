import {Component, OnInit} from '@angular/core';
import {BookGenres} from "../../../../models/BookGenres";
import {AgeLimitService} from "../../../../services/age-limit.service";
import {AgeLimit} from "../../../../models/AgeLimit";
import {NotificationService} from "../../../../services/notification.service";

@Component({
  selector: 'app-age-limit-list',
  templateUrl: './age-limit-list.component.html',
  styleUrls: ['./age-limit-list.component.css']
})
export class AgeLimitListComponent implements OnInit {

  constructor(private ageLimitService: AgeLimitService,
              private toast: NotificationService) {
  }

  ageLimit: AgeLimit[] = [{}]
  updateAgeLimit: AgeLimit = {}
  enableEditIndex = null;
  enableEdit = false;
  errorCount = 5;
  errorDataBase = false;
  ageLimitName = '';
  response = '';
  idAgeLimit?: number;

  getAllAgeLimit() {
    this.ageLimitService.getAllAgeLimit().subscribe({
      next: (value) => {
        this.ageLimit = value;
        this.errorCount = 5;
      },
      error: (error) => {
        if (error.status == 401 && this.errorCount != 0) {
          this.errorCount--;
          this.getAllAgeLimit();
          // console.log(this.errorCount);
        }
      }
    })
  }

  enableEditMethod(e, i) {
    this.enableEdit = !this.enableEdit;
    this.enableEditIndex = i;
    this.updateAgeLimit.coverCodeName = '';
    console.log('enableEditMethod: ' + i);
    console.log()
  }

  cancel() {
    this.enableEditIndex = null;
    this.enableEdit = false;
  }

  saveAgeLimit(id) {
    this.errorDataBase = false;
    this.updateAgeLimit.ageLimitId = id;
    console.log(this.updateAgeLimit);
    this.ageLimitService.updateAgeLimit(this.updateAgeLimit).subscribe({
      next: (value) => {
        if (this.updateAgeLimit.coverCodeName == value.coverCodeName) {
          this.response = 'Ответ: ' + value.coverCodeName + ' успешно сохранено';
          this.getAllAgeLimit();
          this.enableEditIndex = null;
          this.enableEdit = false;
          this.errorCount = 5;
        } else {
          this.response = 'Ответ: ' + value.coverCodeName;
          this.errorDataBase = true;
        }
        if (value.ageLimitId == -2000) {
          this.errorDataBase = false;
          this.response = 'Ответ: ' + value.coverCodeName;
        }
      },
      error: (err) => {
        if (err.status == 401 && this.errorCount != 0) {
          this.errorCount--;
          this.saveAgeLimit(id);
        }
      }
    })
  }



  idClickAgeLimit(id?: number) {
    this.idAgeLimit = id;
  }

  deleteAgeLimit(id?: number) {
    this.errorDataBase = false;
    console.log('delete:', this.idAgeLimit)
    this.ageLimitService.deleteAgeLimit(id).subscribe({
      next: (value) => {
        this.getAllAgeLimit();
        this.errorCount = 5;
        this.toast.showSnackBar(value.message);
      },
      error: (error) => {
        if (error.status == 401 && this.errorCount != 0) {
          this.errorCount--;
          this.deleteAgeLimit(id);
        }
      }
    })

  }


  addAgeLimit() {
    let obj: AgeLimit = {
      coverCodeName: this.ageLimitName,
    }

    this.ageLimitService.createAgeLimit(obj).subscribe({
      next: (value: AgeLimit) => {
        if (this.ageLimitName == value.coverCodeName) {
          this.response = 'Ответ: ' + value.coverCodeName + '  Успешно добавлен';
          this.getAllAgeLimit();
          this.ageLimitName = '';
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
          this.addAgeLimit();
        }
      }
    })
  }

  ngOnInit(): void {
    this.getAllAgeLimit();
  }


}
