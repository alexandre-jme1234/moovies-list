import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs/operators';
import { StorageService } from '../../services/local-service.service';



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
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private http: HttpClient,
    public storage: StorageService
    ){
    this.userForm = this.createForm();
  }


  get isLogged() {
    return this.isLoggedIn;
  } 

  ngOnInit() {
    this.userForm = this.createForm();
    this.registrate();
  }
  
  onSubmit() {
  }

  public registrate(): any {
    const val = this.userForm.value; 
    console.log('userform entrance', val)
    const userValue = {username: val.username, email: val.identifier, password: val.password, role: "1"}

    return this.http.post('http://localhost:1337/api/auth/local/register', userValue)
    .pipe(first())
    .subscribe({
        next: () => {
          this.userForm.enable();
          this.isLoggedIn = true;
          this.storage.setItem('user', JSON.stringify(userValue));

          this.router.navigateByUrl('/home');
        },
      error: () => {
          this.userForm.enable();
          this.isLoggedIn = false;
      }
    })
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
}
