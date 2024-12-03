import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenduDirective } from '../shared/rendu.directive';
import { NonRenduDirective } from '../shared/non-rendu.directive';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OnInit } from '@angular/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import {ChangeDetectionStrategy} from '@angular/core';
import { Assignements } from './assignements.model';
import { AssignmentDetailComponent } from "./assignment-detail/assignment-detail.component";
import { MatListModule } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import { AddAssignmentComponent } from "./add-assignment/add-assignment.component";

import { AssignmentsService } from '../shared/assignments.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { BehaviorSubject } from 'rxjs';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';

import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';




@Component({
  selector: 'app-assignements',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule, RenduDirective, NonRenduDirective, FormsModule, 
    MatButtonModule, MatInputModule, MatDatepickerModule, MatFormFieldModule, 
    MatListModule, MatDivider, RouterLink , MatPaginatorModule , MatSelectModule
   , MatIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './assignements.component.html',
  styleUrl: './assignements.component.css'
})
export class AssignementsComponent implements OnInit {

  //pour gérer la pagination 
  page: number = 1;
  limit: number = 10; 
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasPrevPage!: boolean;
  hasNextPage!: boolean;
  
  pageSizeOptions = [5, 10, 25, 50];


  titre = "Mon application sur les Assignments !";
  assignmentSelectionne!: Assignements;
  formVisible = false;
  assignments: BehaviorSubject<Assignements[]> = new BehaviorSubject<Assignements[]>([]);

  constructor (private assignmentService:AssignmentsService, private authService: AuthService) {}
  
  ngOnInit(): void {
    //this.assignments = this.assignmentService.getAssignments();
    this.getAssignments();
  }
  

  assignmentClique(assignment: Assignements) {
    this.assignmentSelectionne = assignment;
  }

  onAddAssignmentBtnClick() {
    //this.formVisible = true;
  }

  goToNextPage() {
    this.page = this.page + 1;
    this.page = this.nextPage;
    this.getAssignments();
    console.log('Page index:', this.page); // Affichage de la page courante
    console.log('Page size:', this.limit);   // Affichage de la taille de la page
    console.log('Total items:', this.totalDocs);
  }

  goToPrevPage() {
    this.page = this.page - 1;
    this.page = this.prevPage;
    this.getAssignments();
  }


  /*
  onNouvelAssignment(event:Assignments){
    //this.assignments.push(event);
    this.assignmentService.addAssignment(event)
    .subscribe(message => console.log(message));
    this.formVisible = false;
  }
*/
getAssignments(): void {
  this.assignmentService.getAssignmentsPagine(this.page, this.limit)
    .subscribe(data => {
      if (Array.isArray(data.docs)) {
        this.assignments.next(data.docs);
      } else {
        console.error('Les données reçues ne sont pas un tableau:', data.docs);
      }
      this.totalDocs = data.totalDocs;
      this.totalPages = data.totalPages;
      this.nextPage = data.nextPage;
      this.prevPage = data.prevPage;
      this.hasPrevPage = data.hasPrevPage;
      this.hasNextPage = data.hasNextPage;
      console.log("Données reçues");
    });
}

  isLoggedIn() {
    return this.authService.isLogged();
  }

  onPageChange(event: PageEvent): void {
    this.limit = event.pageSize;
    this.page = event.pageIndex + 1;
    this.getAssignments();
    console.log('Page index:', this.page); // Affichage de la page courante
    console.log('Page size:', this.limit); // Affichage de la taille de la page
    console.log('Total items:', this.totalDocs);
  }

  isFirstPage(): boolean {
    return this.page === 1;
  }

  isLastPage(): boolean {
    return this.page === this.totalPages;
  }

  nombreTotalAssignments(): number {
    return this.totalDocs;
  }

  calculateTotalPages(): number {
    return Math.ceil(this.totalDocs / this.limit);
  }

  nombreAssignmentsperPage(): number {
    return this.limit;
  }

  currentPage(): number {
    return this.page;
  }

  goToFirstPage(): void {
    this.page = 1;
    this.getAssignments();
  }

  goToLastPage(): void {
    this.page = this.totalPages;
    this.getAssignments();
  }

  onPageSizeChange(event: MatSelectChange): void {
    this.limit = event.value;
    this.page = 1;
    this.getAssignments();
  }


}
