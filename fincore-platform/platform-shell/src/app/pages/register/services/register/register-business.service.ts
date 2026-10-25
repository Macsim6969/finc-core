import { Injectable, inject, computed } from '@angular/core';
import { RegistrationPurpose } from '../../types/register.type';
import { RegisterStateService } from './register-state.service';
import { RegistrationStep } from '../../interfaces/register.interface';
import {
  BANK_STEPS,
  BROKER_STEPS,
  COMMON_STEPS,
  COMPANY_STEPS,
  PERSONAL_STEPS,
  REVIEW_STEPS,
} from '../../constants/register-steps-purpose.constant';

@Injectable()
export class RegisterBusinessService {
  public readonly registerState = inject(RegisterStateService);

  public setPurpose(purpose: RegistrationPurpose): void {
    this.registerState.purpose = purpose;

    this.registerState.steps = this.buildSteps(purpose);
  }

  public previous(): void {
    if (this.registerState.currentStep() > 0) {
      this.registerState.previousStep();
    }
  }

  private buildSteps(purpose: RegistrationPurpose): RegistrationStep[] {
    const common: RegistrationStep[] = COMMON_STEPS;

    switch (purpose) {
      case 'personal':
        return [...common, ...PERSONAL_STEPS, ...REVIEW_STEPS];

      case 'company':
        return [...common, ...COMPANY_STEPS, ...REVIEW_STEPS];

      case 'bank':
        return [...common, ...BANK_STEPS, ...REVIEW_STEPS];

      case 'broker':
        return [...common, ...BROKER_STEPS, ...REVIEW_STEPS];

      default:
        return common;
    }
  }
}
