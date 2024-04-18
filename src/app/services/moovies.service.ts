import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AsyncSubject, BehaviorSubject, Observable, Subject, catchError, concatMap, first, lastValueFrom, map, of, skip, tap } from 'rxjs';
import { Moovie } from '../models/moovie.model'
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment.development';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class MooviesService {
  public moovies!: Moovie[]; 
  public moovieSubject: BehaviorSubject<object> = new BehaviorSubject<object>({});
  public fetchMoovie: any;
  API_test = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTNmYmYyMjg5ZjQ4NmM3ZGE3NWQyMTdiN2U2MzU4NCIsInN1YiI6IjY0M2ZiMTFmYjBiYTdlMDUyNzEzMTQ3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TPm14QDpLKeSD-nFW16fzxQap0RSELJKPZ4fcJBQKPM';
  public url_local = environment.url_local;
  public isToggle: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient, private auth: AuthService) {
  };

  public getMoovieObservable() {
    return this.moovieSubject.asObservable();
  }

  private headers() {
    const headers = new HttpHeaders().set('Authorization', environment.key_TMDB)
    return headers;
  }; 


  public fetchMoovies() {
    const basicUrl = environment.url_TMDB
    const API = environment.key_TMDB;
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


  
  public async getMoovie(): Promise<any> {
    const basicUrl = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.dsc'
    const API = environment.key_TMDB
    const API_test = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTNmYmYyMjg5ZjQ4NmM3ZGE3NWQyMTdiN2U2MzU4NCIsInN1YiI6IjY0M2ZiMTFmYjBiYTdlMDUyNzEzMTQ3NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TPm14QDpLKeSD-nFW16fzxQap0RSELJKPZ4fcJBQKPM'
    const headers = new HttpHeaders().set('Authorization', API)
    return new Promise((resolve, reject) => this.http.get(`${basicUrl}`, {headers})
      .toPromise()
      .then((data) => {
        console.log(data)
        if(data) {
          resolve(data);
        } else {
          reject(new Error('fetch failed'))
        }
      })
      )
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
  return this.http.get<any>(`${this.url_local}moovies`, this.auth.getHeaders()).pipe(tap((response) => {const data = response.data; console.log('all moovie __ ', data)}), first());
}

  public currentMooviesSubject = new BehaviorSubject<any[]>([]);
  currentMoovies$ = this.currentMooviesSubject.asObservable(); 
  
  public test$ = new BehaviorSubject<any>([]);
  testSubject$ = this.test$.asObservable();
  
  setTestCurrent(value: any) {
    this.test$.next(value);
  }

  public fetchMoovie$(): Promise<object> {
    let urlImg = 'https://image.tmdb.org/t/p/w185'
    return new Promise((resolve, reject) => {
      this.fetchMoovies().subscribe({
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
          })
          )
        }, error: (err) => { reject(err)}
      });
      this.setTestCurrent(this.moovies);
      resolve(this.moovies)
    })
  };


  formattedData(day: Date) {
    if(!day) { return console.error('date formatted error _', null) }
    var year = day.toLocaleString("default", { year: "numeric" });
    var month = day.toLocaleString("default", { month: "2-digit" });
    var today = day.toLocaleString("default", { day: "2-digit" });
    var formattedDate = year + "-" + month + "-" + today;
    return formattedDate;
  }

  public async fetchMoovieDate(): Promise<object> {
    let day = new Date();
    const lastMonth = new Date(day.getTime())
    lastMonth.setDate(0)

    let max_date = this.formattedData(day);
    let min_date = this.formattedData(lastMonth);

    const url_basic = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte=${min_date}&release_date.lte=${max_date}`
    let headers = this.headers()
    let urlImg = 'https://image.tmdb.org/t/p/w185'
      return new Promise((resolve, reject) => this.http.get(url_basic, {headers})
        .toPromise()
        .then((response: any | undefined) => {
          let data = response?.results.map((moovie: any) => {
            return {
              id: moovie.id,
              title: moovie.original_title,
              poster_path: urlImg+moovie.poster_path,
              original_language: moovie.original_language,
              overview: moovie.overview,
              popularity: moovie.popularity,
              release_date: moovie.release_date,
              video: moovie.video,
              vote_average: moovie.vote_average,
              vote_count: moovie.vote_count
            } 
          })
          console.log('fetch moovie sort by DailyDate _', typeof data)
          this.currentMooviesSubject.next(data);
          this.currentMoovies$.subscribe((value: any) => {console.log(value)})
          resolve(data);
        })
        .catch((error: any) => reject(error)))
  };
  
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


  moovies$ = of([1, 2, 3, 4])

  testMoovie$() {
    this.moovies$.pipe(
      skip(2)
    ).subscribe(v => console.log('helo', v))
  }
}