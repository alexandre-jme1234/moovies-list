import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AuthComponent } from "./components/auth/auth.component";
import { TopCommentsComponent } from "./components/top-comments/top-comments.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, AuthComponent, TopCommentsComponent]
})
export class AppComponent {
  title = 'moovies-list';
}
