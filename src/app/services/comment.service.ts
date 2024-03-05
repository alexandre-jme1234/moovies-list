import { Injectable } from '@angular/core';
import { Comment } from '../models/comment.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable, catchError, first, map, tap } from 'rxjs';
import { resolve } from 'path';
import { type } from 'os';
import { StorageService } from './local-service.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient, private authService: AuthService, private localStorage: StorageService) { }

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
        "id_moovie": comment!.id_moovie,
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

  public results!: any;




  public AddCommentTest(comment: any | undefined): Promise<Comment | undefined> {
    let apiUrl = 'http://localhost:1337/api/comments'
    let commentFormated = {
      "data":{
        "identifier": comment!.identifier,
        "title": comment!.title,
        "comment_body": comment!.comment_body,
        "id_moovie": comment!.id_moovie,
        "img_moovie": comment!.img_moovie,
        "img_profil": comment!.img_profil,
        "like": 0
      }
    }
    
    return new Promise((resolve, reject) => {
      this.http.post(apiUrl, commentFormated, this.authService.getHeaders())
      .toPromise()
      .then((res: any) => {
        if(res.data.attributes.comment_body !== "" && res.data.attributes.title !== "") {
          this.results = res.data.attributes.comment_body
          // setTimeout(() => resolve(this.results), 40000)
          console.log('sucess', res.data.attributes)
          resolve(this.results)
        } else {
          reject(new Error('Comment doesnt add'));
        }
        },)
      })
    }

  public dataMoovie!:any;
  public commentsTest: any[] = [];

  async getAllCommentByIdTest(comment: any | undefined) {
    console.log('inAdd', comment)
    let apiUrl = 'http://localhost:1337/api/comments'
    let addComent = await this.AddCommentTest(comment);
    let id_moovie = comment?.id_moovie;
    this.commentsTest.push({...comment})


    let findMoovie = await new Promise((resolve, reject) => {
        this.http.get(apiUrl, this.authService.getHeaders())
          .toPromise()
          .then((res: any) => {
            let data = res.data

            
            this.dataMoovie = data.filter((comment: any) => {
              // this.dataMoovie.push({...comment[i]})
              return comment.attributes.id_moovie === id_moovie
            })
  
              console.log('get comments by idMoovie', this.dataMoovie)
              resolve(this.dataMoovie);
          }, msg => reject(msg));
      })
      return this.dataMoovie;
  }


  // get All Comments by Id Moovie
  async getAllCommentById$(idMoovie: string|null): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(`http://localhost:1337/api/comments?filters[id_moovie][$eq]=${idMoovie}`, this.authService.getHeaders())
      .toPromise()
      .then((res: any) => {
        this.comments = res.data
          resolve(this.comments);
        }, msg => {
          reject(msg);
        })
      })
  }

  async updateComment(id: any, like: number){
    console.log('id comment : '+ id,'like : '+ like)
    if(like <= 0) {
      like = 0
    } else {
      console.log(like)
    }
    let dataTest = {
      "data": {
        "like": [`${like}`]
      }
    }

    return new Promise((resolve, reject) => {
      return this.http.put(`http://localhost:1337/api/comments/${id}`, dataTest)
      .toPromise()
      .then((response: any) => {
      console.log(response),
      resolve(response)},
      (err) => reject(err)
      )
    })
  }

  async sortComment(): Promise<any> {
    return new Promise((resolve, reject) => {
    return this.http.get(`http://localhost:1337/api/comments?sort=like`, this.authService.getHeaders())
    .toPromise()
    .then((response: any) => {
      let topComments = response.data.slice(-3);
      resolve(topComments.reverse());
      },
      (msg) => reject(msg)
    )})
  }

  async getComment(): Promise<any> {
    let  username = this.authService.getUserStored();
    return new Promise((resolve, reject) => {
    return this.http.get(`http://localhost:1337/api/comments?filters[identifier][$eq]=${username?.username}`, this.authService.getHeaders())
    .toPromise()
    .then((response: any) => {
      let data = response.data
      resolve(data);
      },
      (msg) => reject(msg)
    )})
  }
}
