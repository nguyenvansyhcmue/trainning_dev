import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { StudentsService } from '../../core/services/students.service';
import * as StudentActions from './students.actions';
@Injectable()
export class StudentsEffects {
  private readonly actions$ = inject(Actions);
  private readonly studentsService = inject(StudentsService);
  loadStudents$ = createEffect(() => this.actions$.pipe(
    ofType(StudentActions.loadStudents),
    exhaustMap(() => this.studentsService.getStudents().pipe(
      map(items => StudentActions.loadStudentsSuccess({ items })),
      catchError(() => of(StudentActions.loadStudentsFailure({ error: 'Không thể đọc danh sách sinh viên.' })))
    ))
  ));
}
