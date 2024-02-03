import { NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-item-moovie',
  standalone: true,
  imports: [NgFor],
  templateUrl: './item-moovie.component.html',
  styleUrl: './item-moovie.component.scss'
})




export class ItemMoovieComponent implements OnInit {
  
  @Input()
  moovies: any[] = [];

  

  ngOnInit(): void {
   this.moovies;
  }
}
