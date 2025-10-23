import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  providers: [AuthService] // ✅ Provide AuthService here
})
export class Login {
  loginFormGroup = new FormGroup({
    username: new FormControl('sathsara', [Validators.required]),
    password: new FormControl('Sa34@@111', [Validators.required, Validators.minLength(3)]),
  });

  constructor(private router: Router, private store: Store, private authService: AuthService) {}

  onLogin() {
    const value = this.loginFormGroup.value;
    this.authService.signIn(value.username ?? '', value.password ?? '')
      .subscribe({
        next: (res) => {
          console.log('Login successful', res);
          this.router.navigate(['admin']);
        },
        error: (err) => {
          console.error('Login failed', err);
        }
      });
  }
}



  //emailCtrl = new FormControl('tharidu@gmail.com', [Validators.required, Validators.email]);

  //loginFormGroup = new FormGroup({
    //email: this.emailCtrl,
    //password: new FormControl('Sa34@@111', [Validators.required, Validators.minLength(3)]),
  //});

  //constructor(private router: Router) { }

  //onLogin() {
    //console.log(this.loginFormGroup.value)
    //this.router.navigate(['admin']);
  //}

  //onLogin() {
    //console.log(this.loginFormGroup.value)
    //this.router.navigate(['admin']);
  //}