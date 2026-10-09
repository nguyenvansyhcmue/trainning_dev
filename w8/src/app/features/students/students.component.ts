import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ChangeDetectionStrategy, Component, HostListener, inject } from '@angular/core';
import { GradeDialogComponent } from '../grades/grade-dialog.component';
import { Store } from '@ngrx/store';
import * as StudentActions from '../../state/students/students.actions';
import * as AuthActions from '../../state/auth/auth.actions';
import { studentsFeature } from '../../state/students/students.reducer';
import { GradeService } from '../../core/services/grade.service';
import { combineLatest, map } from 'rxjs';
@Component({
  standalone: true,
  imports: [AsyncPipe, GradeDialogComponent, RouterLink],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentsComponent {
  private readonly store = inject(Store);
  private readonly gradeService = inject(GradeService);
  readonly students$ = this.store.select(studentsFeature.selectItems);
  readonly loading$ = this.store.select(studentsFeature.selectLoading);
  readonly error$ = this.store.select(studentsFeature.selectError);
  readonly studentsWithGrades$ = combineLatest([
    this.students$,
    this.gradeService.records$
  ]).pipe(
    map(([students, grades]) => students.map(student => ({
      student,
      grade: grades.find(record => record.studentId === student.studentId)
    })))
  );
  isGradeDialogOpen = false;
  isUserMenuOpen = false;
  private resizingHeaderCell: HTMLElement | null = null;
  private resizeStartX = 0;
  private resizeStartWidth = 0;
  constructor() {
    this.store.dispatch(StudentActions.loadStudents());
  }

  openGradeDialog(): void {
    this.isGradeDialogOpen = true;
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  toggleUserMenu(): void {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  closeUserMenuOnOutsideClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.page-header')) {
      this.isUserMenuOpen = false;
    }
  }

  closeGradeDialog(): void {
    this.isGradeDialogOpen = false;
  }

  startColumnResize(event: PointerEvent): void {
    const headerCell = event.currentTarget as HTMLElement;
    this.resizingHeaderCell = headerCell;
    this.resizeStartX = event.clientX;
    this.resizeStartWidth = headerCell.getBoundingClientRect().width;
    headerCell.setPointerCapture?.(event.pointerId);
    event.preventDefault();
  }

  @HostListener('document:pointermove', ['$event'])
  resizeColumn(event: PointerEvent): void {
    if (!this.resizingHeaderCell) return;

    const nextWidth = Math.max(
      92,
      this.resizeStartWidth + event.clientX - this.resizeStartX
    );
    this.resizingHeaderCell.style.width = `${nextWidth}px`;
  }

  @HostListener('document:pointerup')
  stopColumnResize(): void {
    this.resizingHeaderCell = null;
  }
}
