import { createAction, props } from '@ngrx/store';
import { GradeInput } from '../../core/models/grade.models';
export const saveGrade = createAction('[Grades] Save', props<{ record: GradeInput }>());
export const saveGradeSuccess = createAction('[Grades] Save Success');
export const saveGradeFailure = createAction('[Grades] Save Failure', props<{ error: string }>());
export const resetGradeState = createAction('[Grades] Reset State');
