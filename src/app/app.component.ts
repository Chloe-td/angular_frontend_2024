import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { AssignementsComponent } from './assignements/assignements.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatNavList } from '@angular/material/list';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';
import { AssignmentsService } from './shared/assignments.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButtonModule, MatIconModule, MatDividerModule, 
    MatToolbarModule, MatSidenavModule, MatListModule, RouterLink, MatSlideToggleModule, MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Application de gestion des devoirs à rendre (Assignments)';
  opened = false;

  constructor(private authService: AuthService, private router: Router, private assignmentsService: AssignmentsService) {}

  login() {
    if (!this.authService.loggedIn) {
      this.router.navigate(['/login']);
    } else {
      this.authService.logOut();
      this.router.navigate(['/home']);
    }
  }

  isLogged() {
    return this.authService.loggedIn;
  }

  logout() {
    this.authService.logOut();
    console.log('Logout successful');
    this.router.navigate(['/home']);
  }

  peuplerBD() {
    // version naive et simple
    //this.assignmentsService.peuplerBD();
 
    // meilleure version :
    this.assignmentsService.peuplerBDavecForkJoin()
      .subscribe(() => {
    console.log("LA BD A ETE PEUPLEE, TOUS LES ASSIGNMENTS AJOUTES, ON RE-AFFICHE LA LISTE");
    // replaceUrl = true = force le refresh, même si
    // on est déjà sur la page d’accueil
    // Marche plus avec la dernière version d’angular
    // this.router.navigate(["/home"], {replaceUrl:true});
    // ceci marche….
    window.location.reload();
      })
  }
 

  
}
