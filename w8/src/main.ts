import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { authFeature } from './app/state/auth/auth.reducer';
import { AuthEffects } from './app/state/auth/auth.effects';
import { StudentsEffects } from './app/state/students/students.effects';
import { studentsFeature } from './app/state/students/students.reducer';
import { gradesFeature } from './app/state/grades/grades.reducer';
import { GradesEffects } from './app/state/grades/grades.effects';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({ auth: authFeature.reducer, students: studentsFeature.reducer, grades: gradesFeature.reducer }),
    provideEffects([AuthEffects, StudentsEffects, GradesEffects])
  ]
}).catch(error => console.error(error));
