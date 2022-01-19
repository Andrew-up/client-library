import {Component, OnInit} from '@angular/core';
import {AuthorsService} from "../../../services/authors.service";
import {Author} from "../../../models/Author";

@Component({
  selector: 'app-create-authors',
  templateUrl: './create-authors.component.html',
  styleUrls: ['./create-authors.component.css', '../../common_styles.css']
})
export class CreateAuthorsComponent implements OnInit {

  constructor(private authorsService: AuthorsService) {
  }

  ngOnInit(): void {
  }

  firstname = '';
  lastname = '';
  patronymic = '';
  dateOfBirth = '';

  response ='';

  createAuthor() {
    let obj: Author = {
      firstname: this.firstname,
      lastname: this.lastname,
      patronymic: this.patronymic,
      dateOfBirth: this.dateOfBirth,
    }
    this.authorsService.createAuthor(obj).subscribe({
      next:(res:Author)=>{
        console.log(res);
        this.response ='Ответ:  ';
        this.response = this.response+ res.firstname;
        if(this.firstname==res.firstname){
          this.response = this.response+ res.firstname+'  Успешно добавлен!';
        }
      }
    })
  }

}
