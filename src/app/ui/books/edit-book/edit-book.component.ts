import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  @Input() userName: string = "";
  @Input() userAge: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
