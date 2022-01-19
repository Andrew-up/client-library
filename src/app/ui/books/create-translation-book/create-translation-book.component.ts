import {Component, OnInit} from '@angular/core';
import {TranslationService} from "../../../services/translation.service";
import {Translation} from "../../../models/Translation";

@Component({
  selector: 'app-create-translation-book',
  templateUrl: './create-translation-book.component.html',
  styleUrls: ['./create-translation-book.component.css', '../../common_styles.css']
})
export class CreateTranslationBookComponent implements OnInit {

  translationName = '';
  response = 'Ответ: ';

  constructor(private translationService: TranslationService) {
  }

  ngOnInit(): void {
  }

  createTranslation() {
    let obj:Translation={
      translationName:this.translationName,
    }
    this.translationService.translationCreate(obj).subscribe({
      next:(res:Translation)=>{
        this.response = 'Ответ: ';
        this.response+= res.translationName+' ';
        if(this.translationName == res.translationName){
          this.response ='Ответ: '
          this.response = this.response + res.translationName+ '  Успешно добавлен';
        }
      }
    })
  }

}
