import {Author} from "./Author";

export interface Series{
  //Обложка
  seriesId?:number;
  seriesName?:string;
  authorsId?:number;
  authors?:Author;
}
