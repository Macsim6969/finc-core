import { Component, inject, input, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { RegistrationPurpose } from '../../types/register.type';
import { RegistrationStep } from '../../interfaces/register.interface';

@Component({
  selector: 'app-register-sidebar',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './register-sidebar.html',
  styleUrl: './register-sidebar.scss',
})
export class RegisterSidebar {
  public purpose = input<RegistrationPurpose | null>();
  readonly currentStep: Signal<number> = input();
  readonly steps: Signal<RegistrationStep[]> = input();
}
