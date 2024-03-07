import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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




export class ItemMoovieComponent implements OnInit, OnChanges {
  @Output() dtMoovie = new EventEmitter<any>();
  @Input() moovies: any[] = [];

  comments: any
  
  
  moovie: any = {};

  constructor(private mooviesService: MooviesService, private router: Router, private commentService: CommentService) {};
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('chang', changes)
  }


  public findMovie(moovie: any) {
    console.log('idMoovie', ''+moovie.id)
    this.commentService.getAllCommentById$(''+moovie.id);
    this.router.navigate(['/home/', moovie.id])
    return this.comments;
  }
}
