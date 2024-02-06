import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

//Authenticated Guard
export const authGuard: CanActivateFn = (_route, _state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if(authService.isAuth()){
    return true
  } else {
    router.navigateByUrl('/connexion');
    return false;
  }
  
};
