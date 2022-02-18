import { Component, OnInit } from '@angular/core';
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

  constructor(private ageLimitService:AgeLimitService,
              private toast:NotificationService) { }
  ageLimit: AgeLimit[] = [{}]
  updateAgeLimit: AgeLimit = {}
  enableEditIndex = null;
  enableEdit = false;
  errorCount = 5;

  getAllAgeLimit() {
    this.ageLimitService.getAllAgeLimit().subscribe({
      next:(value)=>{
        this.ageLimit = value;
        this.errorCount =5;
      },
      error:(error)=>{
        if (error.status==401 && this.errorCount!=0){
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
    this.updateAgeLimit.ageLimitName = '';
    console.log('enableEditMethod: '+i);
    console.log()
  }

  cancel() {
    this.enableEditIndex = null;
    this.enableEdit = false;
  }

  saveAgeLimit(id) {
    this.updateAgeLimit.ageLimitId = id;
    console.log(this.updateAgeLimit);
    this.ageLimitService.updateAgeLimit(this.updateAgeLimit).subscribe({
      next: (value) => {
        this.getAllAgeLimit();
        this.enableEditIndex = null;
        this.enableEdit = false;
        // console.log(value)
        this.errorCount =5;
      },
      error: (err) => {
        if (err.status==401 && this.errorCount!=0){
          this.errorCount--;
          this.saveAgeLimit(id);
          // console.log(this.errorCount);
        }
      }
    })
  }

  idAgeLimit?: number;

  idClickAgeLimit(id?:number) {
    this.idAgeLimit = id;
  }

  deleteAgeLimit(id?: number) {

      console.log('delete:',this.idAgeLimit)
      this.ageLimitService.deleteAgeLimit(id).subscribe({
        next: (value) => {
          // console.log('v: ' + value.message)
          this.getAllAgeLimit();
          this.errorCount =5;
          this.toast.showSnackBar(value.message);
        },
        error: (error) => {
          if (error.status==401 && this.errorCount!=0){
            this.errorCount--;
            this.deleteAgeLimit(id);
            // console.log(this.errorCount);
          }
        }
      })


    // console.log('id:' + id);
  }

  ageLimitName = '';
  response = '';

  addAgeLimit() {
    let obj: AgeLimit = {
      ageLimitName: this.ageLimitName,
    }

    this.ageLimitService.createAgeLimit(obj).subscribe({
      next: (res: AgeLimit) => {
        console.log(res);
        this.response = 'Ответ: '
        if (this.ageLimitName == res.ageLimitName) {
          this.response = this.response + res.ageLimitName + '  Успешно добавлен';
          this.getAllAgeLimit();
          this.ageLimitName = '';
          this.errorCount =5;
        }
        else {
          this.response += res.ageLimitName;
        }
      },
      error:(error)=>{
        if (error.status==401 && this.errorCount!=0){
          this.errorCount--;
          this.addAgeLimit();
          // console.log(this.errorCount);
        }
      }
    })
  }

  ngOnInit(): void {
    this.getAllAgeLimit();
  }


}
