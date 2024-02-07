import { Component, OnInit } from '@angular/core';
import { ItemMoovieComponent } from "../item-moovie/item-moovie.component";
import { Moovie } from '../../models/moovie.model';
import { MooviesService } from '../../services/moovies.service';

@Component({
    selector: 'app-moovies-list',
    standalone: true,
    templateUrl: './moovies-list.component.html',
    styleUrl: './moovies-list.component.scss',
    imports: [ItemMoovieComponent]
})
export class MooviesListComponent implements OnInit {
      public moovies: Moovie[] = [];

      ngOnInit(): void {
        this.getMoovie();
      }

      constructor(public moovieService: MooviesService) {};

      getMoovie() {
        let urlImg = 'https://image.tmdb.org/t/p/w185'
        this.moovieService.fetchMoovies().subscribe({
            next: (data) => {

            // map vers movie list
            this.moovies = data[1].map((el: any) => ({ 
              title: el.title, 
              poster_path: `${urlImg}${el.poster_path}` 
            }))
        }, error: (err) => { console.log(err)}
        });     
    }
}
