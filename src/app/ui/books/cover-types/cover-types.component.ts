import {Component, OnInit} from '@angular/core';
import {CoverTypeService} from "../../../services/cover-type.service";
import {CoverCode} from "../../../models/CoverCode";

@Component({
  selector: 'app-cover-types',
  templateUrl: './cover-types.component.html',
  styleUrls: ['./cover-types.component.css','../../common_styles.css']
})
export class CoverTypesComponent implements OnInit {

  constructor(private coverType: CoverTypeService) {
  }

  coverTypeName = '';
  response = 'Ответ: ';

  ngOnInit(): void {
  }

  createCoverType() {
    let obj: CoverCode ={
      coverCodeName:this.coverTypeName,
    }
    this.coverType.createCoverType(obj).subscribe({
      next:(res:CoverCode)=>{
        console.log(res);
        this.response = 'Ответ: ';
        this.response += res.coverCodeName+' ';
        if (this.coverTypeName == res.coverCodeName) {
          this.response = 'Ответ: ';
          this.response = this.response + res.coverCodeName + ' Успешно добавлен';
        }
      }
    })
  }

}
