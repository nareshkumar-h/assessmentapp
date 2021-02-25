import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  ActivatedRoute,
} from '@angular/router';
import { SecurityService } from 'projects/security/src/public-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private securityService: SecurityService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let isAuthenticated = this.securityService.isAuthenticated();
    console.log(isAuthenticated);
    console.log(this.route.snapshot.data);
    let url: string = state.url;
    console.log(url);
    if (!isAuthenticated) {
      this.router.navigate(['auth/login']);
    }
    return isAuthenticated;
  }
}
