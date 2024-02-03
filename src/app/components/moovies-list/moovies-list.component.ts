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
      public data = this.mooviesService.moovies;

      ngOnInit(): void {
        this.getAllMoovies(this.data);
      }

      constructor(public mooviesService: MooviesService) {}

      getAllMoovies(dt: Moovie[]): Moovie[] {
        console.log('init', dt)
        dt.forEach((el: any) => { this.moovies.push(el) });
        return this.moovies;
      }
}
