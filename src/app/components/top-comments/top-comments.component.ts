import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { CommentComponent } from "../comment/comment.component";
import { CommentService } from '../../services/comment.service';
import { CommentTest } from '../../models/comment.model';
import { MooviesService } from '../../services/moovies.service';

@Component({
    selector: 'app-top-comments',
    standalone: true,
    templateUrl: './top-comments.component.html',
    styleUrl: './top-comments.component.scss',
    imports: [MatTabsModule, CommentComponent]
})
export class TopCommentsComponent implements OnInit{

    constructor(private commentService: CommentService, private mooviesService: MooviesService) {

    };

    public comments: any[] = [];

    async ngOnInit(): Promise<any> {
        try {
          this.comments = await this.commentService.sortComment();
          console.log('fetch for top')
          // console.log(this.comments)
        } catch {
          console.error('Pas de commentaire')
        }
      }

      public sortByIdentifier(data: any) {
          data.sort((a: any, b: any) =>  { 
              return b.id - a.id;
          });
      
          return data.slice(0, 3); // Retourner les deux premiers éléments après le tri
      } 


      public async getTabsComments(event: any) {
        let result = await this.mooviesService.getMoovie();
        console.log(result)
        if (event.index == 0) {
          try {
            this.comments = await this.commentService.sortComment();
            console.log('fetch for top')
          } catch {
            console.error('Pas de commentaire')
          }
        } else if (event.index == 1) {
            this.comments = await this.commentService.getComment();
            this.comments = this.sortByIdentifier(this.comments);
        }
    }
    
}
