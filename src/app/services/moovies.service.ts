import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, concatMap, first, lastValueFrom, map, of, tap } from 'rxjs';
import { Moovie } from '../models/moovie.model'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MooviesService {
  public moovies!: Moovie[]; 
  public moovieSubject: BehaviorSubject<object> = new BehaviorSubject<object>({});
  public fetchMoovie: any;

  constructor(private http: HttpClient, private auth: AuthService) {
  };

  public getMoovieObservable() {
    return this.moovieSubject.asObservable();
  }


  public fetchMoovies() {
    const basicUrl = 'https://api.themoviedb.org/3/discover/movie?primary_release_date.lte=2024-01&region=fr-FR&primary_release_year=2024&sort_by'
    const API = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTNmYmYyMjg5ZjQ4NmM3ZGE3NWQyMTdiN2U2MzU4NCIsInN1YiI6IjY0M2ZiMTFmYjBiYTdlMDUyNzEzMTQ3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TPm14QDpLKeSD-nFW16fzxQap0RSELJKPZ4fcJBQKPM"
    const headers = new HttpHeaders().set('Authorization', API)
    return this.http.get(`${basicUrl}`,
    {headers}
    )
      .pipe(map((response: any) => {
        let moovies: any[] = [];
        for (let id in response) {
          moovies.push(response[id])
        }
        return moovies;
      }))
  }

  cacheMoovies(data: any) {
    this.moovies = data
    return this.moovies;
  }

  getCacheMoovies() {
    return this.moovies;
  }

// créé un nouveau moovie seulement s'il n'existe pas
public AddMoovie(moovie: any) {
  let moovieTitle = moovie.title
  this.getAllMoovie().pipe(map((response: any) => {

    let data = response.data;
    let findIdMoovie = data.find((el: any) => el.attributes.title === moovieTitle);

    if(!findIdMoovie) {
      let valueData = { "data": { "title": moovie.title, "poster_path": moovie.poster_path, "overview": moovie.overview, "release_date": moovie.release_date, "vote_average": moovie.vote_average } };
            return this.http.post('http://localhost:1337/api/moovies', valueData,
              this.auth.getHeaders())
              .pipe(first())
              .subscribe({
                next: (data) => console.log(data),
                error: (err) => console.log(err)
              });
    } else {
      throw new Error('moovie existed')
    }
  })).subscribe({
    next: (data) => console.log(data),
    error: (err) => console.log(err)
  });
}

public getAllMoovie(): Observable<any> {
  return this.http.get<any>('http://localhost:1337/api/moovies', this.auth.getHeaders()).pipe(tap((response) => {const data = response.data; console.log(data)}), first());
}

public AddAllMoovie(moovies: any[]): Observable<any> {
  // console.log('Moovies', moovies)
  return this.http.get<any>('http://localhost:1337/api/moovies', this.auth.getHeaders())
  .pipe(
    map((response: any) => {
    let data = response.data;
    console.log(data);
    for (let i = 0; i < moovies.length; i++) {
      let findIdMoovie = data.find((el: any) => el.attributes.title === moovies[i].title);
      if (!findIdMoovie) {
        let valueData = {
          "data": {
            "title": moovies[i].title,
            "poster_path": moovies[i].poster_path,
            "overview": moovies[i].overview,
            "release_date": moovies[i].release_date,
            "vote_average": moovies[i].vote_average,
            "adult": moovies[i].adult
          }
        };

        return this.http.post('http://localhost:1337/api/moovies', valueData, this.auth.getHeaders()).pipe(
          first(),
          tap(data => console.log(data)),
          catchError(err => {
            console.log(err);
            throw new Error(err);
          })
          );
        } 
      } 
      return of(null);
    }));
}





/* public AddAllMoovie(moovie: any[]) {
  console.log(' -----', moovie)
  this.getAllMoovie().pipe(map((response: any) => {
    let data = response.data;
    for (let i = 0; i < moovie.length; i++) {
      let findIdMoovie = data.find((el: any) => el.attributes.title === moovie[i].title);
    if(!findIdMoovie) {
      let valueData = { "data": { "title": moovie[i].title, "poster_path": moovie[i].poster_path, "overview": moovie[i].overview, "release_date": moovie[i].release_date, "vote_average": moovie[i].vote_average } };
            return this.http.post('http://localhost:1337/api/moovies', valueData,
              this.auth.getHeaders())
              .pipe(first(),
              tap(data => console.log(data)),
              catchError(err => {
                console.log(err);
                throw new Error(err)
              })
              )
    } else {
      throw new Error('moovie existed')
    }
  }
  })).subscribe({
    next: (data) => console.log(data),
    error: (err) => console.log(err)
  });
} */
  
  public getIdMoovie(MoovieTitle: string): any {
    return this.getAllMoovie()
    .pipe(map((response: any) => {
      console.log('-- ', response.data)
      let data = response.data
      let findIdMoovie = data.find((el: any) => el.attributes.title === MoovieTitle);
      let idMoovie = findIdMoovie.id;
      this.moovieSubject.next(findIdMoovie);
      console.log(idMoovie)
      return findIdMoovie
    })).subscribe({
      next: (data) => console.log(data),
      error: (err) => console.log(err)
    });
  } 
}