import { Component, OnInit } from '@angular/core';
import {SeriesService} from "../../../services/series.service";
import {Series} from "../../../models/Series";

@Component({
  selector: 'app-create-series-book',
  templateUrl: './create-series-book.component.html',
  styleUrls: ['./create-series-book.component.css','../../common_styles.css']
})
export class CreateSeriesBookComponent implements OnInit {

  seriesName = '';
  response = 'Ответ: ';
  constructor(private seriesService: SeriesService) { }

  ngOnInit(): void {
  }

  createSeries(){
    let obj:Series ={
      seriesName:this.seriesName,
    }
    this.seriesService.createSeries(obj).subscribe({
      next:(res:Series)=>{
        console.log(res);
        this.response = 'Ответ: ';
        this.response += res.seriesName +'';
        if(this.seriesName == res.seriesName){
          this.response = 'Ответ: ';
          this.response = this.response + res.seriesName + ' Успешно добавлен';
        }
      }
    })
  }

}
