import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Assignements } from '../assignements.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-assignment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [FormsModule, MatInputModule, MatButtonModule, MatFormFieldModule, MatDatepickerModule],
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {
  assignment: Assignements | undefined;
  nomAssignment = '';
  dateDeRendu?: Date = undefined;

  constructor(
    private assignmentsService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAssignment();

    //affichage des queryParams et fragment

    console.log("Query Params : ");
    console.log(this.route.snapshot.queryParams);
    console.log("Fragment : ");
    console.log(this.route.snapshot.fragment);
    
  }

  getAssignment(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.assignmentsService.getAssignment(id)
      .subscribe(assignment => {
        if (assignment) {
          this.assignment = assignment;
          this.nomAssignment = assignment.nom;
          this.dateDeRendu = assignment.dateDeRendu;
        }
      });
  }

  onSaveAssignment(): void {
    if (!this.assignment) return;
    if (this.nomAssignment === '' || this.dateDeRendu === undefined) return;

    this.assignment.nom = this.nomAssignment;
    this.assignment.dateDeRendu = this.dateDeRendu;
    this.assignmentsService.updateAssignment(this.assignment)
      .subscribe((message) => {
        console.log(message);
        this.router.navigate(['/home']);
      });
  }
}