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
import {CommonModule} from "@angular/common";
import {ProfileComponent} from './ui/users/profile/profile.component';
import {ListUsersComponent} from './ui/users/list-users/list-users.component';
import {CreateBookComponent} from './ui/books/create-book/create-book.component';
import {EditBookComponent} from './ui/books/edit-book/edit-book.component';
import {CreateAuthorsComponent} from './ui/books/create-authors/create-authors.component';
import {EditAuthorsComponent} from './ui/books/edit-authors/edit-authors.component';
import {CreateSeriesBookComponent} from './ui/books/create-series-book/create-series-book.component';
import {CreateLimitAgeComponent} from './ui/books/age-limit/create-limit-age/create-limit-age.component';
import {CreateTranslationBookComponent} from './ui/books/create-translation-book/create-translation-book.component';
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
import {CreatePriceComponent} from "./ui/books/create-price/create-price.component";
import {GenreListComponent} from './ui/books/genre/genre-list/genre-list.component';
import {CommonGenreComponent} from './ui/books/genre/common-genre/common-genre.component';
import {CommonAgeLimitComponent} from './ui/books/age-limit/common-age-limit/common-age-limit.component';
import {AgeLimitListComponent} from './ui/books/age-limit/age-limit-list/age-limit-list.component';


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
    CreateSeriesBookComponent,
    CreateLimitAgeComponent,
    CreateTranslationBookComponent,
    RentComponent,
    CoverTypesComponent,
    PublishingHouseComponent,
    MyBooksComponent,
    EditStatusUserComponent,
    PromocodeComponent,
    IndexComponent,
    EditionLanguageComponent,
    AddRentToUserComponent,
    CreatePriceComponent,
    GenreListComponent,
    CommonGenreComponent,
    CommonAgeLimitComponent,
    AgeLimitListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    CommonModule,
    MatListModule
  ],
  exports: [AppComponent],
  providers: [authInterceptorProviders,
              authErrorInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {
}
