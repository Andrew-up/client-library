import {Component, OnInit} from '@angular/core';
import {PublisherService} from "../../../services/publisher.service";
import {Publisher} from "../../../models/Publisher";
import {CoverTypeService} from "../../../services/cover-type.service";
import {NotificationService} from "../../../services/notification.service";
import {CoverCode} from "../../../models/CoverCode";

@Component({
  selector: 'app-publishing-house',
  templateUrl: './publishing-house.component.html',
  styleUrls: ['./publishing-house.component.css', '../../common_styles.css']
})
export class PublishingHouseComponent implements OnInit {

  constructor(private publisherHouseService: PublisherService,
              private toast: NotificationService) {
  }

  allObject: Publisher[] = [{}]
  updateThisObject: Publisher = {}
  response = 'Ответ: ';
  enableEditIndex = null;
  fieldNewName = '';
  isFieldEdit = false;
  idDelete?: number;
  isErrorDataFormat = false;

  loadingInProgress = false;

  ngOnInit(): void {
    this.getAllObject();
  }

  enableEditMethod(e, i) {
    this.isFieldEdit = !this.isFieldEdit;
    this.enableEditIndex = i;
    this.updateThisObject.publisherName = '';
  }

  cancel() {
    this.enableEditIndex = null;
    this.isFieldEdit = false;
  }

  rememberIdDelete(id?: number) {
    this.idDelete = id;
  }

  updateObject(id) {
    this.isErrorDataFormat = false;
    this.updateThisObject.publisherId = id;
    console.log(this.updateThisObject);
    this.publisherHouseService.updatePublisher(this.updateThisObject).subscribe({
      next: (value) => {
        if (this.updateThisObject.publisherName == value.publisherName) {
          this.response = 'Ответ: ' + value.publisherName + ' успешно сохранено';
          this.getAllObject();
          this.enableEditIndex = null;
          this.isFieldEdit = false;

        } else {
          this.response = 'Ответ: ' + value.publisherName;
          this.isErrorDataFormat = true;
        }
        if (value.publisherId == -2000) {
          this.isErrorDataFormat = false;
          this.response = 'Ответ: ' + value.publisherName;
        }
      },
      error: (error) => {

      }
    })
  }

  deleteObject(id?: number) {
    this.isErrorDataFormat = false;
    console.log('delete:', this.idDelete)
    this.publisherHouseService.deletePublisher(id).subscribe({
      next: (value) => {
        this.getAllObject();

        this.toast.showSnackBar(value.message);
      },
      error: (error) => {

      }
    })

  }

  addObject() {
    this.loadingInProgress = true;
    let obj: Publisher = {
      publisherName: this.fieldNewName,
    }
    this.publisherHouseService.createPublisher(obj).subscribe({
      next: (value: Publisher) => {
        this.loadingInProgress = false;
        if (this.fieldNewName == value.publisherName) {
          this.response = 'Ответ: ' + value.publisherName + '  Успешно добавлен';
          this.getAllObject();
          this.fieldNewName = '';

          this.isErrorDataFormat = false;
        } else {
          this.response = 'Ответ: ' + value.publisherName;
          this.isErrorDataFormat = true;
        }
        if (value.publisherId == -2000) {
          this.isErrorDataFormat = false;
          this.response = 'Ответ: ' + value.publisherName;
        }
      },
      error: (error) => {
        this.loadingInProgress = false;
      }
    })
  }

  getAllObject() {
    this.publisherHouseService.getAllPublisher().subscribe({
      next: (value) => {
        this.allObject = value;

      },
      error: (error) => {
      }
    })
  }

}
