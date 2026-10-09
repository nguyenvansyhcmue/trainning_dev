import { createFeature, createReducer, on } from '@ngrx/store';
import { GradeState } from '../../core/models/grade.models';
import * as GradeActions from './grades.actions';
const initialState: GradeState = { saving: false, saved: false, error: null };
export const gradesFeature = createFeature({ name: 'grades', reducer: createReducer(initialState,
  on(GradeActions.saveGrade, state => ({ ...state, saving: true, saved: false, error: null })),
  on(GradeActions.saveGradeSuccess, state => ({ ...state, saving: false, saved: true })),
  on(GradeActions.saveGradeFailure, (state, { error }) => ({ ...state, saving: false, error })),
  on(GradeActions.resetGradeState, () => initialState)
)});
