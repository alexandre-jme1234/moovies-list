import { Component, OnInit, Output, EventEmitter, HostListener, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { ItemMoovieComponent } from "../item-moovie/item-moovie.component";
import { Moovie } from '../../models/moovie.model';
import { MooviesService } from '../../services/moovies.service';
import { ResolveEnd } from '@angular/router';

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
      @Output() lgMoovies = new EventEmitter<number>();
      
      constructor(public moovieService: MooviesService) {};
      
      // défilment à la souris
      @HostListener('wheel', ['$event'])
      onWheel(event: WheelEvent) {
        const delta = Math.sign(event.deltaY);
        this.tableBody.nativeElement.scrollLeft += delta * 100;
      }
      
      ngOnInit(): void {
        this.sendLgMoovies();
        // this.lgMoovies.emit(this.moovies.length);
        this.moovieService.AddAllMoovie(this.moovies);
      }

      getCachedMoovie() {
        // rendre persistant fecth moovies dans moovie Service
        this.moovies = this.moovieService.getCacheMoovies();
      }

      public fetchMoovie(): Promise<object> {
        let urlImg = 'https://image.tmdb.org/t/p/w185'
        return new Promise((resolve, reject) => {
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
            }, error: (err) => { reject(err)}
          });
          resolve(this.moovies)
        })
      }

      async sendLgMoovies(): Promise<any> {
        try {
          await this.fetchMoovie();
          this.lgMoovies.emit(this.moovies.length);
        } catch(error) {
          console.log(error);
        }
      }
    }

