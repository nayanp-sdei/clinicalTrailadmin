import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '@app/component/auth/services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _authService: AuthService, private router: Router) {
  }

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     return this._authService.currentUser.pipe(
//       map((currentUser: any) => {
//         debugger
//         if (!currentUser) {
//           console.log("isLoggedIn",currentUser);
          
//           this.router.navigate(['/auth/login']);
//           return false;
//         } else {
//           return true;
//         }
//       })
//     )
//   }
canActivate() {
  if (localStorage.getItem('loggedIn')) {
      return true;
  }else{
    this.router.navigate(['/auth/login']);
    return false;
  }
  }

  
}
