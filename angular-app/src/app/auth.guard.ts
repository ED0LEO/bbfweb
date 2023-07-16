import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn) {
      // Get the userId from the AuthService
      const userId = this.authService.getUserId();

      // Get the id parameter from the route
      const idParam = route.params['id'];

      // Check if the user is authorized to access the update page for the given id
      if (userId !== undefined && userId === +idParam) {
        // User is authenticated and authorized, allow access to the route
        return true;
      } else {
        // User is not authorized, redirect to the login page or some other page
        this.router.navigate(['/error']);
        return false;
      }
    } else {
      // User is not authenticated, redirect to the login page
      this.router.navigate(['/user-login']);
      return false;
    }
  }
}
