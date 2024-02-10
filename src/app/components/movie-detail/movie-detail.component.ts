import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
import { Observable, Subscription, first } from 'rxjs';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [
    MatIconModule, 
    CommonModule, 
    MatFormFieldModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    MatButtonModule, 
    RouterModule, 
    HttpClientModule
  ],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss'
})
export class MovieDetailComponent implements OnInit {
  public moovies: any = [];
  public moovie: any | undefined = {}
  public poster_path: string | undefined = "";
  public UrlApi = 'https://image.tmdb.org/t/p/w185'
  public commentForm: FormGroup;
  private comment!: Comment|undefined;

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

    // filter by Id moovie all comments.
    this.commentService.getAllCommentById(''+this.moovie.id);
  }


  private createForm() {
    return (this.commentForm = this.formBuilder.group({
      id: [0, []],
      title: ['', []],
      comment_body: ['', []]
    })
    )
  }



  public editComment(): Subscription | undefined {
    const val = this.commentForm.value;
    this.comment = {
      title: val.title,
      comment_body: val.comment_body,
      id_moovie: ''+this.moovie.id
    };
    console.log(this.comment)

    return this.commentService.AddComment(this.comment).pipe(first()).subscribe({
      next: (data) => console.log(data),
      error: (err) => console.log(err)
    })
  }
}
  