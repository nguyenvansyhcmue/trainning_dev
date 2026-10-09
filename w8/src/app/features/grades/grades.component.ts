import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { gradesFeature } from '../../state/grades/grades.reducer';
import * as GradeActions from '../../state/grades/grades.actions';
import * as AuthActions from '../../state/auth/auth.actions';
@Component({ standalone: true, imports: [AsyncPipe, ReactiveFormsModule, RouterLink], templateUrl: './grades.component.html', styleUrl: './grades.component.css', changeDetection: ChangeDetectionStrategy.OnPush })
export class GradesComponent {
  private readonly store = inject(Store);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  readonly saving$ = this.store.select(gradesFeature.selectSaving);
  readonly saved$ = this.store.select(gradesFeature.selectSaved);
  readonly error$ = this.store.select(gradesFeature.selectError);
  readonly gradeForm = this.formBuilder.group({
    studentId: ['', Validators.required],
    subject: ['', Validators.required],
    attendance: [10, [Validators.min(0), Validators.max(10)]],
    midterm: [8, [Validators.min(0), Validators.max(10)]],
    final: [8, [Validators.min(0), Validators.max(10)]]
  });

  submit(): void {
    if (this.gradeForm.invalid) {
      this.gradeForm.markAllAsTouched();
      return;
    }
    this.store.dispatch(GradeActions.saveGrade({ record: this.gradeForm.getRawValue() }));
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
