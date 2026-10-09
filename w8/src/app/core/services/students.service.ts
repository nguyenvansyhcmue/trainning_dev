import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student.models';
@Injectable({ providedIn: 'root' })
export class StudentsService {
  private readonly http = inject(HttpClient);
  getStudents(): Observable<Student[]> { return this.http.get<Student[]>('assets/students.json'); }
}
