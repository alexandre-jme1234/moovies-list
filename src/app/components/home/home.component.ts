import { Component, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { MooviesListComponent } from "../moovies-list/moovies-list.component";
import { MenuSettingsComponent } from "../menu-settings/menu-settings.component";
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/local-service.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [CommonModule, MooviesListComponent, MenuSettingsComponent, MenuSettingsComponent, MooviesListComponent, MatMenuModule, MatButtonModule]
})
export class HomeComponent implements OnInit, OnDestroy {

    receivedData: any;
    dateRealese: number = Date.now();
    imgProfil!: string;
    currentUser: any = null;
    usernameCurrent!: string;
    getCurrentuser!: Subscription
    
    constructor(public auth: AuthService, public storage: StorageService ) {
    }

    
    ngOnInit(): void {

        // get currentUser img profil & auth informations
        this.getCurrentuser = this.auth.getUserObservable().subscribe({
            next: (data) => {
                this.currentUser = data,
                this.usernameCurrent = data.identifier;
                this.auth.getImageProfil(this.currentUser).subscribe({
                    next: (data) => {this.imgProfil = data, console.log(this.imgProfil)},
                    error: (err) => console.log(err)
                });
            },
            error: (err) => console.log(err)
        })
    }
    
    // length moovies list : output by emit become children app-list
    receiveData(data: any) {
        this.receivedData = data;
    }

    ngOnDestroy(): void {
        this.getCurrentuser.unsubscribe();
    }
}
