import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {


  constructor(private authService: AuthService,private router:Router) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const { firstName, lastName, email, password } = form.value;
      this.authService.signup(firstName, lastName, email, password);
      alert('Signup successful. Please log in.');
      this.router.navigate(['login']);
      form.resetForm();
    }
  }


}
