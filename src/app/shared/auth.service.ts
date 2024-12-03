import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //loggedIn = true;
  loggedIn = false;
  password: string = '';
  login: string = '';
  role: string = '';

  private users = [
    { login: 'admin', password: 'admin123', role: 'admin' },
    { login: 'user', password: 'user123', role: 'user' }
  ];

  private currentUser: { login: string, role: string } | null = null;

  logIn( login?: string, password?: string, role?: string) {
    this.loggedIn = true;
    this.login = login || '';
    this.password = password || '';
    this.role = role || '';
    return true;
  }

  logOut() {
    this.loggedIn = false;
    this.login = '';
    this.password = '';
    this.role = '';
    this.currentUser = null;
  }

  isAdmin(currentUser: { login: string, role: string } | null) {
    const isUserAdmin = currentUser?.role === 'admin';
    return isUserAdmin;
  }

  isUser(currentUser: { login: string, role: string } | null) {
    const isUserUser = currentUser?.role === 'user';
    return isUserUser;
  }

  validateUser(login: string, password: string) {
    const user = this.users.find(
      u => u.login === login && u.password === password
    );
    if (user) {
      this.currentUser = { login: user.login, role: user.role };
      return true;
    }
    return false;
  } 

  getCurrentUser() {
    return this.currentUser;
  }

  getCurrentUserRole() {
    return this.currentUser?.role || null;
  }

  isLogged() {
    return this.loggedIn;
  }
  
}
