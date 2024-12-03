import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);

  const currentUser = authService.getCurrentUser(); // Assuming you have a method to get the current user
  const authentifie = authService.isAdmin(currentUser) || authService.isUser(currentUser);
  if (authentifie) {
    console.log("Vous êtes connecté, navigation autorisée !");
    return true;
  } else {
    console.log("Vous n'êtes pas connecté ! Navigation refusée !");
    router.navigate(['/home']);
    return false;
  }
};
