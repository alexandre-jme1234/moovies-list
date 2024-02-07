import { Component, OnInit, Output } from '@angular/core';
import { MooviesListComponent } from "../moovies-list/moovies-list.component";
import { MenuSettingsComponent } from "../menu-settings/menu-settings.component";
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [CommonModule, MooviesListComponent, MenuSettingsComponent, MenuSettingsComponent, MooviesListComponent, MatMenuModule, MatButtonModule]
})
export class HomeComponent implements OnInit {
    receivedData: any;
    dateRealese: number = Date.now();
    

    // length moovies list : output by emit become children app-list
    receiveData(data: any) {
        this.receivedData = data;
    }


    ngOnInit(): void {
    }
}
