import { Component, OnInit } from '@angular/core';
import { MooviesListComponent } from "../moovies-list/moovies-list.component";
import { MenuSettingsComponent } from "../menu-settings/menu-settings.component";
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MooviesService } from '../../services/moovies.service';
import { Moovie } from '../../models/moovie.model';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [MooviesListComponent, MenuSettingsComponent, MenuSettingsComponent, MooviesListComponent, MatMenuModule, MatButtonModule]
})
export class HomeComponent implements OnInit {
   

    ngOnInit(): void { 
    }
}
