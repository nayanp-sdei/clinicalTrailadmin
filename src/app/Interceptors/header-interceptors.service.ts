import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../component/auth/services';

@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptors implements HttpInterceptor {
request: any;
  currentUser: any;
  isLoggedIn: boolean=false ;
  constructor(private _authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  

    this._authService.isLoggedIn.subscribe(res => {
      this.isLoggedIn = res;
    });

    if (this.isLoggedIn) {
      
      this._authService.currentUser.subscribe(res => {
        this.currentUser = res;
      });

      // console.log(req);

      if (req.headers.has('isImage')) {
        console.log("this request",req.headers);
        
        this.request = req.clone({ headers: req.headers.delete('isImage') });
       this. request = req.clone({
          setHeaders: {
            'Authorization': `Bearer ${this.currentUser.token}`
          }
        });
      } else {
        this.request = req.clone({
          setHeaders: {
            'Authorization': `Bearer ${this.currentUser.token}`,
            'Content-Type': 'application/json'
          }
        });
      }
    } else {
     this.request = req.clone({
        setHeaders: {
          'Content-Type': 'application/json'
        }
      });
    }

    return next.handle(this.request);
  }

}

















