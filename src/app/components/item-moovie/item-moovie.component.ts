import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MooviesService } from '../../services/moovies.service';
import { MatButtonModule } from '@angular/material/button';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';
import { Router } from '@angular/router';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-item-moovie',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MovieDetailComponent],
  templateUrl: './item-moovie.component.html',
  styleUrl: './item-moovie.component.scss'
})




export class ItemMoovieComponent implements OnInit {
  @Output() dtMoovie = new EventEmitter<any>();
  @Input()
  moovies: any[] = [];

  comments: any
  
  
  moovie: any = {};

  constructor(private mooviesService: MooviesService, private router: Router, private commentService: CommentService) {};
  ngOnInit(): void {
   this.moovies;
  }



  public findMovie(moovie: any) {
    this.commentService.getAllCommentById(''+moovie.id).subscribe({
      next: (data) => {
        // store les comments avant l'init du movie-detail
        this.commentService.comments = data
        this.comments = data
      },
      error: (err) => console.log(err)
    });
    
    
    this.router.navigate(['/home/', moovie.id])
    // this.mooviesService.AddMoovie(moovie);
    return this.comments;
  }
}
