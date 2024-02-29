import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommentService } from '../../services/comment.service';
import { StorageService } from '../../services/local-service.service';
import { AuthService } from '../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { Comment, CommentTest } from '../../models/comment.model';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [ CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})


export class CommentComponent implements OnInit {
  
  testMoovie: CommentTest = {
    'identifier': 'Alexandre',
    'title': 'Super Film', 
    'comment_body': 'ur le frisson qu il fait ressentir du début à la fin. ur le frisson qu il fait ressentir du début à la fin. ur le frisson qu il fait ressentir du début à la fin. ur le frisson qu il fait ressentir du début à la fin.ur le frisson qu il fait ressentir du début à la fin.ur le frisson qu il fait ressentir du début à la fin.ur le frisson qu il fait ressentir du début à la fin.ur le frisson qu il fait ressentir du début à la fin.ur le frisson qu il fait ressentir du début à la fin.ur le frisson qu il fait ressentir du début à la fin.ur le frisson qu il fait ressentir du début à la fin.ur le frisson qu il fait ressentir du début à la fin.',
    'id_moovie': '823464',
    'like': 40,
    'img_moovie': 'https://image.tmdb.org/t/p/w185/bQ2ywkchIiaKLSEaMrcT6e29f91.jpg',
    'img_profil': 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png'
  }

  @Input() comments: any[]|undefined = [];
  testComment: any = {};
  getComments!: Subscription
  userStored: any = {}
  constructor(
    public commentService: CommentService,
    public storageService: StorageService,
    ) {
     // this.userStored = this.authService.getUserStored();
     // console.log('comments in comment comp', this.comments)
     // this.comments =  this.commentService.getAllCommentById$()
    }
    
    ngOnInit(): void {
    console.log('comments __', this.comments)
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    changes['comments'];
    // console.log('comment', this.comments);
  }

  addLike() {
    return this.testMoovie.like++;
  }

  lessLike() {
    return this.testMoovie.like--;
  }
}
