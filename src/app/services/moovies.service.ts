import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MooviesService {

  constructor() { 
    
  };

  moovies = [
    {id: 0, title: 'Le Grand Bleu', description: 'Il était une fois, une belle eau bleu'},
    {id: 0, title: 'Jumanji', description: 'Il était une fois, une belle eau bleu'},
    {id: 0, title: 'L Orient Express', description: 'Il était une fois, une belle eau bleu'},  ]
}
