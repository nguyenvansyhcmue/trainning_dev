import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { GradeService } from '../../core/services/grade.service';
import * as GradeActions from './grades.actions';
@Injectable()
export class GradesEffects {
  private readonly actions$ = inject(Actions);
  private readonly gradeService = inject(GradeService);

  saveGrade$ = createEffect(() => this.actions$.pipe(
    ofType(GradeActions.saveGrade),
    exhaustMap(({ record }) => this.gradeService.save(record).pipe(
      map(() => GradeActions.saveGradeSuccess()),
      catchError(() => of(GradeActions.saveGradeFailure({ error: 'Không thể lưu kết quả điểm.' })))
    ))
  ));
}
