import { Component, OnInit } from '@angular/core';
import { MooviesService } from '../../services/moovies.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { CommentService } from '../../services/comment.service';
import { CommentComponent } from "../comment/comment.component";
import { User, UserStored } from '../../models/user.model';
import { StorageService } from '../../services/local-service.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-movie-detail',
    standalone: true,
    templateUrl: './movie-detail.component.html',
    styleUrl: './movie-detail.component.scss',
    imports: [
        MatIconModule,
        CommonModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        MatButtonModule,
        RouterModule,
        HttpClientModule,
        CommentComponent
    ]
})
export class MovieDetailComponent implements OnInit {
  public moovies: any = [];
  public moovie: any | undefined = {}
  public poster_path: string | undefined = "";
  public UrlApi = 'https://image.tmdb.org/t/p/w185'
  public commentForm: FormGroup;
  public isEditing: boolean = false;
  private comment!: any|undefined;
  public comments: any[]  = [];
  private userStored!: UserStored | null | undefined;

  constructor(
    private moovieService: MooviesService, 
    private route: ActivatedRoute, 
    private formBuilder: FormBuilder, 
    private commentService: CommentService,
    private router: Router,
    private storageService: StorageService,
    private authService: AuthService
    ) {
    this.commentForm = this.createForm();
    this.userStored = this.authService.getUserStored();

    this.moovieService.currentMoovies$.subscribe({
      next: async (data) => {
        const movieId: string | null = this.route.snapshot.paramMap.get('id');
        if(data.length === 0 && movieId) {
          let result: any = await this.moovieService.fetchMoovie$();
          this.moovie = result.find((idMoovie: any) => idMoovie.id === +movieId);
          this.poster_path = `${this.UrlApi}${this.moovie.poster_path}`
          return this.moovie;
        } else {
          this.moovies = data;
          if (movieId) {
            this.moovie = this.moovies.find((idMoovie: any) => idMoovie.id === +movieId);
            this.poster_path = `${this.UrlApi}${this.moovie.poster_path}`
              return this.moovie;
            } else {
              console.log('error', this.moovies)
              this.moovie = undefined
            }
        }
      }
    })
  };

  async ngOnInit() {
    try {
      this.comments = await this.commentService.getAllCommentById$(this.route.snapshot.paramMap.get('id'));
      console.log(this.comments)
    } catch {
      console.error('Pas de commentaire')
    }
  }


  private createForm() {
    return (this.commentForm = this.formBuilder.group({
      id: [0, []],
      title: ['', []],
      comment_body: ['', []]
    })
    )
  }

  get localStorage() {
    return this.storageService
  }

  public toggleEdition(): void {
    this.isEditing = !this.isEditing
  }

  
  async editComment(): Promise<any> {
    const val = this.commentForm.value;
    console.log(this.userStored)
    this.comment = {
      identifier: ''+this.userStored!.username,
      title: val.title,
      comment_body: val.comment_body,
      id_moovie: ''+this.moovie.id,
      img_moovie: this.poster_path,
      img_profil : ''+this.userStored!.profil_img,
      like: 0
    };
    console.log('bf send', this.comment)
    this.comments = await this.commentService.getAllCommentByIdTest(this.comment);
    console.log('have in component', this.comments)
    return this.comments
  }


  
  
  stepBack() {
    console.log(this.commentService.comments);
    return this.router.navigateByUrl('/home');
  }
}


  