import { Component /* EventEmitter, Output */} from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Assignements } from '../assignements.model';
import { AssignmentDetailComponent } from "../assignment-detail/assignment-detail.component";
import { MatListModule } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import {provideNativeDateAdapter} from '@angular/material/core';

import { AssignmentsService } from '../../shared/assignments.service';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ CommonModule, FormsModule, MatButtonModule, MatInputModule, MatDatepickerModule, MatFormFieldModule, MatListModule],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css'
})
export class AddAssignmentComponent {
  //@Output() nouvelAssignment = new EventEmitter<Assignments>();

  nomDevoir:string = '';
  dateDeRendu:Date = new Date();

  constructor(private assignmentService:AssignmentsService) {}

  onSubmit() {
    const newAssignment = new Assignements();
    newAssignment.id = 1000+Math.floor(Math.random() * 1000);
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateDeRendu;
    newAssignment.rendu = false;
    //this.assignments.push(newAssignment);
    //this.nouvelAssignment.emit(newAssignment);
    this.assignmentService.addAssignment(newAssignment).
    subscribe(message => console.log(message));
  }
}
