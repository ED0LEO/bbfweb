import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (state.url.startsWith('/user-update/')) {
      // Check if the route is for user update
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
        this.router.navigate(['/user-login'], { queryParams: { returnUrl: state.url } });
        return false;
      }
    } else if (state.url === '/rewards') {
      // Check if the route is for rewards page
      if (this.authService.isLoggedIn) {
        // User is authenticated, allow access to the rewards page
        return true;
      } else {
        // User is not authenticated, redirect to the login page
        this.router.navigate(['/user-login'], { queryParams: { returnUrl: state.url } });
        return false;
      }
    } else {
      // For other routes, allow access
      return true;
    }
  }
}
