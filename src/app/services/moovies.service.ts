import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { first, map, switchMap } from 'rxjs';
import { Moovie } from '../models/moovie.model'

@Injectable({
  providedIn: 'root'
})
export class MooviesService {
  public moovies!: Moovie[];

  constructor(private http: HttpClient) {
  };

  /* moovies = [
    { id: 0, title: 'Le Grand Bleu', description: 'Il était une fois, une belle eau bleu' },
    { id: 0, title: 'Jumanji', description: 'Il était une fois, une belle eau bleu' },
    { id: 0, title: 'L Orient Express', description: 'Il était une fois, une belle eau bleu' },]

  */

  fetchTest() {
    return this.http.get(`https://api.chucknorris.io/jokes/random`)
      .pipe(first())
      .subscribe({
        next: (data) => console.log(data),
        error: (err) => console.log(err)
      })
  }

  fetchMoovies() {
    const APi = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTNmYmYyMjg5ZjQ4NmM3ZGE3NWQyMTdiN2U2MzU4NCIsInN1YiI6IjY0M2ZiMTFmYjBiYTdlMDUyNzEzMTQ3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TPm14QDpLKeSD-nFW16fzxQap0RSELJKPZ4fcJBQKPM'
    const basicUrl = 'https://api.themoviedb.org/3/discover/movie?primary_release_date.lte=2024-01&region=fr-FR&primary_release_year=2024&sort_by'
    return this.http.get(`${basicUrl}`,
      { headers: new HttpHeaders({'Accept': 'application/json', 'Authorization': `${APi}`}) }
    )
      .pipe(map((response: any) => {
        let moovies: any[] = [];
       for(let id in response) {
          moovies.push(response[id])
        }
        return moovies;
      }))
  }
}
