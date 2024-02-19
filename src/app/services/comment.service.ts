import { Injectable } from '@angular/core';
import { Comment } from '../models/comment.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable, catchError, first, map, tap } from 'rxjs';
import { error } from 'console';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  private comments!: Comment[];
  private commentSubject: BehaviorSubject<any[]> = new BehaviorSubject<Comment[]>([]);
  
  
  public getCommentsSubjects() {
  return this.commentSubject.asObservable();
  }

  public AddComment(comment: Comment) {
    let commentFormated = {
      "data":{
        "title": comment.title,
        "comment_body": comment.comment_body,
        "id_moovie": comment.id_moovie
      }
    }

    return this.http.post('http://localhost:1337/api/comments', commentFormated,
    this.authService.getHeaders()
    ).pipe(first(), tap((response) => console.log(response)), catchError(() => {throw new Error})).subscribe({
      next: (data: any)  => {
        console.log('add comment', data.data.attributes)
        this.commentSubject.next(data.data.attributes)
      } 
    })
  }

  // get All Comments by Id Moovie
  public getAllCommentById(idMoovie: string|null) {
    return this.http.get('http://localhost:1337/api/comments', this.authService.getHeaders())
    .pipe(
      tap((response: any) => console.log(response.data)),
      map((response: any) => {
        let data = response.data;
        let grCommentByID = data.filter((comment: any) => comment.attributes.id_moovie === idMoovie);
        return grCommentByID;
      }),
    )
  }
}
