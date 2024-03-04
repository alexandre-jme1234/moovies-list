import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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

  @Input() comments: any[]  = [];
  testComment: any = {}
  getComments!: Subscription
  userStored: any = {}
  constructor(
    public commentService: CommentService,
    public storageService: StorageService,
    ) {
    }
    
    ngOnInit(): void {
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    changes['comments'];
  }

  


  async addLike(id_comment: any) {
    let filterTest = this.comments?.find((e: any) => { return e.id ===  id_comment })
    let updateLike = filterTest.attributes.like + 1
    let addLikeStoredComment = await this.commentService.updateComment(filterTest.id, updateLike);
    filterTest.attributes.like = updateLike
  }

  async lessLike(id_comment: any) {
    let filterTest = this.comments?.find((e: any) => { return e.id ===  id_comment });
    if (filterTest.attributes.like > 0) {
    let updateLike = filterTest.attributes.like - 1
    let addLikeStoredComment = await this.commentService.updateComment(filterTest.id, updateLike);
    filterTest.attributes.like = updateLike;
    }
  }
}
