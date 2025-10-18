import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  emailCtrl = new FormControl('tharidu@gmail.com', [Validators.required, Validators.email]);

  loginFormGroup = new FormGroup({
    email: this.emailCtrl,
    password: new FormControl('Sa34@@111', [Validators.required, Validators.minLength(3)]),
  });

  constructor(private router: Router) { }

  onLogin() {
    console.log(this.loginFormGroup.value)
    this.router.navigate(['admin']);
  }
}
