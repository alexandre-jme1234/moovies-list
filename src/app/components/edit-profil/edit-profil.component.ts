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
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { StorageService } from '../../services/local-service.service';

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
    public userStore: any = {};

    
    constructor(
        public authService: AuthService, 
        private formBuilder: FormBuilder,
        private router: Router,
        private storageService: StorageService
        ) {
        this.userForm = this.createForm();
        this.userStore = this.authService.getUserStored();
    }

    ngOnInit(): void {
        this.getCurrentuser = this.authService.getUserObservable().subscribe({
            next: (data: any) => {
                this.currentUser = data;
                if(data.username) {
                    this.usernameCurrent = data.username;
                } else {
                    this.usernameCurrent = this.currentUser.identifier;
                };
                this.authService.getImageProfil(this.currentUser).subscribe({
                    next: (data) => {
                        this.imgProfil = data,
                        // this.auth.setProfilImageStore(data)
                        this.imgProfil = this.userStore.profil_img
                        },
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
        this.authService.getUser(this.userStore.username).subscribe({
            next: (data) => {
                let id = data.id
                this.authService.updateUser(id, val.profil_img);
            },
            error: (err) => console.log('user can be updated', err)
        });
        this.authService.setProfilImageStore(val.profil_img);
        this.imgProfil = val.profil_img;
        return console.log('setProfilImg', val)
    }
    
      stepBack() {
        return this.router.navigateByUrl('/home');
      }

}
