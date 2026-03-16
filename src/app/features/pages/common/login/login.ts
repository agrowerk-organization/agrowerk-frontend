import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginBranding } from "./login-branding/login-branding";
import { LoginForm } from './login-form/login-form';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, LoginBranding, LoginForm],
  templateUrl: './login.html'
})
export class Login {

}
