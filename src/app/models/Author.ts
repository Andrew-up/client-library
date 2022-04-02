export interface Author{
  id?:string|undefined|null;
  authorsId?:number;
  firstname?:string;
  lastname?: string;
  patronymic?: string;
  dateOfBirth?: string;
  authorsFullName?:string;
}
