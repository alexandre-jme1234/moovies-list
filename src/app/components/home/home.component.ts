import { Component, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MooviesListComponent } from "../moovies-list/moovies-list.component";
import { MenuSettingsComponent } from "../menu-settings/menu-settings.component";
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/local-service.service';
import { Subscription, of, skip } from 'rxjs';
import { MovieDetailComponent } from "../movie-detail/movie-detail.component";
import { ItemMoovieComponent } from "../item-moovie/item-moovie.component";
import { MooviesService } from '../../services/moovies.service';
import { TopCommentsComponent } from "../top-comments/top-comments.component";
import { ProgressBarComponent } from "../progress-bar/progress-bar.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [CommonModule, MooviesListComponent, MenuSettingsComponent, MenuSettingsComponent, MooviesListComponent, MatMenuModule, MatButtonModule, MovieDetailComponent, ItemMoovieComponent, TopCommentsComponent, ProgressBarComponent]
})
export class HomeComponent implements OnInit {
    @ViewChild('week') public weekMoovieBtn!: any;
    
    isToggleDayMoovie: boolean = true;
    isToggleWeekMoovie: boolean = true;
    receivedData!: number
    dateRealese: number = Date.now();
    imgProfil!: any;
    currentUser!:{identifier: string, password: string};
    usernameCurrent!: string;
    getCurrentuser!: Subscription
    dtMoovie: any;
    userStore: any
    constructor(
        public auth: AuthService, 
        public storage: StorageService, 
        public moovieService: MooviesService,
        ) {
        
        this.userStore = this.auth.getUserStored();
        console.log(this.imgProfil);
    }
    

    moovie$: any;
    
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
            },
            error: (err) => console.log(err)
        })
        this.imgProfil = this.auth.getUserStored()?.profil_img
    }

    // length moovies list : output by emit become children app-list
    public receiveData(data: number): number {
            return this.receivedData = data;
    }

    receiveDtMoovie(el: any) {
        this.dtMoovie = el;
    }
}
