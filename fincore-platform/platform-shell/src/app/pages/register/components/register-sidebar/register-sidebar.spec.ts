import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterSidebar } from './register-sidebar';

describe('RegisterSidebar', () => {
  let component: RegisterSidebar;
  let fixture: ComponentFixture<RegisterSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterSidebar],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterSidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
