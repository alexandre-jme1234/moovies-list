import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';



export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: '/connexion'},
    {path: 'connexion', loadComponent: () => import('./components/auth/auth.component').then(mod => mod.AuthComponent) },
    {path: 'registration', loadComponent: () => import('./components/registration/registration.component').then(mod => mod.RegistrationComponent)},
    {path: 'home', loadComponent: () => import('./components/home/home.component').then(mod => mod.HomeComponent), /* canActivate: [authGuard] */ },
    { path: '**', loadComponent: () => import('./components/auth/auth.component').then(mod => mod.AuthComponent)},

];
