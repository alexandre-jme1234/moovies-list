import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommentService } from '../../services/comment.service';
import { error } from 'console';
@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})


export class CommentComponent implements OnInit, OnChanges {
  @Input() comments: any[]|undefined = [];
  commentsChanges:any  = []
  testComment: any = {};
  getComments!: Subscription
  constructor(public commentService: CommentService ) {}

  ngOnInit(): void {
    // this.comments;
    this.getComments = this.commentService.getCommentsSubjects().subscribe({
      next: (data) => this.testComment = data,
      error: (err) => console.log(err)
    })
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes')
    this.commentsChanges = changes['comments'];
    
  }
}
