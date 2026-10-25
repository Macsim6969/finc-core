import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminOnboardingCreate } from './admin-onboarding-create';

describe('AdminOnboardingCreate', () => {
  let component: AdminOnboardingCreate;
  let fixture: ComponentFixture<AdminOnboardingCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOnboardingCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminOnboardingCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
