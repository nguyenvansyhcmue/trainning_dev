import { createFeature, createReducer, on } from '@ngrx/store';
import { StudentsState } from '../../core/models/student.models';
import * as Actions from './students.actions';
const initialState: StudentsState = { items: [], loading: false, error: null };
export const studentsFeature = createFeature({ name: 'students', reducer: createReducer(initialState,
  on(Actions.loadStudents, state => ({ ...state, loading: true, error: null })),
  on(Actions.loadStudentsSuccess, (state, { items }) => ({ ...state, items, loading: false })),
  on(Actions.loadStudentsFailure, (state, { error }) => ({ ...state, loading: false, error }))
)});
