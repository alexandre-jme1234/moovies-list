import { Component, OnInit } from '@angular/core';
import { ItemMoovieComponent } from "../item-moovie/item-moovie.component";
import { Moovie } from '../../models/moovie.model';
import { MooviesService } from '../../services/moovies.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
    selector: 'app-moovies-list',
    standalone: true,
    templateUrl: './moovies-list.component.html',
    styleUrl: './moovies-list.component.scss',
    imports: [ItemMoovieComponent]
})
export class MooviesListComponent implements OnInit {
      public moovies: Moovie[] = [];
      // public data = this.moovies.moovies;

      ngOnInit(): void {
        // this.getAllMoovies(this.data);
        this.setTitle();
      }

      constructor(public moovieService: MooviesService) {}

      getAllMoovies(dt: Moovie[]): Moovie[] {
        console.log('init', dt)
        dt.forEach((el: any) => { this.moovies.push(el) });
        return this.moovies;
      }

      setTitle() {
        let urlImg = 'https://image.tmdb.org/t/p/w185'
        this.moovieService.fetchMoovies().subscribe({
            next: (data) => {
            console.log(data[1]);
            this.moovies = data[1].map((el: any) => ({ title: el.title, poster_path: `${urlImg}${el.poster_path}` }))
            console.log(this.moovies);
        }
        });     
    }
}
