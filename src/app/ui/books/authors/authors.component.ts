import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthorsService} from "../../../services/authors.service";
import {Author} from "../../../models/Author";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {

  constructor(private authorsService: AuthorsService) {
  }


  response:string=' ';

  submitForm(form: NgForm) {
    let obj: Author = {
      firstname: form.value.firstname,
      lastname: form.value.lastname,
      patronymic: form.value.patronymic,
      dateOfBirth: form.value.dateOfBirth,
    }
    console.log(form);
    this.authorsService.createAuthor(obj).subscribe({
      next:(res:Author)=>{
        console.log(res);
        this.response ='Ответ:  ';
        if(form.value.firstname==res.firstname){
          this.response = this.response+ res.firstname+'  Успешно добавлен!';
        }
      }
    })
  }

  ngOnInit(): void {
  }


}
