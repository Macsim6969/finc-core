import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminOnboardingList } from './admin-onboarding-list';

describe('AdminOnboardingList', () => {
  let component: AdminOnboardingList;
  let fixture: ComponentFixture<AdminOnboardingList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOnboardingList],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminOnboardingList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
