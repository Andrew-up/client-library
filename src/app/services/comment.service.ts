import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
const COMMENT_API ='http://localhost:8099/api/image/';
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpclient:HttpClient) { }

  addCommentToPost(postId:number,message:string):Observable<any>{
    return  this.httpclient.post(COMMENT_API+'/'+postId+'/create',{
      message:message
    });
  }
  getCommentForPost(postId:number):Observable<any>{
    return this.httpclient.get(COMMENT_API+'/'+postId+'/all');
  }

  deleteComment(commentId:number):Observable<any>{
    return this.httpclient.post(COMMENT_API+'/'+commentId+'/delete',null);
  }
}
