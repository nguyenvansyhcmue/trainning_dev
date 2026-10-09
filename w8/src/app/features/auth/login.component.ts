import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { authFeature } from '../../state/auth/auth.reducer';
import * as AuthActions from '../../state/auth/auth.actions';

@Component({ standalone: true, imports: [AsyncPipe, ReactiveFormsModule], templateUrl: './login.component.html', styleUrl: './login.component.css', changeDetection: ChangeDetectionStrategy.OnPush })
export class LoginComponent {
  private readonly store = inject(Store); private readonly formBuilder = inject(NonNullableFormBuilder);
  readonly loading$ = this.store.select(authFeature.selectLoading); readonly error$ = this.store.select(authFeature.selectError);
  readonly form = this.formBuilder.group({ username: ['', [Validators.required, Validators.minLength(3)]], password: ['', [Validators.required, Validators.minLength(6)]] });
  submit(): void { if (this.form.invalid) { this.form.markAllAsTouched(); return; } this.store.dispatch(AuthActions.login({ request: this.form.getRawValue() })); }
}
