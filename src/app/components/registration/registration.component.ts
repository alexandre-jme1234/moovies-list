import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Observable, throwError } from 'rxjs';
import { error } from 'console';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, RouterModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit {
  private isLoggedIn: boolean = false;
  public userForm: FormGroup
  public user!: User;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient){
    this.userForm = this.createForm();
  }


  ngOnInit() {
    this.userForm = this.createForm();
  }

  onSubmit() {
  }

  public registrate(): Observable<object> {
    const val = this.userForm.value; 
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
  private createForm() {
   return (this.userForm = this.formBuilder.group({
      id: [0, []],
      username: ['', [Validators.required]],
      identifier: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
    )
  }

  get authsService(): AuthService {
    return this.authService
  }

  login() {
    const val = this.userForm.value;
    console.log(val)

    if(val.identifier && val.password){
      this.authService.login(val.identifier, val.password).subscribe(
        () => {
          console.log("User is Logged in");
          this.router.navigateByUrl('/');
        }
      )
    }


  /* passwordFalse(password: FormControl): {forbidden: boolean} | null {
    if(this.passwordForbidden.includes(password.value)) return null;
    return {
      forbidden: true
  }
}*/
} }
