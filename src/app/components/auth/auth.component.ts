import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs';
import { StorageService } from '../../services/local-service.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
 

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [ MatIconModule,CommonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, RouterModule, HttpClientModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})

export class AuthComponent implements OnInit {

  public userForm: FormGroup;
  public user!: User;  

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    public auth: AuthService,
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


  setLogin() {
    const val = this.userForm.value;
    const user = { identifier: val.username, password: val.password, profil_img: '' };
    console.log(user)
    return this.auth.login(user);
  }
}
