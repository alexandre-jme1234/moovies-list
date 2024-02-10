import { Injectable } from '@angular/core';
import { Comment } from '../models/comment.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, first, map, tap } from 'rxjs';
import { error } from 'console';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  private comments!: Comment[];

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
    ).pipe(first(), tap((response) => console.log(response)), catchError(() => {throw new Error}))
  }

  // get All Comments by Id Moovie
  public getAllCommentById(idMoovie: string|null) {
    return this.http.get('http://localhost:1337/api/comments', this.authService.getHeaders())
    .pipe(
      tap((response) => console.log(response)),
      map((response: any) => {
        let data = response.data;
        let grCommentByID = data.filter((comment: any) => comment.attributes.id_moovie === idMoovie);
        return grCommentByID;
      }),
    ).subscribe({
      next: (data) => console.log(data),
      error: (err) => console.log(err)
    })
  }
}
