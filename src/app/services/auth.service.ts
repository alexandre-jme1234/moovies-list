import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { StorageService } from './local-service.service';
import { BehaviorSubject, Observable, first, map, tap } from 'rxjs';
import { UserStored } from '../models/user.model';
import { type } from 'os';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isError: boolean = true;
  public isLogedIn: boolean = false;
  public userStored?: UserStored | undefined | null;
  constructor( private http: HttpClient, private router: Router, private storageService: StorageService ) {};
  public user!: {};
  private userSubject: BehaviorSubject<object> = new BehaviorSubject<object>({});


  public login(user: any) {
    return this.http.post('http://localhost:1337/api/auth/local', user, this.getHeaders())
      .pipe(first())
      .subscribe({
        next: () => {
          // this.userForm.enable();
          this.userSubject.next(user);
          this.isLogedIn = true;
          
          // store user in navogator
          this.user = user;
          this.getUser(user.identifier).subscribe({
            next: (data) => console.log(data),
            error: (err) => console.log(err)
          });
          this.router.navigateByUrl('/home');
        },
        error: () => {
          // this.userForm.enable();
          
          // display error message
          this.isLogedIn = false;
          this.isError = false;
          console.log('error login')
        }
      });
  }

  public getUserStored() {
      let userStored = this.storageService.getItem("user");

      if(userStored) {
        let userStoredOj = JSON.parse(userStored!);
        this.userStored = userStoredOj
        return this.userStored;
      } else {
        userStored = null
        return userStored;
      }

  }
  
  // màj img local storage
  public setProfilImageStore(val: UserStored):  UserStored | undefined | null {
    let userStored = this.storageService.getItem("user");
    var userStoredOj = JSON.parse(userStored!);


    if(userStoredOj) {
      userStoredOj.profil_img = val;
      this.storageService.removeItem("user");
      this.storageService.setItem("user", JSON.stringify(userStoredOj))
      this.userStored = userStoredOj;
      console.log('new img profil', this.userStored)
      return this.userStored;
    } else {

      console.log('set image doesnt work')
      this.userStored = userStoredOj
      return this.userStored;
    }
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
    return this.http.post('http://localhost:1337/api/auth/local/register', userValue, this.getHeaders())
    .pipe(first())
    .subscribe({
        next: () => {
          this.isLogedIn = true;

          // màj user value
          this.userSubject.next(userValue);
          console.log('user reg', this.userSubject);

          // store user in navogator
          this.storageService.setItem('user', JSON.stringify(userValue));
          this.router.navigateByUrl('/home');
        },
      error: () => {
          this.isLogedIn = false;
      }
    })
  };

  public getImageProfil(userName: any): Observable<any> {
    return this.http.get('http://localhost:1337/api/users/', this.getHeaders())
    .pipe(
      map((response: any) => {
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

  public updateUser(id: number, pathImg: string) {
    return this.http.put(`http://localhost:1337/api/users/${id}?populate=*`, // !! recherche incrméenté perte de perf - remplacer par 
    { profil_img: pathImg },
    this.getHeaders()
    ).pipe(first())
    .subscribe({
      next: (data) => console.log(data),
      error: (err) => console.log(err)
    })
  }

  public getHeaders() {
    return {
      headers: { Authorization: environment.key_STRAPI }
    };
  }

  public getUser(userName: string) {
    return this.http.get('http://localhost:1337/api/users/', this.getHeaders())
    .pipe(
      // tap((response) => console.log(response)),
      map((response: any) => {
      let findUser = response.find((el: any) => el.username  === userName  );
      let findUserValue = response.find((el: any) => el.username  === userName  );
      if(findUser){

        //login user
        this.setUserStored(findUser)
        return findUser;
      } else if (findUserValue) {
        
        // registrate user
        return findUserValue;
      } else {
        return null;
      }
    }))
  }

  public setUserStored(user: any) {
    // filer string
    const userFiltered = Object.entries(user);
    const filter = userFiltered.filter(([key, value]) => typeof value === 'string');
    const justFilter = Object.fromEntries(filter);
    this.storageService.removeItem('user')
    this.storageService.setItem('user', JSON.stringify(justFilter));
    return console.log('user stored __', justFilter);
  }

  public logout(): void {
    // vide navigator store
    this.storageService.removeItem('user');
    this.router.navigateByUrl('/connexion');
    this.isLogedIn = false;
  } 
}