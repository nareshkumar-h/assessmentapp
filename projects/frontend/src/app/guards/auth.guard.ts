import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { SecurityService } from 'projects/security/src/public-api';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private securityService:SecurityService, private router:Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let isAuthenticated = this.securityService.isAuthenticated();
      //console.log(isAuthenticated);
      let url: string = state.url;
      
      if(!isAuthenticated){
        this.router.navigate(['auth/login']);
      }
      return isAuthenticated;
  }
  
}
