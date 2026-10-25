import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterMobileProgress } from './register-mobile-progress';

describe('RegisterMobileProgress', () => {
  let component: RegisterMobileProgress;
  let fixture: ComponentFixture<RegisterMobileProgress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterMobileProgress],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterMobileProgress);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
