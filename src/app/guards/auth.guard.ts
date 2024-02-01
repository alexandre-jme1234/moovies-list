import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
}