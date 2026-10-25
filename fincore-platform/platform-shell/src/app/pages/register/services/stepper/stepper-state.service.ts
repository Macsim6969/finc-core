import {Injectable, signal} from "@angular/core";

@Injectable()

export class StepperStateService {
  private _isValidateStepper = signal<Record<string, boolean>>({});

  setStepValidity(key: string, value: boolean) {
    this._isValidateStepper.update(current => ({
      ...current,
      [key]: value,
    }));
  }

  getStepValidity(key: string): boolean {
    return this._isValidateStepper()[key] ?? false;
  }

}
