import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminOnboardingDetail } from './admin-onboarding-detail';

describe('AdminOnboardingDetail', () => {
  let component: AdminOnboardingDetail;
  let fixture: ComponentFixture<AdminOnboardingDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminOnboardingDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminOnboardingDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
