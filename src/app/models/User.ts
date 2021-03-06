import {Book} from "./Book";
import {Basket} from "./Basket";

export interface User{
  id?:number;
  username?:string;
  firstname?:string;
  lastname?:string;
  email?:string;
  info?:string;
  name?:string;
  surname?:string;
  role?:string;
  status?:string;
  Role?:string;
  password?:string;
  phone?:string;
  address?:string;
  dateOfBirth?:string;
  imageProfile?:any;
  bookRental:Book[];
  basketUser?:Basket[];
  newRole?:string;
  newStatus?:string;
}
