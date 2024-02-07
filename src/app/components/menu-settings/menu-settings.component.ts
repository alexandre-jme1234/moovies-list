import { Component, OnInit } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-settings',
  standalone: true,
  imports: [ MatMenuModule, MatButtonModule],
  templateUrl: './menu-settings.component.html',
  styleUrl: './menu-settings.component.scss'
})
export class MenuSettingsComponent implements OnInit{

  constructor(private authService: AuthService, private router: Router){}

  ngOnInit(): void {
  };

  goEdit() {
    return this.router.navigateByUrl('/settings');
  }
 
  get auth() {
    return this.authService;
  }
}
