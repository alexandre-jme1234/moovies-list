import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { StorageService } from './local-service.service';
import { first } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isError: boolean = true;
  public isLogedIn: boolean = false;
  constructor(private http: HttpClient, private router: Router, private storage: StorageService) {};
  public user!: {};


  public login(user: {}) {

    return this.http.post('http://localhost:1337/api/auth/local', user)
      .pipe(first())
      .subscribe({
        next: () => {
          // this.userForm.enable();
          this.isLogedIn = true;
          
          // store user in navogator
          this.user = user;
          console.log(this.user);
          this.storage.setItem('user', JSON.stringify(user));
          this.router.navigateByUrl('/home');
        },
        error: () => {
          // this.userForm.enable();
          
          // display error message
          this.isLogedIn = false;
          this.isError = false;
          console.log('error')
        }
      })
  }

  // auth guard
  public isAuth() {
    return this.isLogedIn;
  }

  public registrate(userValue: {}): any {
    return this.http.post('http://localhost:1337/api/auth/local/register', userValue)
    .pipe(first())
    .subscribe({
        next: () => {
          this.isLogedIn = true;

          // store user in navogator
          this.storage.setItem('user', JSON.stringify(userValue));
          this.router.navigateByUrl('/home');
        },
      error: () => {
          this.isLogedIn = false;
      }
    })
  };

  public logout(): void {
    // vide navigator store
    this.storage.removeItem('user');
    this.router.navigateByUrl('/connexion');
    this.isLogedIn = false;
  }
} 