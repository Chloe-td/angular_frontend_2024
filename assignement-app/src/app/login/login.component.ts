import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormsModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.authService.validateUser(this.login, this.password)) {
      console.log('Login successful');
      this.router.navigate(['/assignments']); // Redirige vers la page des assignments
      this.authService.loggedIn = true;

    } else {
      console.log('Login failed');
      this.authService.loggedIn = false;
      alert('Login failed: Incorrect username or password');
    }
  }
}
