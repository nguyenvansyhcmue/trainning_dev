import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course.models';

@Injectable({ providedIn: 'root' })
export class CoursesService {
  private readonly http = inject(HttpClient);

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>('assets/courses.json');
  }
}
