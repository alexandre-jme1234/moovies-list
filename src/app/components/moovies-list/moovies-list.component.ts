import { Component, OnInit, Output, EventEmitter, HostListener, ViewChild, ElementRef, OnChanges, SimpleChanges, Input, AfterContentInit } from '@angular/core';
import { ItemMoovieComponent } from "../item-moovie/item-moovie.component";
import { Moovie } from '../../models/moovie.model';
import { MooviesService } from '../../services/moovies.service';
import { ResolveEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { subscribe } from 'diagnostics_channel';

@Component({
    selector: 'app-moovies-list',
    standalone: true,
    templateUrl: './moovies-list.component.html',
    styleUrl: './moovies-list.component.scss',
    imports: [CommonModule, ItemMoovieComponent, MatButtonToggleModule]
})
export class MooviesListComponent implements OnInit, OnChanges  {
      @ViewChild('tableBody') tableBody!: ElementRef;

      public isToggle!: boolean;
      public moovies: any[] = [];
      @Output() lgMoovies = new EventEmitter<number>();
      
      constructor(public moovieService: MooviesService) {};
      
      // défilment à la souris
      @HostListener('wheel', ['$event'])
      onWheel(event: WheelEvent) {
        const delta = Math.sign(event.deltaY);
        this.tableBody.nativeElement.scrollLeft += delta * 100;
      }
      
      async ngOnInit(): Promise<any> {
        console.log('on init')
        this.sendLgMoovies();
        this.moovieService.test$.subscribe(x => {return console.log('on init', this.moovies), this.moovies = x})
      }
      
      async getTodayMoovie(): Promise<any> {
        this.isToggle = !this.isToggle;
        if(this.isToggle) {
          let result = await this.moovieService.fetchMoovieDate();
          this.moovieService.setTestCurrent(result);
          !this.isToggle;
          return this.moovies;
        } 
      }

      async getWeekMoovie() {
        console.log('wekk');
        this.moovieService.setTestCurrent('sis');
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
              console.log('fetch moovie', data);
              this.moovies = data[1].map((el: any) => ({ 
                id: el.id,
                title: el.title,
                poster_path: `${urlImg}${el.poster_path}`,
                overview: el.overview,
                release_date: el.release_date,
                vote_average: el.vote_average,
                adult: el.adult
              })
              )
            }, error: (err) => {
              reject(err)}
          });
          this.moovieService.setTestCurrent(this.moovies);
          resolve(this.moovies)
        })
      }; 

      ngOnChanges(changes: SimpleChanges): void {
        console.log('on changes')
      };

      async sendLgMoovies(): Promise<any> {
        try {
          await this.moovieService.fetchMoovie$();
          this.lgMoovies.emit(this.moovies.length);
        } catch(error) {
          console.log(error);
        }
      }
    }

