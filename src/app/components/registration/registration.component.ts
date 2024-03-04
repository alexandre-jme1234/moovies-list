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
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [MatIconModule, CommonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, RouterModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent implements OnInit {
  private isLoggedIn: boolean = false;
  public userForm: FormGroup
  public user!: any;

  constructor(
    public formBuilder: FormBuilder,
    public authService: AuthService,
    public storage: StorageService
    ){
    this.userForm = this.createForm();
  }


  get isLogged() {
    return this.isLoggedIn;
  } 
  
    get authsService(): AuthService {
      return this.authService;
    }

  ngOnInit() {
    this.userForm = this.createForm();
    this.setRegistrate();
  }
  
  onSubmit() {
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


  public setRegistrate() {
    const val = this.userForm.value;
    
    // assign clé valeur conforme au model strapi
    this.user = {id: val.length+1, username: val.username, email: val.identifier, password: val.password, img_profil: 'registratehttps://images.desenio.com/zoom/wb0125-8batman-portrait50x70-55544-10774.jpg', role: "1"}

    return this.authService.registrate(this.user)
  }
}
