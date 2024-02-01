import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private router: Router) {};

  nouille(el: any) {
    return console.log(el)
  }

  registrate(val: any): Observable<object> {
    console.log('userform entrance', val)
    const userValue = {username: val.username, email: val.identifier, password: val.password, role: "1"}

    return this.http.post('http://localhost:1337/api/auth/local/register', userValue).pipe(
      map((data) => {
        console.log(data);
        this.isLoggedIn = true; 
        this.router.navigateByUrl('/home');
        return data;
      })
    );
  };
  
  getAllUsers() {
    return this.http.get('http://localhost:1337/api/users/').subscribe({
      next: (data) => console.log(data),
      error: (err) => console.log(err)
    })

  }

  login(email: string, password: string){
    return this.http.post(`http://localhost:1337/api/auth-users`, {email, password}).pipe(
      shareReplay()
    )
  }
}
