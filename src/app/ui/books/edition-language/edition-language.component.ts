import {Component, OnInit} from '@angular/core';
import {EditionLanguage} from "../../../models/EditionLanguage";
import {EditionLanguageService} from "../../../services/edition-language.service";
import {Translation} from "../../../models/Translation";

@Component({
  selector: 'app-edition-language',
  templateUrl: './edition-language.component.html',
  styleUrls: ['./edition-language.component.css', '../../common_styles.css']
})
export class EditionLanguageComponent implements OnInit {
  editionLanguageName = '';
  response = 'Ответ: ';

  constructor(private editionService:EditionLanguageService) {
  }

  ngOnInit(): void {
  }

  createEditionLanguage() {
    let obj: EditionLanguage = {
      languageName: this.editionLanguageName,
    }

    this.editionService.editionLanguageCreate(obj).subscribe({
      next:(res:EditionLanguage)=>{
        this.response = 'Ответ: ';
        this.response+= res.languageName+' ';
        if(this.editionLanguageName == res.languageName){
          this.response ='Ответ: '
          this.response = this.response + res.languageName+ '  Успешно добавлен';
        }
      }
    })

  }

}
