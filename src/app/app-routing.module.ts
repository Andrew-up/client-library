import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {BooksComponent} from "./ui/books/books-list/books.component";
import {CreateBookComponent} from "./ui/books/create-book/create-book.component";
import {PromocodeComponent} from "./ui/users/promocode/promocode.component";
import {CreateAuthorsComponent} from "./ui/books/create-authors/create-authors.component";
import {CreateGenreBookComponent} from "./ui/books/create-genre-book/create-genre-book.component";
import {IndexComponent} from "./ui/index/index.component";
import {CreateLimitAgeComponent} from "./ui/books/create-limit-age/create-limit-age.component";
import {PublishingHouseComponent} from "./ui/books/publishing-house/publishing-house.component";
import {CreateSeriesBookComponent} from "./ui/books/create-series-book/create-series-book.component";
import {CoverTypesComponent} from "./ui/books/cover-types/cover-types.component";
import {CreateTranslationBookComponent} from "./ui/books/create-translation-book/create-translation-book.component";
import {EditionLanguageComponent} from "./ui/books/edition-language/edition-language.component";
import {ListUsersComponent} from "./ui/users/list-users/list-users.component";

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'books-list',component:BooksComponent},
  {path:'create-book',component:CreateBookComponent},
  {path:'promo_code',component:PromocodeComponent},
  {path:'create-authors',component:CreateAuthorsComponent},
  {path:'book/genre',component:CreateGenreBookComponent},
  {path:'index',component:IndexComponent},
  {path:'book/age-limit',component:CreateLimitAgeComponent},
  {path:'book/publisher',component:PublishingHouseComponent},
  {path:'book/series',component:CreateSeriesBookComponent},
  {path:'book/cover-type',component:CoverTypesComponent},
  {path:'book/translation',component:CreateTranslationBookComponent},
  {path:'book/edition-language',component:EditionLanguageComponent},
  {path:'user/user-list',component:ListUsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
