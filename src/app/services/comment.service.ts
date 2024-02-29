import { Injectable } from '@angular/core';
import { Comment } from '../models/comment.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { BehaviorSubject, catchError, first, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  public comments!: Comment[];
  private commentSubject: BehaviorSubject<any[]> = new BehaviorSubject<Comment[]>([]);
  public testComment: any = {}
  public id_moovie: any = ''
  public mergedObject: any = {}
  
  
  public getCommentsSubjects() {
  return this.commentSubject.asObservable();
  }

  public AddComment(comment: Comment | undefined) {
    let commentFormated = {
      "data":{
        "identifier": comment!.identifier,
        "title": comment!.title,
        "comment_body": comment!.comment_body,
        "id_moovie": comment!.id_moovie
      }
    }

    return this.http.post('http://localhost:1337/api/comments', commentFormated,
    this.authService.getHeaders()
    ).pipe(
    first(), 
    tap((response) => console.log('add af map', response)),
    catchError(() => {throw new Error})).subscribe({
      next: (data: any)  => {
        console.log('new comment', data.data.attributes.id_moovie)
        this.commentSubject.next(data.data.attributes)
        this.testComment = data;
        this.id_moovie = data.data.attributes.id_moovie
        /* this.getAllCommentById(''+this.id_moovie).subscribe({
          next: (data) => {
            // store les comments avant l'init du movie-detail
            this.comments = data
            this.comments = {...this.testComment, ...data}

            console.log('comment at fetch', this.testComment.data)
            console.log('fetch after add', this.comments)
            console.log('test filter', this.mergedObject)
          },
      error: (err) => console.log(err)
        }); */
      }
    })
  }

  // get All Comments by Id Moovie
  public getAllCommentById(idMoovie: string|null) {
    return this.http.get('http://localhost:1337/api/comments', this.authService.getHeaders())
    .pipe(
      // tap((response: any) => console.log(response.data)),
      map((response: any) => {
        let data = response.data;
        let grCommentByID = data.filter((comment: any) => comment.attributes.id_moovie === idMoovie);
        return grCommentByID;
      }),
    )
  }
}
