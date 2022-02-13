import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

const IMAGE_API ='http://localhost:8099/api/image/';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private httpClient:HttpClient) {

  }


  uploadImgToProfile(file:File):Observable<any>{
    const  uploadData = new FormData();
    uploadData.append('file',file);
    return this.httpClient.post(IMAGE_API+'/upload',uploadData);
  }

  uploadImgToBook(file:File,id?:number):Observable<any>{
    const  uploadData = new FormData();
    uploadData.append('file',file);
    return this.httpClient.post(IMAGE_API+'book/'+id,uploadData);
  }



  uploadImgToPost(file:File,postId:number):Observable<any>{
    const  uploadData = new FormData();
    uploadData.append('file',file);
    return this.httpClient.post(IMAGE_API+'/'+postId+'/upload',uploadData);
  }
  getUserProfileImg():Observable<any>{
    return this.httpClient.get(IMAGE_API+'/profileImage');
  }

  getBookImg(bookId?:number):Observable<any>{
    return this.httpClient.get(IMAGE_API+'book/'+bookId,{responseType:'blob'});
  }

}
