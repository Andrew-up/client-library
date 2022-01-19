import {Component, OnInit} from '@angular/core';
import {PublisherService} from "../../../services/publisher.service";
import {Publisher} from "../../../models/Publisher";

@Component({
  selector: 'app-publishing-house',
  templateUrl: './publishing-house.component.html',
  styleUrls: ['./publishing-house.component.css', '../../common_styles.css']
})
export class PublishingHouseComponent implements OnInit {

  constructor(private publisherService: PublisherService) {
  }

  publisherName = '';
  response = 'Ответ: ';

  ngOnInit(): void {
  }

  createPublisher() {
    let obj: Publisher = {
      publisherName: this.publisherName,
    }
    this.publisherService.createPublisher(obj).subscribe({
      next: (res: Publisher) => {
        console.log(res);
        this.response = 'Ответ: ';
        this.response += res.publisherName+' ';
        if (this.publisherName == res.publisherName) {
          this.response = 'Ответ: ';
          this.response = this.response + res.publisherName + ' Успешно добавлен';
        }
      }
    })
  }

}
