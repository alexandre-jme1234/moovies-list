import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';



export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/connexion'},
    {path: 'connexion', loadComponent: () => import('./components/auth/auth.component').then(mod => mod.AuthComponent) },
    {path: 'registration', loadComponent: () => import('./components/registration/registration.component').then(mod => mod.RegistrationComponent)},
    {path: 'settings', loadComponent: () => import('./components/edit-profil/edit-profil.component').then(mod => mod.EditProfilComponent)},
    {path: 'home', loadComponent: () => import('./components/home/home.component').then(mod => mod.HomeComponent), /* canActivate: [authGuard] */ },
    {path: 'home/:id', loadComponent: () => import('./components/movie-detail/movie-detail.component').then(mod => mod.MovieDetailComponent), /* canActivate: [authGuard] */ },
    { path: '**', loadComponent: () => import('./components/auth/auth.component').then(mod => mod.AuthComponent)},

];
