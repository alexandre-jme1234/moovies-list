import { NgFor } from '@angular/common';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { MooviesService } from '../../services/moovies.service';
import { Moovie } from '../../models/moovie.model';
import { MatButtonModule } from '@angular/material/button';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-moovie',
  standalone: true,
  imports: [NgFor, MatButtonModule, MovieDetailComponent],
  templateUrl: './item-moovie.component.html',
  styleUrl: './item-moovie.component.scss'
})




export class ItemMoovieComponent implements OnInit {
  @Output() dtMoovie = new EventEmitter<any>();
  @Input()
  moovies: any[] = [];
  
  
  moovie: any = {};

  constructor(private mooviesService: MooviesService, private router: Router) {};
  ngOnInit(): void {
   this.moovies;
   this.mooviesService.getIdMoovie('Sixty Minutes')
  }



  public findMovie(moovie: any) {
    console.log(moovie)
    this.router.navigate(['/home/', moovie.id]);
    // this.mooviesService.AddMoovie(moovie);
  }
}
