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
  errorDataBase = false;
  ageLimitName = '';
  response = '';
  idAgeLimit?: number;

  getAllAgeLimit() {
    this.ageLimitService.getAllAgeLimit().subscribe({
      next: (value) => {
        this.ageLimit = value;

      },
      error: (error) => {

      }
    })
  }

  enableEditMethod(e, i) {
    this.enableEdit = !this.enableEdit;
    this.enableEditIndex = i;
    this.updateAgeLimit.ageLimitName = '';
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
        if (this.updateAgeLimit.ageLimitName == value.ageLimitName) {
          this.response = 'Ответ: ' + value.ageLimitName + ' успешно сохранено';
          this.getAllAgeLimit();
          this.enableEditIndex = null;
          this.enableEdit = false;

        } else {
          this.response = 'Ответ: ' + value.ageLimitName;
          this.errorDataBase = true;
        }
        if (value.ageLimitId == -2000) {
          this.errorDataBase = false;
          this.response = 'Ответ: ' + value.ageLimitName;
        }
      },
      error: (err) => {

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

        this.toast.showSnackBar(value.message);
      },
      error: (error) => {

      }
    })

  }


  addAgeLimit() {
    let obj: AgeLimit = {
      ageLimitName: this.ageLimitName,
    }

    this.ageLimitService.createAgeLimit(obj).subscribe({
      next: (value: AgeLimit) => {
        if (this.ageLimitName == value.ageLimitName) {
          this.response = 'Ответ: ' + value.ageLimitName + '  Успешно добавлен';
          this.getAllAgeLimit();
          this.ageLimitName = '';

          this.errorDataBase = false;
        } else {
          this.response = 'Ответ: ' + value.ageLimitName;
          this.errorDataBase = true;
        }
        if (value.ageLimitId == -2000) {
          this.errorDataBase = false;
          this.response = 'Ответ: ' + value.ageLimitName;
        }

      },
      error: (error) => {

      }
    })
  }

  ngOnInit(): void {
    this.getAllAgeLimit();
  }


}
