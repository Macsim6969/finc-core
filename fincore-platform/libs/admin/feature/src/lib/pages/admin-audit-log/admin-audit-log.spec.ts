import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminAuditLog } from './admin-audit-log';

describe('AdminAuditLog', () => {
  let component: AdminAuditLog;
  let fixture: ComponentFixture<AdminAuditLog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAuditLog],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminAuditLog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
