import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email="";
  password="";
  errorMsg ="";

  constructor(private auth:AuthService,private router:Router){}

  login(){
    if(this.email.trim().length ===0){
      this.errorMsg="Email is Required"
    }else if(this.password.trim().length ===0){
      this.errorMsg="Password is Required"
    }else{
      this.errorMsg="";
      const isAuthenticated = this.auth.login(this.email, this.password);
      if (isAuthenticated) {
        this.router.navigate(['home']);
      } else {
        this.errorMsg = "Invalid Credentials";
      }
    }
  }
  
}
