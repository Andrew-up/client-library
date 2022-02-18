import { Component, OnInit } from '@angular/core';
import {AgeLimitService} from "../../../../services/age-limit.service";
import {AgeLimit} from "../../../../models/AgeLimit";

@Component({
  selector: 'app-create-limit-age',
  templateUrl: './create-limit-age.component.html',
  styleUrls: ['./create-limit-age.component.css','../../../common_styles.css']
})
export class CreateLimitAgeComponent implements OnInit {

  constructor(private ageLimitService:AgeLimitService) { }

  ngOnInit(): void {
  }
  ageLimitName='';
  response ='';
  createAgeLimit(){
    let obj:AgeLimit ={
      ageLimitName:this.ageLimitName,
    }
    this.ageLimitService.createAgeLimit(obj).subscribe({
      next:(res:AgeLimit)=>{
        console.log(res);
        this.response ='Ответ:  ';
        if(this.ageLimitName==res.ageLimitName){
          this.response = this.response+ res.ageLimitName+'  Успешно добавлен!';
        }
      }
    })
  }

}
