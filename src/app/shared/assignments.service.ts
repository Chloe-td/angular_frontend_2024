import { Injectable } from '@angular/core';
import { Assignements } from '../assignements/assignements.model';
import { catchError, Observable, of, forkJoin } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { bdInitialAssignments } from './data';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  private HttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  url = ' https://m1miage2024-api.onrender.com/api/assignments';

  assignments: Assignements[] = [];
  getAssignmentById: any;

  constructor(private loggingService:LoggingService, 
              private http:HttpClient) { 
  }

  getAssignments():Observable<Assignements[]>{
    return this.http.get<Assignements[]>(this.url);
  }


  getAssignment(id:number):Observable<Assignements| undefined>{
    //const a:Assignements|undefined = this.assignments.find(a => a.id === id);
    //return of(a);
    return this.http.get<Assignements>(this.url + '/' + id)
    .pipe(catchError(this.handleError<any>('### catchError: getAssignments by id avec id=' + id))
  );
  }

  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);
 
      return of(result as T);
    }
 };
 

  addAssignment(assignment:Assignements):Observable<any>{
    //this.assignments.push(assignment);
    //this.loggingService.log(assignment.nom, "ajouté");
    //return of("Assignment ajouté !");
    return this.http.post<Assignements>(this.url, assignment, this.HttpOptions);
  }

  updateAssignment(assignment:Assignements):Observable<any>{
    //return of("assignment service: assignment modifié !")
    return this.http.put<Assignements>(this.url, assignment, this.HttpOptions);
  }

  deleteAssignment(assignment:Assignements):Observable<string>{
    //let pos = this.assignments.indexOf(assignment);
    //this.assignments.splice(pos, 1);
    //this.loggingService.log(assignment.nom, "supprimé");

    //return of("Assignment service: assignment supprimé !");
    let deleteURI = this.url + '/' + assignment._id;
    return this.http.delete<string>(deleteURI);
  }

  peuplerBDavecForkJoin():Observable<any> {
    let appelsVersAddAssignment:Observable<any>[] = [];
 
      bdInitialAssignments.forEach(a => {
      const nouvelAssignment = new Assignements();
      nouvelAssignment.id = a.id;
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
      nouvelAssignment.rendu = a.rendu;
 
      appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment))
    });
 
    return forkJoin(appelsVersAddAssignment);
  }

  getAssignmentsPagine(page:number, limit:number):Observable<any> {
    return this.http.get<any>(this.url + '?page=' + page + '&limit=' + limit);
  }


}
