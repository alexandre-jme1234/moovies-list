import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MooviesService } from '../../services/moovies.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { Comment } from '../../models/comment.model';
import { CommentService } from '../../services/comment.service';
import { Observable, Subscription, first, tap } from 'rxjs';
import { CommentComponent } from "../comment/comment.component";
import { error } from 'console';
import { response } from 'express';

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
  private comment!: Comment|undefined;
  public comments: any[] | undefined

  constructor(private moovieService: MooviesService, private route: ActivatedRoute, private formBuilder: FormBuilder, private commentService: CommentService) {
    this.commentForm = this.createForm();
  };

  ngOnInit() {
    this.moovieService.fetchMoovies().subscribe({
      next: (data) => {
        this.moovies = data;
        const movieId: string | null = this.route.snapshot.paramMap.get('id');
        if (movieId) {
          this.moovie = this.moovies[1].find((idMoovie: any) => idMoovie.id === +movieId);
          this.poster_path = `${this.UrlApi}${this.moovie.poster_path}`
        } else {
          this.moovie = undefined
        }
      },
      error: (err) => console.log(err)
    });

    // filter by Id moovie all comments
    this.commentService.getAllCommentById(''+this.moovie.id).subscribe({
      next: (data) => {
        this.comments = data
        console.log('all com by id', data)
      },
      error: (err) => console.log(err)
    });
  }


  private createForm() {
    return (this.commentForm = this.formBuilder.group({
      id: [0, []],
      title: ['', []],
      comment_body: ['', []]
    })
    )
  }

  public toggleEdition(): void {
    this.isEditing = !this.isEditing
  }

  public editComment(): Subscription | undefined {
    const val = this.commentForm.value;
    this.comment = {
      title: val.title,
      comment_body: val.comment_body,
      id_moovie: ''+this.moovie.id
    };
    console.log(this.comment)

    return this.commentService.AddComment(this.comment)
  }
}
  