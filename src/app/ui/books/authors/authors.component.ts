import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, NgForm, NgModel} from "@angular/forms";
import {invalid} from "@angular/compiler/src/render3/view/util";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {


  @ViewChild('authors') form: NgForm | undefined;

  submitFormCreateBoot(form: NgForm) {
    console.log(this.form);

    // console.log(form);
  }


  ngOnInit(): void {
    this.filterObj = this.obj;

  }
  constructor() {

  }

  isClick = false;
  inputText?: string;

  inputTextModel(any: NgModel) {
    this.filter(any.viewModel);
    // console.log(any);
  }

  inputClickEvent(any: Event) {
    this.isClick = !this.isClick;
  }

  invalid(any) {
    console.log(any)
    return true;
  }

  filter(filter) {
    let filterOption = this.obj.filter(x => filter === "" || x.text.includes(filter));
    this.filterObj = filterOption;
    if (filterOption.length === 0) {
      this.isClick = false;
    } else {
      this.isClick = true;
    }
  }



  filterObj = [
    {value: "1", text: "111 - 111"},
  ];

  obj = [
    {value: "1", text: "111 - 111"},
    {value: "2", text: "222 - 222"},
    {value: "3", text: "333 - 333"},
    {value: "4", text: "444 - 444"},
    {value: "5", text: "555 - 555"},
    {value: "6", text: "666 - 666"},
    {value: "7", text: "777 - 777"},
    {value: "8", text: "888 - 888"}
  ];


  testObj(test) {
    this.inputText = test;
    this.filter(test);
    this.isClick = false;
  }





}
