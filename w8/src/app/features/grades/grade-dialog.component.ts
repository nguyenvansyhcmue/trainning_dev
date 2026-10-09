import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs';
import { gradesFeature } from '../../state/grades/grades.reducer';
import * as GradeActions from '../../state/grades/grades.actions';
import { CoursesService } from '../../core/services/courses.service';

@Component({
  selector: 'app-grade-dialog',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './grade-dialog.component.html',
  styleUrl: './grade-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GradeDialogComponent {
  @Output() readonly closed = new EventEmitter<void>();
  private readonly store = inject(Store);
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly coursesService = inject(CoursesService);
  readonly saving$ = this.store.select(gradesFeature.selectSaving);
  readonly saved$ = this.store.select(gradesFeature.selectSaved);
  readonly error$ = this.store.select(gradesFeature.selectError);
  readonly courses$ = this.coursesService.getCourses();
  readonly gradeForm = this.formBuilder.group({
    studentId: ['', Validators.required],
    subject: ['', Validators.required],
    attendance: [10, [Validators.min(0), Validators.max(10)]],
    midterm: [8, [Validators.min(0), Validators.max(10)]],
    final: [8, [Validators.min(0), Validators.max(10)]]
  });

  constructor() {
    this.store.dispatch(GradeActions.resetGradeState());
    this.saved$
      .pipe(filter(saved => saved), take(1))
      .subscribe(() => this.closed.emit());
  }

  submit(): void {
    if (this.gradeForm.invalid) {
      this.gradeForm.markAllAsTouched();
      return;
    }
    this.store.dispatch(GradeActions.saveGrade({ record: this.gradeForm.getRawValue() }));
  }
}
