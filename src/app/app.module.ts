import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from "./material-module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {authInterceptorProviders} from "./helper/auth-interceptor.service";
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {BooksComponent} from './ui/books/books-list/books.component';
import {CommonModule, DatePipe} from "@angular/common";
import {ProfileComponent} from './ui/users/profile/profile.component';
import {ListUsersComponent} from './ui/users/list-users/list-users.component';
import {CreateBookComponent} from './ui/books/create-book/create-book.component';
import {EditBookComponent} from './ui/books/edit-book/edit-book.component';
import {CreateAuthorsComponent} from './ui/books/create-authors/create-authors.component';
import {EditAuthorsComponent} from './ui/books/edit-authors/edit-authors.component';
import {RentComponent} from './ui/books/rent-list/rent.component';
import {CoverTypesComponent} from './ui/books/cover-types/cover-types.component';
import {PublishingHouseComponent} from './ui/books/publishing-house/publishing-house.component';
import {MyBooksComponent} from './ui/users/my-books/my-books.component';
import {EditStatusUserComponent} from './ui/users/edit-status-user/edit-status-user.component';
import {MatListModule} from "@angular/material/list";
import {PromocodeComponent} from './ui/users/promocode/promocode.component';
import {authErrorInterceptorProviders} from "./helper/error-interceptor.service";
import {IndexComponent} from './ui/index/index.component';
import {EditionLanguageComponent} from './ui/books/edition-language/edition-language.component';
import {AddRentToUserComponent} from './ui/books/add-rent-to-user/add-rent-to-user.component';
import {PriceRentComponent} from "./ui/books/price-rent/price-rent.component";
import {GenreListComponent} from './ui/books/genre/genre-list/genre-list.component';
import {CommonGenreComponent} from './ui/books/genre/common-genre/common-genre.component';
import {CommonAgeLimitComponent} from './ui/books/age-limit/common-age-limit/common-age-limit.component';
import {AgeLimitListComponent} from './ui/books/age-limit/age-limit-list/age-limit-list.component';
import {TranslationComponent} from './ui/books/translation/translation.component';
import { SeriesBookComponent } from './ui/books/series-book/series-book.component';
import { TopMenuComponent } from './ui/menu/top-menu/top-menu.component';
import { FooterComponent } from './ui/menu/footer/footer.component';
import {Ng2SearchPipeModule} from "ng2-search-filter";
import {NgPipesModule} from "ngx-pipes";
import { BasketComponent } from './ui/users/basket/basket.component';
import { RentalRequestUsersComponent } from './ui/books/rental-request-users/rental-request-users.component';
import { MyRentBooksComponent } from './ui/users/my-rent-books/my-rent-books.component';
import {MatRadioModule} from "@angular/material/radio";
import { Error404Component } from './ui/common/error404/error404.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import { AuthorsComponent } from './ui/books/authors/authors.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    BooksComponent,
    ProfileComponent,
    ListUsersComponent,
    CreateBookComponent,
    EditBookComponent,
    CreateAuthorsComponent,
    EditAuthorsComponent,
    RentComponent,
    CoverTypesComponent,
    PublishingHouseComponent,
    MyBooksComponent,
    EditStatusUserComponent,
    PromocodeComponent,
    IndexComponent,
    EditionLanguageComponent,
    AddRentToUserComponent,
    PriceRentComponent,
    GenreListComponent,
    CommonGenreComponent,
    CommonAgeLimitComponent,
    AgeLimitListComponent,
    TranslationComponent,
    SeriesBookComponent,
    TopMenuComponent,
    FooterComponent,
    BasketComponent,
    RentalRequestUsersComponent,
    MyRentBooksComponent,
    Error404Component,
    AuthorsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    CommonModule,
    MatListModule,
    Ng2SearchPipeModule,
    FormsModule,
    NgPipesModule,
    MatRadioModule,
    MatPaginatorModule,

  ],
  exports: [AppComponent],
  providers: [authInterceptorProviders,
              authErrorInterceptorProviders,
              DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
