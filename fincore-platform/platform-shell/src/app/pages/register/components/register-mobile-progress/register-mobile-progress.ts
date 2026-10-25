import { Component, input, Signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { RegistrationStep } from '../../interfaces/register.interface';

@Component({
  selector: 'app-register-mobile-progress',
  imports: [TranslatePipe],
  templateUrl: './register-mobile-progress.html',
  styleUrl: './register-mobile-progress.scss',
})
export class RegisterMobileProgress {
  readonly currentStep: Signal<number> = input();
  readonly activeStep: Signal<RegistrationStep> = input();
  readonly steps: Signal<RegistrationStep[]> = input();
}
