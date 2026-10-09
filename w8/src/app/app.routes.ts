import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'students' },
  { path: 'login', loadComponent: () => import('./features/auth/login.component').then(m => m.LoginComponent) },
  { path: 'students', canActivate: [authGuard, adminGuard], loadComponent: () => import('./features/students/students.component').then(m => m.StudentsComponent) },
  { path: 'students/:studentId/results', canActivate: [authGuard, adminGuard], loadComponent: () => import('./features/students/student-results.component').then(m => m.StudentResultsComponent) },
  { path: 'grades', canActivate: [authGuard, adminGuard], loadComponent: () => import('./features/grades/grades.component').then(m => m.GradesComponent) },
  { path: '**', redirectTo: 'students' }
];
