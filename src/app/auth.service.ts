import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users: { email: string, password: string }[] = [];

  constructor(private router:Router) { }

  
  // loin(uname:string, pword:string){
  //   if(uname==='admin' && pword==='admin123'){
  //     return 200;
  //   }else{
  //     return 403;
  //   }
  // }

  login(email: string, password: string): boolean {
    return this.users.some(user => user.email === email && user.password === password);
  }

  signup(firstName: string, lastName: string, email: string, password: string) {
    this.users.push({ email, password });
  }

  logout(){
    this.router.navigate(['login'])
  }
}
