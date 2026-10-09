import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { combineLatest, map } from 'rxjs';
import { GradeService } from '../../core/services/grade.service';
import { StudentsService } from '../../core/services/students.service';

@Component({
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './student-results.component.html',
  styleUrl: './student-results.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentResultsComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly studentsService = inject(StudentsService);
  private readonly gradeService = inject(GradeService);

  readonly result$ = combineLatest([
    this.route.paramMap,
    this.studentsService.getStudents(),
    this.gradeService.records$
  ]).pipe(
    map(([params, students, grades]) => {
      const studentId = params.get('studentId') ?? '';
      const student = students.find(item => item.studentId === studentId);

      return {
        student,
        grades: grades.filter(record => record.studentId === studentId)
      };
    })
  );
}
