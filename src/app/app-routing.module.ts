import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {BooksComponent} from "./ui/books/books-list/books.component";
import {CreateBookComponent} from "./ui/books/create-book/create-book.component";
import {CreateAuthorsComponent} from "./ui/books/create-authors/create-authors.component";
import {IndexComponent} from "./ui/index/index.component";
import {PublishingHouseComponent} from "./ui/books/publishing-house/publishing-house.component";

import {CoverTypesComponent} from "./ui/books/cover-types/cover-types.component";
import {EditionLanguageComponent} from "./ui/books/edition-language/edition-language.component";
import {ListUsersComponent} from "./ui/users/list-users/list-users.component";
import {RentComponent} from "./ui/books/rent-list/rent.component";
import {AddRentToUserComponent} from "./ui/books/add-rent-to-user/add-rent-to-user.component";
import {PriceRentComponent} from "./ui/books/price-rent/price-rent.component";
import {GenreListComponent} from "./ui/books/genre/genre-list/genre-list.component";
import {CommonGenreComponent} from "./ui/books/genre/common-genre/common-genre.component";
import {CommonAgeLimitComponent} from "./ui/books/age-limit/common-age-limit/common-age-limit.component";
import {AgeLimitListComponent} from "./ui/books/age-limit/age-limit-list/age-limit-list.component";
import {ProfileComponent} from "./ui/users/profile/profile.component";
import {TranslationComponent} from "./ui/books/translation/translation.component";
import {SeriesBookComponent} from "./ui/books/series-book/series-book.component";
import {BasketComponent} from "./ui/users/basket/basket.component";
import {RentalRequestUsersComponent} from "./ui/books/rental-request-users/rental-request-users.component";
import {MyRentBooksComponent} from "./ui/users/my-rent-books/my-rent-books.component";
import {AuthenticationGuard} from "./guards/authentication.guard";
import {Error404Component} from "./ui/common/error404/error404.component";
import {WorkerGuard} from "./guards/worker.guard";
import {AdminGuard} from "./guards/admin.guard";
import {AuthorsComponent} from "./ui/books/authors/authors.component";

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'books-list',component:BooksComponent},
  {path:'create-book',component:CreateBookComponent,
    canActivate:[WorkerGuard]},
  {path:'create-authors',component:CreateAuthorsComponent,
    canActivate:[WorkerGuard]},
  {path:'index',component:IndexComponent},
  {path:'book/publisher',component:PublishingHouseComponent,
    canActivate:[WorkerGuard]},
  {path:'book/series',component:SeriesBookComponent,
    canActivate:[WorkerGuard]},
  {path:'book/cover-type',component:CoverTypesComponent,
    canActivate:[WorkerGuard]},
  {path:'book/translation',component:TranslationComponent,
    canActivate:[WorkerGuard]},

  {path:'book/edition-language',component:EditionLanguageComponent,
                                canActivate:[WorkerGuard]},
  {path:'user/user-list',component:ListUsersComponent,
                         canActivate:[AdminGuard]},
  {path:'book/rent',component:RentComponent,
    canActivate:[WorkerGuard]},
  {path:'book/rent-add',component:AddRentToUserComponent,
    canActivate:[WorkerGuard]},
  {path:'book/price-rent',component:PriceRentComponent,
    canActivate:[WorkerGuard]},
  {path:'book/genre',component:CommonGenreComponent,
  children:[
    {path:'list',component:GenreListComponent}
  ],               canActivate:[WorkerGuard]},
  {path:'book/age-limit',component:CommonAgeLimitComponent,
  children:[
    {path:'list',component: AgeLimitListComponent,
                  canActivate: [AuthenticationGuard]}
  ]
  },
  {path:'profile',component:ProfileComponent,
                  canActivate: [AuthenticationGuard]},
  {path:'basket',component:BasketComponent,
                  canActivate: [AuthenticationGuard]},
  {path:'book/rental-request-users',component:RentalRequestUsersComponent,
                  canActivate: [AuthenticationGuard]},
  {path:'my-rent-books',component:MyRentBooksComponent,
                  canActivate: [AuthenticationGuard]},
  {path:'authors',component:AuthorsComponent},
  {path:'404',component:Error404Component},
  {path:'',component:IndexComponent},
  {path:'**',component:Error404Component},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
