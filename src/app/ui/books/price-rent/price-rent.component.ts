import {Component, OnInit} from '@angular/core';
import {PriceRentService} from "../../../services/price-rent.service";
import {Price} from "../../../models/Price";
import {CoverTypeService} from "../../../services/cover-type.service";
import {NotificationService} from "../../../services/notification.service";
import {CoverCode} from "../../../models/CoverCode";

@Component({
  selector: 'app-price-rent',
  templateUrl: './price-rent.component.html',
  styleUrls: ['./price-rent.component.css', '../../common_styles.css']
})
export class PriceRentComponent implements OnInit {

  constructor(private rentPriceService: PriceRentService,
              private toast: NotificationService) {
  }

  allObject: Price[] = [{}]
  updateThisObject: Price = {}
  response = 'Ответ: ';
  enableEditIndex = null;
  fieldNewName?:string="";
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
    this.updateThisObject.priceName = '';
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
    this.updateThisObject.id = id;
    console.log(this.updateThisObject);
    this.rentPriceService.updatePriceRent(this.updateThisObject).subscribe({
      next: (value) => {
        if (this.updateThisObject.priceName == value.priceName) {
          this.response = 'Ответ: ' + value.priceName + ' успешно сохранено';
          this.getAllObject();
          this.enableEditIndex = null;
          this.isFieldEdit = false;

        } else {
          this.response = 'Ответ: ' + value.priceName;
          this.isErrorDataFormat = true;
        }
        if (value.id == -2000) {
          this.isErrorDataFormat = false;
          this.response = 'Ответ: ' + value.priceName;
        }
      },
      error: (error) => {

      }
    })
  }

  deleteObject(id?: number) {
    this.isErrorDataFormat = false;
    console.log('delete:', this.idDelete)
    this.rentPriceService.deletePriceRent(id).subscribe({
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
    let obj: Price = {
      priceName: this.fieldNewName+'',
    }
    this.rentPriceService.createPriceRent(obj).subscribe({
      next: (value) => {
        this.loadingInProgress = false;
        if (obj.priceName == value.message) {
          this.response = 'Ответ: ' + value.message + ' Успешно добавлено';
          this.getAllObject();
          this.fieldNewName = '';

          this.isErrorDataFormat = false;
        } else {
          this.response = 'Ответ: ' + value.message;
          this.isErrorDataFormat = true;
        }
        if (value.message == -2000) {
          this.isErrorDataFormat = false;
          this.response = 'Ответ: Ошибка при добавлении в базу данных, такая запись уже есть';
        }
      },
      error: (error) => {
        this.loadingInProgress = false;
      },
      complete:()=>{

    }
    })
  }

  getAllObject() {
    this.rentPriceService.getAllPriceRent().subscribe({
      next: (value) => {
        this.allObject = value;

      },
      error: (error) => {

      }
    })
  }

}
