import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, RouterModule, HttpClientModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})


export class AuthComponent implements OnInit{

  public userForm: FormGroup
  public isLogedIn: boolean = false;
  constructor(
    private formBuilder: FormBuilder, 
    private http: HttpClient, 
    private auth: AuthService){
    this.userForm = this.createForm();
  }

  ngOnInit() {
  }

  onSubmit() {
    this.http.post('http://localhost:1337/api/auth/local', this.userForm?.value).subscribe({
      next: (value) => console.log(value),
      error: (err) => console.log('mot de passe ou user error', err),
      complete: () =>  this.isLogedIn == true
  })
    return console.log('userForm', this.userForm?.value)
    }

  private createForm() {
   return (this.userForm = this.formBuilder.group({
      id: [0, []],
      identifier: ['', []],
      password: ['', []]
    })
    )
  }
}
