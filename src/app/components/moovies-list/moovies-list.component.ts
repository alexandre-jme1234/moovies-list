import { Component, OnInit, Output, EventEmitter, HostListener, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
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
export class MooviesListComponent implements OnInit  {
      @ViewChild('tableBody') tableBody!: ElementRef;

      public moovies: Moovie[] = [];
      @Output() lgMoovies = new EventEmitter<any>();
      
      constructor(public moovieService: MooviesService) {};
      
      // défilment à la souris
      @HostListener('wheel', ['$event'])
      onWheel(event: WheelEvent) {
        const delta = Math.sign(event.deltaY);
        this.tableBody.nativeElement.scrollLeft += delta * 100;
      }
      
      ngOnInit(): void {
        this.fetchMoovie();
        this.moovieService.AddAllMoovie(this.moovies);
      }

      getCachedMoovie() {
        // rendre persistant fecth moovies dans moovie Service
        this.moovies = this.moovieService.getCacheMoovies();
      }

      public fetchMoovie() {
        let urlImg = 'https://image.tmdb.org/t/p/w185'
    
        this.moovieService.fetchMoovies().subscribe({
            next: (data: any) => {
            // map vers movie list
            this.moovies = data[1].map((el: any) => ({ 
              id: el.id,
              title: el.title,
              poster_path: `${urlImg}${el.poster_path}`,
              overview: el.overview,
              release_date: el.release_date,
              vote_average: el.vote_average,
              adult: el.adult
            }))
            this.moovieService.cacheMoovies(this.moovies);
            this.lgMoovies.emit(data[1].length);
            return this.moovies
          }, error: (err) => { console.log(err)}
        });
      }
    }

