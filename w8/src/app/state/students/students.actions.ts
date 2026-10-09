import { createAction, props } from '@ngrx/store';
import { Student } from '../../core/models/student.models';
export const loadStudents = createAction('[Students] Load');
export const loadStudentsSuccess = createAction('[Students] Load Success', props<{ items: Student[] }>());
export const loadStudentsFailure = createAction('[Students] Load Failure', props<{ error: string }>());
