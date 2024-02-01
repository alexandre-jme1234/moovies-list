import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/connexion' },
    {path: 'connexion', loadComponent: () => import('./components/auth/auth.component').then(mod => mod.AuthComponent)},
    {path: 'registration', loadComponent: () => import('./components/registration/registration.component').then(mod => mod.RegistrationComponent)},
    {path: 'home', loadComponent: () => import('./components/moovies-list/moovies-list.component').then(mod => mod.MooviesListComponent)},
    { path: '**', loadComponent: () => import('./components/auth/auth.component').then(mod => mod.AuthComponent) },

];
