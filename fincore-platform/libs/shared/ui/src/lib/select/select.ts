import {Component, forwardRef, HostListener, input, signal} from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {SelectOption} from "./types/select.type";

@Component({
  selector: 'fc-select',
  imports: [
    TranslatePipe
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Select),
      multi: true,
    },
  ],
  templateUrl: './select.html',
  styleUrl: './select.scss',
})
export class Select<T = string> implements ControlValueAccessor {

  readonly options = input.required<SelectOption<T>[]>();

  readonly placeholder = input<string>('common.select');

  readonly translateOptions = input(true);

  readonly opened = signal(false);

  readonly value = signal<T | null>(null);

  readonly disabled = signal(false);

  private onChange: (value: T | null) => void = () => {};

  private onTouched: () => void = () => {};

  toggle(event: MouseEvent): void {
    event.stopPropagation();

    if (this.disabled()) {
      return;
    }

    this.opened.update(value => !value);
  }

  selectOption(
    option: SelectOption<T>,
    event: MouseEvent,
  ): void {
    event.stopPropagation();

    if (
      this.disabled()
      || option.disabled
    ) {
      return;
    }

    this.value.set(option.value);

    this.onChange(option.value);
    this.onTouched();

    this.opened.set(false);
  }

  get selectedOption(): SelectOption<T> | undefined {
    return this.options().find(
      option =>
        option.value === this.value(),
    );
  }

  isSelected(option: SelectOption<T>): boolean {
    return option.value === this.value();
  }

  writeValue(value: T | null): void {
    this.value.set(value);
  }

  registerOnChange(
    fn: (value: T | null) => void,
  ): void {
    this.onChange = fn;
  }

  registerOnTouched(
    fn: () => void,
  ): void {
    this.onTouched = fn;
  }

  setDisabledState(
    isDisabled: boolean,
  ): void {
    this.disabled.set(isDisabled);
  }

  @HostListener('document:click')
  close(): void {
    this.opened.set(false);
  }
}
