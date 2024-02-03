import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs';
import { StorageService } from '../../services/local-service.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, RouterModule, HttpClientModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})


export class AuthComponent implements OnInit {

  public userForm: FormGroup
  public isLogedIn: boolean = false;
  isLoggedIn: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private auth: AuthService,
    public storage: StorageService
  ) {
    this.userForm = this.createForm();
  }

  ngOnInit() {
  }

  onSubmit() {

  }

  private createForm() {
    return (this.userForm = this.formBuilder.group({
      id: [0, []],
      username: ['', [Validators.required]],
      identifier: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
    )
  }

  public login() {
    const val = this.userForm.value;
    const userValue = { identifier: val.username, password: val.password };

    return this.http.post('http://localhost:1337/api/auth/local', userValue)
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
  }
}
