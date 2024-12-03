import { Component, Input } from '@angular/core';
import { Assignements } from '../assignements.model';

import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { CommonModule } from '@angular/common';

import { AssignmentsService } from '../../shared/assignments.service';

import { MatButtonModule } from '@angular/material/button';

import { ActivatedRoute, Router } from '@angular/router';

import { provideNativeDateAdapter } from '@angular/material/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/auth.service';




@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ MatCardModule, MatCheckboxModule, CommonModule, MatButtonModule ],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css'
})
export class AssignmentDetailComponent {
  /*@Input()*/ assignmentTransmis!: Assignements | null;

  constructor(private assignmentService:AssignmentsService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private authService: AuthService  
  ) {}

  ngOnInit(): void {
    this.getAssignment();
  }

  getAssignment(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.assignmentService.getAssignment(id)
      .subscribe(assignment => this.assignmentTransmis = assignment ?? null);
  }

  onAssignmentRendu(){
    if (this.assignmentTransmis) {
      this.assignmentTransmis.rendu = true;

      this.assignmentService.updateAssignment(this.assignmentTransmis)
        .subscribe(message => {
          console.log(message);
          this.getAssignment(); // Refresh the data
          this.router.navigate(['/home']);
        });
    }
  }

  onDelete(){
    if (!this.assignmentTransmis) return;
    this.assignmentService.deleteAssignment(this.assignmentTransmis)
    .subscribe((message) => console.log(message));
    /*this.assignmentTransmis = null;*/
    this.getAssignment(); // Refresh the data
    this.router.navigate(['/assignments']);
  }

  onClickEdit(){
    this.router.navigate(["/assignment", this.assignmentTransmis?.id, 'edit'], 
      {queryParams:{nom:this.assignmentTransmis?.nom}, fragment:'edition'}
    );
  }
  
  isAdmin():boolean {
    return this.authService.loggedIn && this.authService.getCurrentUserRole() === 'admin';
      ;
  }
}
