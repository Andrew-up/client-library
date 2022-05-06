import {Component, OnInit} from '@angular/core';
import {RentBook} from "../../../models/RentBook";
import {RentService} from "../../../services/rent.service";
import {DatePipe} from "@angular/common";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {

  constructor(private rentService: RentService,
              private datePipe: DatePipe,
              private toast:NotificationService) {
  }

  isDataLoaded:boolean=false;
  rent: RentBook[] = [{}]
  deleteRentObj: RentBook={dateIssue:'2022-04-07',priceName:'0'};

  getAllRent() {
    this.rentService.getAllRent().subscribe(res => {
      this.rent = res;
      console.log(res);
      this.isDataLoaded = true;
    })
  }

  ngOnInit(): void {
    this.getAllRent();
  }


  saveObjDeleteRent(item) {
    this.deleteRentObj = item;
  }

  deleteRent(){
    this.rentService.deleteRent(this.deleteRentObj.id).subscribe(res => {
      console.log(res);
      this.getAllRent();
      this.toast.showSnackBar(res.message);
    })
  }

  summaPriceToday(item, price): number {

    let dateIssue = this.datePipe.transform(item, 'MM-dd-YYYY')?.toString();
    console.log(dateIssue);
    var date1 = new Date();
    var date2;
    if (dateIssue != undefined) {
      date2 = new Date(dateIssue);
    }
    var daysLag = Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24)-1);
    let zzz = Math.round(price / 30 * daysLag);
    return zzz;
  }

}
