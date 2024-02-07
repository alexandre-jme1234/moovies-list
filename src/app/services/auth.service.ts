import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { StorageService } from './local-service.service';
import { BehaviorSubject, Observable, first, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isError: boolean = true;
  public isLogedIn: boolean = false;
  constructor( private http: HttpClient, private router: Router, private storage: StorageService ) {};
  public user!: {};
  private userSubject: BehaviorSubject<object> = new BehaviorSubject<object>({});


  public login(user: {}) {
    return this.http.post('http://localhost:1337/api/auth/local', user)
      .pipe(first())
      .subscribe({
        next: () => {
          // this.userForm.enable();
          this.userSubject.next(user);
          console.log(typeof this.userSubject)
          this.isLogedIn = true;
          
          // store user in navogator
          this.user = user;
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
      });
  }

  public getUserObservable() {
    return this.userSubject.asObservable();
  }
  
  // auth guard
  public isAuth() {
    console.log(this.user);
    return this.isLogedIn;
  }

  public registrate(userValue: {}): any {
    return this.http.post('http://localhost:1337/api/auth/local/register', userValue)
    .pipe(first())
    .subscribe({
        next: () => {
          this.isLogedIn = true;

          // màj user value
          this.userSubject.next(userValue);
          console.log(this.userSubject);

          // store user in navogator
          this.storage.setItem('user', JSON.stringify(userValue));
          this.router.navigateByUrl('/home');
        },
      error: () => {
          this.isLogedIn = false;
      }
    })
  };

  public getImageProfil(userName: any): Observable<any> {
    return this.http.get('http://localhost:1337/api/users/')
    .pipe(map((response: any) => {
      let findUser = response.find((el: any) => el.username  === userName.identifier  );
      let findUserValue = response.find((el: any) => el.username  === userName.username  );
      if(findUser){

        //login user
        return findUser.profil_img
      } else if (findUserValue) {
        
        // registrate user
        return findUserValue.profil_img;
      } else {
        return null;
      }
    }))
  }

  public logout(): void {
    // vide navigator store
    this.storage.removeItem('user');
    this.router.navigateByUrl('/connexion');
    this.isLogedIn = false;
  }
} 