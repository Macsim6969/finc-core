import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import {TranslatePipe} from "@ngx-translate/core";
import {RegisterSidebar} from "./components/register-sidebar/register-sidebar";

type RegistrationPurpose =
  | 'personal'
  | 'company'
  | 'bank'
  | 'broker';

interface RegistrationStep {
  id: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    TranslatePipe,
    RegisterSidebar
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  private readonly fb = new FormBuilder();

  readonly purpose = signal<RegistrationPurpose | null>(null);
  readonly currentStep = signal(0);
  readonly openedSelect = signal<string | null>(null);

  readonly openedCalendar = signal(false);
  readonly calendarDate = signal(new Date());
  readonly selectedBirthDate = signal<Date | null>(null);

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
  readonly monthNames = [
    'calendar.months.january',
    'calendar.months.february',
    'calendar.months.march',
    'calendar.months.april',
    'calendar.months.may',
    'calendar.months.june',
    'calendar.months.july',
    'calendar.months.august',
    'calendar.months.september',
    'calendar.months.october',
    'calendar.months.november',
    'calendar.months.december',
  ];

  readonly weekdays = [
    'calendar.weekdays.mon',
    'calendar.weekdays.tue',
    'calendar.weekdays.wed',
    'calendar.weekdays.thu',
    'calendar.weekdays.fri',
    'calendar.weekdays.sat',
    'calendar.weekdays.sun',
  ];

  readonly calendarDays = computed(() => {
    const current = this.calendarDate();

    const year = current.getFullYear();
    const month = current.getMonth();

    const firstDay = new Date(year, month, 1);

    let offset = firstDay.getDay() - 1;

    if (offset < 0) {
      offset = 6;
    }

    const startDate = new Date(year, month, 1 - offset);

    return Array.from({ length: 42 }, (_, index) => {
      const date = new Date(startDate);

      date.setDate(startDate.getDate() + index);

      return {
        date,
        currentMonth: date.getMonth() === month,
        today: this.isSameDate(date, new Date()),
        selected: this.selectedBirthDate()
          ? this.isSameDate(date, this.selectedBirthDate()!)
          : false,
      };
    });
  });

  toggleSelect(name: string): void {
    this.openedSelect.update(value =>
      value === name ? null : name,
    );

    this.openedCalendar.set(false);
  }

  selectCountry(value: string): void {
    this.accountForm.controls.country.setValue(value);
    this.openedSelect.set(null);
  }

  selectLanguage(value: string): void {
    this.accountForm.controls.language.setValue(value);
    this.openedSelect.set(null);
  }

  getOptionLabel(
    options: { value: string; label: string }[],
    value: string,
  ): string {
    return options.find(option => option.value === value)?.label ?? '';
  }

  toggleCalendar(): void {
    this.openedCalendar.update(value => !value);
    this.openedSelect.set(null);
  }

  previousMonth(): void {
    const date = this.calendarDate();

    this.calendarDate.set(
      new Date(date.getFullYear(), date.getMonth() - 1, 1),
    );
  }

  nextMonth(): void {
    const date = this.calendarDate();

    this.calendarDate.set(
      new Date(date.getFullYear(), date.getMonth() + 1, 1),
    );
  }

  selectBirthDate(date: Date): void {
    this.selectedBirthDate.set(date);

    this.personalForm.controls.dateOfBirth.setValue(
      this.formatDate(date),
    );

    this.openedCalendar.set(false);
  }

  private formatDate(date: Date): string {
    return [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0'),
    ].join('-');
  }

  private isSameDate(a: Date, b: Date): boolean {
    return (
      a.getFullYear() === b.getFullYear()
      && a.getMonth() === b.getMonth()
      && a.getDate() === b.getDate()
    );
  }
  readonly accountForm = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    country: ['', Validators.required],
    language: ['en', Validators.required],
  });

  readonly personalForm = this.fb.nonNullable.group({
    dateOfBirth: ['', Validators.required],
    citizenship: ['', Validators.required],
    city: ['', Validators.required],
    address: ['', Validators.required],
  });

  readonly personalBanksForm = this.fb.nonNullable.group({
    selectedBanks: this.fb.nonNullable.control<string[]>([]),
  });

  readonly companyInfoForm = this.fb.nonNullable.group({
    legalName: ['', Validators.required],
    tradingName: [''],
    registrationNumber: ['', Validators.required],
    taxNumber: [''],
    country: ['', Validators.required],
  });

  readonly companyProfileForm = this.fb.nonNullable.group({
    industry: ['', Validators.required],
    companySize: ['', Validators.required],
    website: [''],
    description: [''],
  });

  readonly companyNeedsForm = this.fb.nonNullable.group({
    payments: [true],
    payroll: [false],
    accounting: [false],
    tax: [false],
    employeeManagement: [false],
    documents: [false],
    analytics: [false],
  });

  readonly companyBankingForm = this.fb.nonNullable.group({
    preference: [
      'connect-existing' as
        | 'connect-existing'
        | 'create-bank'
        | 'later',
      Validators.required,
    ],
    selectedBanks: this.fb.nonNullable.control<string[]>([]),
  });

  readonly bankInfoForm = this.fb.nonNullable.group({
    legalName: ['', Validators.required],
    brandName: ['', Validators.required],
    registrationNumber: ['', Validators.required],
    licenseNumber: [''],
    country: ['', Validators.required],
    headquartersCity: ['', Validators.required],
  });

  readonly bankTypeForm = this.fb.nonNullable.group({
    type: [
      '' as
        | ''
        | 'retail'
        | 'business'
        | 'digital'
        | 'universal'
        | 'specialized',
      Validators.required,
    ],
  });

  readonly bankCustomersForm = this.fb.nonNullable.group({
    individuals: [true],
    companies: [false],
    entrepreneurs: [false],
    enterprises: [false],
  });

  readonly bankProductsForm = this.fb.nonNullable.group({
    accounts: [true],
    cards: [true],
    payments: [true],
    loans: [false],
    deposits: [false],
  });

  readonly bankBrandingForm = this.fb.nonNullable.group({
    primaryColor: ['#c83f5d', Validators.required],
    theme: ['fincore-glass', Validators.required],
    logoUrl: [''],
  });

  readonly brokerInfoForm = this.fb.nonNullable.group({
    legalName: ['', Validators.required],
    brandName: ['', Validators.required],
    registrationNumber: ['', Validators.required],
    country: ['', Validators.required],
  });

  readonly brokerTypeForm = this.fb.nonNullable.group({
    type: [
      '' as
        | ''
        | 'loan'
        | 'mortgage'
        | 'financial'
        | 'business'
        | 'universal',
      Validators.required,
    ],
  });

  readonly brokerServicesForm = this.fb.nonNullable.group({
    bankAccounts: [false],
    loans: [true],
    mortgages: [false],
    businessFinance: [false],
    productComparison: [true],
  });

  readonly brokerClientsForm = this.fb.nonNullable.group({
    individuals: [true],
    companies: [false],
    entrepreneurs: [false],
  });

  readonly brokerPartnersForm = this.fb.nonNullable.group({
    selectedBanks: this.fb.nonNullable.control<string[]>([]),
  });

  readonly availableBanks = [
    {
      id: 'bank-1',
      name: 'FinCore Demo Bank',
      country: 'BG',
    },
    {
      id: 'bank-2',
      name: 'Nova Digital Bank',
      country: 'EU',
    },
    {
      id: 'bank-3',
      name: 'Business Core Bank',
      country: 'EU',
    },
  ];

  readonly steps = computed<RegistrationStep[]>(() => {
    const common: RegistrationStep[] = [
      {
        id: 'account',
        title: 'registration.steps.account.title',
        description: 'registration.steps.account.description',
      },
      {
        id: 'purpose',
        title: 'registration.steps.purpose.title',
        description: 'registration.steps.purpose.description',
      },
    ];

    switch (this.purpose()) {
      case 'personal':
        return [
          ...common,
          {
            id: 'personal-info',
            title: 'registration.steps.personalInfo.title',
            description: 'registration.steps.personalInfo.description',
          },
          {
            id: 'personal-banks',
            title: 'registration.steps.chooseBanks.title',
            description: 'registration.steps.chooseBanks.description',
          },
          this.reviewStep(),
        ];

      case 'company':
        return [
          ...common,
          {
            id: 'company-info',
            title: 'registration.steps.companyInfo.title',
            description: 'registration.steps.companyInfo.description',
          },
          {
            id: 'company-profile',
            title: 'registration.steps.companyProfile.title',
            description: 'registration.steps.companyProfile.description',
          },
          {
            id: 'company-needs',
            title: 'registration.steps.businessNeeds.title',
            description: 'registration.steps.businessNeeds.description',
          },
          {
            id: 'company-banking',
            title: 'registration.steps.bankingPreference.title',
            description: 'registration.steps.bankingPreference.description',
          },
          this.reviewStep(),
        ];

      case 'bank':
        return [
          ...common,
          {
            id: 'bank-info',
            title: 'registration.steps.bankInfo.title',
            description: 'registration.steps.bankInfo.description',
          },
          {
            id: 'bank-type',
            title: 'registration.steps.bankType.title',
            description: 'registration.steps.bankType.description',
          },
          {
            id: 'bank-customers',
            title: 'registration.steps.targetCustomers.title',
            description: 'registration.steps.targetCustomers.description',
          },
          {
            id: 'bank-products',
            title: 'registration.steps.initialProducts.title',
            description: 'registration.steps.initialProducts.description',
          },
          {
            id: 'bank-branding',
            title: 'registration.steps.branding.title',
            description: 'registration.steps.branding.description',
          },
          this.reviewStep(),
        ];

      case 'broker':
        return [
          ...common,
          {
            id: 'broker-info',
            title: 'registration.steps.brokerInfo.title',
            description: 'registration.steps.brokerInfo.description',
          },
          {
            id: 'broker-type',
            title: 'registration.steps.brokerType.title',
            description: 'registration.steps.brokerType.description',
          },
          {
            id: 'broker-services',
            title: 'registration.steps.services.title',
            description: 'registration.steps.services.description',
          },
          {
            id: 'broker-clients',
            title: 'registration.steps.clientTypes.title',
            description: 'registration.steps.clientTypes.description',
          },
          {
            id: 'broker-partners',
            title: 'registration.steps.initialPartners.title',
            description: 'registration.steps.initialPartners.description',
          },
          this.reviewStep(),
        ];

      default:
        return common;
    }
  });

  readonly activeStep = computed(
    () => this.steps()[this.currentStep()],
  );

  readonly isLastStep = computed(
    () => this.currentStep() === this.steps().length - 1,
  );

  setPurpose(purpose: RegistrationPurpose): void {
    this.purpose.set(purpose);
  }

  next(): void {
    if (!this.canContinue()) {
      return;
    }

    if (!this.isLastStep()) {
      this.currentStep.update(step => step + 1);
      return;
    }

    this.submit();
  }

  previous(): void {
    if (this.currentStep() > 0) {
      this.currentStep.update(step => step - 1);
    }
  }

  goToStep(index: number): void {
    if (index < this.currentStep()) {
      this.currentStep.set(index);
    }
  }

  toggleBank(
    control:
      | typeof this.personalBanksForm.controls.selectedBanks
      | typeof this.companyBankingForm.controls.selectedBanks
      | typeof this.brokerPartnersForm.controls.selectedBanks,
    bankId: string,
  ): void {
    const banks = control.value;

    control.setValue(
      banks.includes(bankId)
        ? banks.filter(id => id !== bankId)
        : [...banks, bankId],
    );
  }

  isBankSelected(
    values: string[],
    bankId: string,
  ): boolean {
    return values.includes(bankId);
  }

  private canContinue(): boolean {
    switch (this.activeStep()?.id) {
      case 'account':
        this.accountForm.markAllAsTouched();
        return this.accountForm.valid;

      case 'purpose':
        return this.purpose() !== null;

      case 'personal-info':
        this.personalForm.markAllAsTouched();
        return this.personalForm.valid;

      case 'company-info':
        this.companyInfoForm.markAllAsTouched();
        return this.companyInfoForm.valid;

      case 'company-profile':
        this.companyProfileForm.markAllAsTouched();
        return this.companyProfileForm.valid;

      case 'company-banking':
        this.companyBankingForm.markAllAsTouched();
        return this.companyBankingForm.valid;

      case 'bank-info':
        this.bankInfoForm.markAllAsTouched();
        return this.bankInfoForm.valid;

      case 'bank-type':
        this.bankTypeForm.markAllAsTouched();
        return this.bankTypeForm.valid;

      case 'broker-info':
        this.brokerInfoForm.markAllAsTouched();
        return this.brokerInfoForm.valid;

      case 'broker-type':
        this.brokerTypeForm.markAllAsTouched();
        return this.brokerTypeForm.valid;

      default:
        return true;
    }
  }

  private reviewStep(): RegistrationStep {
    return {
      id: 'review',
      title: 'registration.steps.review.title',
      description: 'registration.steps.review.description',
    };
  }

  private submit(): void {
    const payload = {
      account: this.accountForm.getRawValue(),
      purpose: this.purpose(),

      personal:
        this.purpose() === 'personal'
          ? {
            profile: this.personalForm.getRawValue(),
            banks: this.personalBanksForm.getRawValue(),
          }
          : undefined,

      company:
        this.purpose() === 'company'
          ? {
            info: this.companyInfoForm.getRawValue(),
            profile: this.companyProfileForm.getRawValue(),
            needs: this.companyNeedsForm.getRawValue(),
            banking: this.companyBankingForm.getRawValue(),
          }
          : undefined,

      bank:
        this.purpose() === 'bank'
          ? {
            info: this.bankInfoForm.getRawValue(),
            type: this.bankTypeForm.getRawValue(),
            customers: this.bankCustomersForm.getRawValue(),
            products: this.bankProductsForm.getRawValue(),
            branding: this.bankBrandingForm.getRawValue(),
          }
          : undefined,

      broker:
        this.purpose() === 'broker'
          ? {
            info: this.brokerInfoForm.getRawValue(),
            type: this.brokerTypeForm.getRawValue(),
            services: this.brokerServicesForm.getRawValue(),
            clients: this.brokerClientsForm.getRawValue(),
            partners: this.brokerPartnersForm.getRawValue(),
          }
          : undefined,
    };

    console.log('Registration payload', payload);
  }
}
