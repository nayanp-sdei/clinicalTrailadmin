import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null); // token User
  private loggedIn = new BehaviorSubject<any>(null);
  private message: string;

  getMessage(): string {
    return this.message
  }

  get currentUser() {
    return this.currentUserSubject.asObservable();
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
   }

  constructor(private router: Router) {
    this.message = "";
  }

  login(objUserDetails: any) {
    if (objUserDetails.email =="") {
      localStorage.removeItem("UserDetails");
      this.loggedIn.next(false);
      this.currentUserSubject.next(null);
      this.message = "Please enter valid Email and password !!";
    } else {
   
        objUserDetails['isLoggedIn']=true;
        this.currentUserSubject.next(objUserDetails); // for token use
        this.message = "You are successfully logged in";
        localStorage.setItem("UserDetails", JSON.stringify(objUserDetails));
        this.loggedIn.next(true);
        localStorage.setItem("loggedIn",'true')
        this.router.navigate(['dashboard']);
    }
  }

  logout() {
    // debugger;
    localStorage.clear();
    this.loggedIn.next(false);
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
    this.message = "You are successfully logged in";
  }

}
