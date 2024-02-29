import { Component, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { MooviesListComponent } from "../moovies-list/moovies-list.component";
import { MenuSettingsComponent } from "../menu-settings/menu-settings.component";
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/local-service.service';
import { Subscription } from 'rxjs';
import { MovieDetailComponent } from "../movie-detail/movie-detail.component";
import { ItemMoovieComponent } from "../item-moovie/item-moovie.component";
import { MooviesService } from '../../services/moovies.service';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [CommonModule, MooviesListComponent, MenuSettingsComponent, MenuSettingsComponent, MooviesListComponent, MatMenuModule, MatButtonModule, MovieDetailComponent, ItemMoovieComponent]
})
export class HomeComponent implements OnInit {
    receivedData!: number
    dateRealese: number = Date.now();
    imgProfil!: any;
    currentUser!:{identifier: string, password: string};
    usernameCurrent!: string;
    getCurrentuser!: Subscription
    dtMoovie: any;
    userStore: any
    constructor(public auth: AuthService, public storage: StorageService, public moovieService: MooviesService ) {
        this.userStore = this.auth.getUserStored();
    }

    
    ngOnInit(): void {
        // get currentUser img profil & auth informations
        this.getCurrentuser = this.auth.getUserObservable().subscribe({
            next: (data: any) => {
                this.currentUser = data;
                if(data.username) {
                    this.usernameCurrent = data.username;
                } else {
                    this.usernameCurrent = this.currentUser.identifier;
                    this.usernameCurrent = this.userStore.username;
                };
                this.auth.getImageProfil(this.currentUser).subscribe({
                    next: (data) => {
                        this.imgProfil = data,
                        this.imgProfil = this.userStore.profil_img
                    },
                    error: (err) => console.log(err)
                });
            },
            error: (err) => console.log(err)
        })
    }

    // length moovies list : output by emit become children app-list
    public receiveData(data: number): number {
            return this.receivedData = data;
    }


    receiveDtMoovie(el: any) {
        this.dtMoovie = el;
    }
}
