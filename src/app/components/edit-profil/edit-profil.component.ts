import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { MatFormFieldModule, } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouteReuseStrategy, Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-edit-profil',
    standalone: true,
    templateUrl: './edit-profil.component.html',
    styleUrl: './edit-profil.component.scss',
    imports: [ MatIconModule,CommonModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule, MatButtonModule, RouterModule, HttpClientModule ]
})
export class EditProfilComponent implements OnInit {

    imgProfil!: any;
    currentUser!:{identifier: string, password: string};
    usernameCurrent!: string;
    getCurrentuser!: Subscription
    public userForm: FormGroup;
    public user!: User; 

    
    constructor(public auth: AuthService, private formBuilder: FormBuilder, private router: Router) {
        this.userForm = this.createForm();
    }

    ngOnInit(): void {
        this.getCurrentuser = this.auth.getUserObservable().subscribe({
            next: (data: any) => {
                this.currentUser = data;
                if(data.username) {
                    this.usernameCurrent = data.username;
                } else {
                    this.usernameCurrent = this.currentUser.identifier;
                };
                this.auth.getImageProfil(this.currentUser).subscribe({
                    next: (data) => {this.imgProfil = data, console.log(this.imgProfil)},
                    error: (err) => console.log(err)
                });
            },
            error: (err) => console.log(err)
        })
    }
    
    private createForm() {
        return (this.userForm = this.formBuilder.group({
          id: [0, []],
          profil_img: ['', [Validators.required]],
        })
        )
      }

      onSubmit() {}
      
      setProfilImg() {
        const val = this.userForm.value;
        this.auth.getUser(this.usernameCurrent).subscribe({
            next: (data) => {
                let id = data.id
                this.auth.updateUser(id, val.profil_img);
                console.log(data)
            },
            error: (err) => console.log(err)
        });
        return console.log(val)
      }

      stepBack() {
        return this.router.navigateByUrl('/home');
      }

}
