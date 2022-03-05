import {Component, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {TokenStorageService} from "./services/token-storage.service";
import {ErrorInterceptorService} from "./helper/error-interceptor.service";
import {BooksService} from "./services/books.service";
import {Book} from "./models/Book";
import {ImageService} from "./services/image.service";
import {Router} from "@angular/router";
import {UserService} from "./services/user.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent{

  title = 'client';
  constructor() {}


}
