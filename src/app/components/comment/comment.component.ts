import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommentService } from '../../services/comment.service';
import { StorageService } from '../../services/local-service.service';

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
  constructor(
    public commentService: CommentService,
    public storageService: StorageService
    ) {}

  ngOnInit(): void {
    this.comments;
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.commentsChanges = changes['comments'];
    this.comments = this.commentService.comments;
  }
}
