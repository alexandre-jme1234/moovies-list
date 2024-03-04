import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { CommentComponent } from "../comment/comment.component";
import { CommentService } from '../../services/comment.service';
import { CommentTest } from '../../models/comment.model';

@Component({
    selector: 'app-top-comments',
    standalone: true,
    templateUrl: './top-comments.component.html',
    styleUrl: './top-comments.component.scss',
    imports: [MatTabsModule, CommentComponent]
})
export class TopCommentsComponent implements OnInit{

    constructor(private commentService: CommentService) {

    };

    public comments: any[] = [];

    async ngOnInit(): Promise<any> {
        try {
          this.comments = await this.commentService.sortComment();
          console.log('fetch for top')
          console.log(this.comments)
        } catch {
          console.error('Pas de commentaire')
        }
      }
}
