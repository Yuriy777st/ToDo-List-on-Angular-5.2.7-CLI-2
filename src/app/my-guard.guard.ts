import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MyGuardGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate() {
        if (sessionStorage.getItem('currentUser')) {
            return true;
        }

        this.router.navigate(['/login']);
        return false;
    }
}
