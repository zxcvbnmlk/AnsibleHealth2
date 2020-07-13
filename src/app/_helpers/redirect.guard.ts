import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '@app/_services';

@Injectable({ providedIn: 'root' })
export class RedirectGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const currentUser = this.authenticationService.currentUserValue;
      if (currentUser) {
        const url =  currentUser.role === 'Admin' ? '/admin' : '/user';
        this.router.navigate([url]);
      } else {
        this.router.navigate(['/']);
      }

        return true;

    }
}
