import { Routes } from '@angular/router';
import { AssignementsComponent } from './assignements/assignements.component';
import { AddAssignmentComponent } from './assignements/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './assignements/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './assignements/edit-assignment/edit-assignment.component';
import { authGuard } from './shared/auth.guard';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: AssignementsComponent },
    { path: 'add', component: AddAssignmentComponent },
    { path: 'assignments', component: AssignementsComponent },
    { path: 'assignment/:id', component: AssignmentDetailComponent, canActivate: [authGuard] }, 
    { path: 'assignment/:id/edit', component: EditAssignmentComponent, canActivate: [authGuard] },
    { path: 'login', component: LoginComponent }

];

