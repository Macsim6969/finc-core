import {Component, computed, input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {TranslatePipe} from "@ngx-translate/core";
import {RegistrationStep} from "./interfaces/register-sidebar-registration-step.interface";
import {RegistrationPurpose} from "../../interfaces/registration-purpose.interface";
import {RegisterBusinessService} from "../../services/register-business.service";
import {inject} from "vitest";

@Component({
  selector: 'app-register-sidebar',
    imports: [
        RouterLink,
        TranslatePipe
    ],
  templateUrl: './register-sidebar.html',
  styleUrl: './register-sidebar.scss',
})
export class RegisterSidebar {

  private registerBusiness: RegisterBusinessService = inject(RegisterBusinessService);

  public readonly steps = this.registerBusiness.steps();
  public purpose = input<RegistrationPurpose | null>()

}
