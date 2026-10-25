import {Component, computed, effect, inject, output} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import {Select} from "@fincore-platform/shared-ui";
import {toSignal} from "@angular/core/rxjs-interop";
import {StepperStateService} from "../../services/stepper/stepper-state.service";

@Component({
  selector: 'app-register-account',
  imports: [FormsModule, ReactiveFormsModule, TranslatePipe, Select],
  templateUrl: './register-account.html',
  styleUrls: [ '../../styles/_register_form.scss'],
})
export class RegisterAccount {

  private readonly stepperStateService = inject(StepperStateService);
  private fb = inject(FormBuilder);

  readonly countries = [
    { value: 'BG', label: 'countries.bulgaria' },
    { value: 'UA', label: 'countries.ukraine' },
    { value: 'DE', label: 'countries.germany' },
  ];

  readonly languages = [
    { value: 'en', label: 'languages.english' },
    { value: 'uk', label: 'languages.ukrainian' },
    { value: 'bg', label: 'languages.bulgarian' },
  ];

  readonly accountForm = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    country: ['', Validators.required],
    language: ['en', Validators.required],
  });


  readonly formStatus  = toSignal(this.accountForm.statusChanges, {
    initialValue: this.accountForm.status
  });

  readonly isValid = computed(() => this.formStatus() === 'VALID');

  constructor() {
    effect(() => {
      this.stepperStateService.setStepValidity('account', this.isValid());
    });
  }

}
