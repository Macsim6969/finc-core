import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterPurpose } from './register-purpose';

describe('RegisterPurpose', () => {
  let component: RegisterPurpose;
  let fixture: ComponentFixture<RegisterPurpose>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPurpose],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterPurpose);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
