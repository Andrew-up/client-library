import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-just-test',
  templateUrl: './just-test.component.html',
  styleUrls: ['./just-test.component.css']
})
export class JustTestComponent implements OnInit {


  title ='test- title';
  constructor() { }

  ngOnInit(): void {

  }

  inputHandler(value:any){
this.title = value;
  }
  changeTitle(){
    this.title ='TTTTTTTTTTTTTTTT';
  }

}
