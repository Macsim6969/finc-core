import { computed, Injectable, Signal, signal } from '@angular/core';
import { RegistrationPurpose } from '../../types/register.type';
import { RegistrationStep } from '../../interfaces/register.interface';
import { COMMON_STEPS } from '../../constants/register-steps-purpose.constant';

@Injectable()
export class RegisterStateService {
  private _purpose = signal<RegistrationPurpose>('personal');
  private _currentStep = signal<number>(0);
  private _steps = signal<RegistrationStep[]>(COMMON_STEPS);

  set purpose(purpose: RegistrationPurpose | null) {
    this._purpose.set(purpose);
  }

  get purpose(): Signal<RegistrationPurpose> {
    return this._purpose;
  }

  get currentStep(): Signal<number> {
    return this._currentStep;
  }

  readonly activeStep = computed(() => this.steps()[this.currentStep()]);

  readonly isLastStep = computed(() => this.currentStep() === this.steps().length - 1);

  public nextStep() {
    this._currentStep.update(step => step + 1);
  }

  public previousStep(): void {
    this._currentStep.update(step => step - 1);
  }

  set steps(steps: RegistrationStep[]) {
    this._steps.set(steps);
  }

  get steps(): Signal<RegistrationStep[]> {
    return this._steps;
  }
}
