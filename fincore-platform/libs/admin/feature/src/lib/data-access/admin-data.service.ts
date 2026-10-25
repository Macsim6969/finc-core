import { Injectable } from '@angular/core';

import {
  AuditEvent,
  CreateOnboardingCase,
  OnboardingCase,
  OnboardingStatus,
  Organization,
  UpdateOnboardingCase,
} from '../models/admin.model';

@Injectable({ providedIn: 'root' })
export class AdminDataService {
  private cases: OnboardingCase[] = [
    {
      id: 'ONB-1042',
      organizationName: 'Northstar Payments Ltd.',
      organizationType: 'COMPANY',
      contactName: 'Elena Petrova',
      contactEmail: 'elena@example.com',
      owner: 'Admin Team',
      status: 'PENDING_REVIEW',
      createdAt: '2026-10-20T09:00:00Z',
      updatedAt: '2026-10-21T11:30:00Z',
    },
    {
      id: 'ONB-1041',
      organizationName: 'Danube Commercial Bank',
      organizationType: 'BANK',
      contactName: 'Ivan Dimitrov',
      contactEmail: 'ivan@example.com',
      owner: 'Compliance Team',
      status: 'INVITATION_SENT',
      createdAt: '2026-10-18T09:00:00Z',
      updatedAt: '2026-10-21T10:00:00Z',
    },
    {
      id: 'ONB-1038',
      organizationName: 'Vertex Brokerage',
      organizationType: 'BROKER',
      contactName: 'Mira Ivanova',
      contactEmail: 'mira@example.com',
      owner: 'Admin Team',
      status: 'IN_PROGRESS',
      createdAt: '2026-10-16T09:00:00Z',
      updatedAt: '2026-10-19T10:00:00Z',
    },
  ];

  private organizations: Organization[] = [
    {
      id: 'ORG-0001',
      name: 'Orchid Services OOD',
      type: 'COMPANY',
      status: 'ACTIVE',
      country: 'Bulgaria',
      membersCount: 12,
      createdAt: '2026-10-10T09:00:00Z',
    },
    {
      id: 'ORG-0002',
      name: 'Danube Commercial Bank',
      type: 'BANK',
      status: 'ACTIVE',
      country: 'Bulgaria',
      membersCount: 4,
      createdAt: '2026-10-12T09:00:00Z',
    },
  ];

  private auditEvents: AuditEvent[] = [
    {
      id: 'AUD-5501',
      occurredAt: '2026-10-21T11:30:00Z',
      actor: 'admin@fincore.example',
      action: 'ONBOARDING_REVIEW_OPENED',
      target: 'ONB-1042',
      severity: 'INFO',
      details: 'Opened an onboarding case for review.',
    },
    {
      id: 'AUD-5500',
      occurredAt: '2026-10-21T10:00:00Z',
      actor: 'system',
      action: 'INVITATION_SENT',
      target: 'ONB-1041',
      severity: 'INFO',
      details: 'Invitation email was queued.',
    },
  ];

  // READ: получение данных

  getOnboardingCases(): OnboardingCase[] {
    return [...this.cases];
  }

  getOnboardingCase(id: string): OnboardingCase | undefined {
    return this.cases.find((item) => item.id === id);
  }

  getOrganizations(): Organization[] {
    return [...this.organizations];
  }

  getRecentCases(limit: number): OnboardingCase[] {
    return [...this.cases]
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
      .slice(0, limit);
  }

  getRecentEvents(limit: number): AuditEvent[] {
    return [...this.auditEvents]
      .sort((a, b) => b.occurredAt.localeCompare(a.occurredAt))
      .slice(0, limit);
  }

  getOpenOnboardingCount(): number {
    return this.cases.filter(
      (item) =>
        !['COMPLETED', 'REJECTED', 'CANCELLED'].includes(item.status),
    ).length;
  }

  getPendingReviewCount(): number {
    return this.cases.filter(
      (item) => item.status === 'PENDING_REVIEW',
    ).length;
  }

  getActiveOrganizationsCount(): number {
    return this.organizations.filter(
      (item) => item.status === 'ACTIVE',
    ).length;
  }

  getCriticalEventsCount(): number {
    return this.auditEvents.filter(
      (item) => item.severity === 'CRITICAL',
    ).length;
  }

  // CREATE: создаём черновик заявки

  createOnboardingCase(
    input: CreateOnboardingCase,
  ): OnboardingCase {
    const now = new Date().toISOString();

    const item: OnboardingCase = {
      ...input,
      id: `ONB-${Date.now()}`,
      status: 'DRAFT',
      createdAt: now,
      updatedAt: now,
    };

    this.cases = [item, ...this.cases];

    this.addAuditEvent(
      'ONBOARDING_CASE_CREATED',
      item.id,
      `Created case for ${item.organizationName}.`,
    );

    return item;
  }

  // UPDATE: обновляем редактируемые поля

  updateOnboardingCase(
    id: string,
    changes: UpdateOnboardingCase,
  ): OnboardingCase | undefined {
    const existing = this.getOnboardingCase(id);

    if (!existing) {
      return undefined;
    }

    const updated: OnboardingCase = {
      ...existing,
      ...changes,
      updatedAt: new Date().toISOString(),
    };

    this.cases = this.cases.map((item) =>
      item.id === id ? updated : item,
    );

    this.addAuditEvent(
      'ONBOARDING_CASE_UPDATED',
      id,
      'Updated onboarding case metadata.',
    );

    return updated;
  }

  // UPDATE: меняем статус workflow

  changeOnboardingStatus(
    id: string,
    status: OnboardingStatus,
  ): OnboardingCase | undefined {
    const existing = this.getOnboardingCase(id);

    if (!existing) {
      return undefined;
    }

    const updated: OnboardingCase = {
      ...existing,
      status,
      updatedAt: new Date().toISOString(),
    };

    this.cases = this.cases.map((item) =>
      item.id === id ? updated : item,
    );

    this.addAuditEvent(
      `ONBOARDING_STATUS_CHANGED_TO_${status}`,
      id,
      `Status changed to ${status}.`,
    );

    return updated;
  }

  // DELETE: пока разрешаем удалять только DRAFT

  deleteDraftOnboardingCase(id: string): boolean {
    const existing = this.getOnboardingCase(id);

    if (!existing || existing.status !== 'DRAFT') {
      return false;
    }

    this.cases = this.cases.filter((item) => item.id !== id);

    this.addAuditEvent(
      'ONBOARDING_DRAFT_DELETED',
      id,
      'Deleted draft onboarding case.',
    );

    return true;
  }

  private addAuditEvent(
    action: string,
    target: string,
    details: string,
  ): void {
    const event: AuditEvent = {
      id: `AUD-${Date.now()}`,
      occurredAt: new Date().toISOString(),
      actor: 'current-admin',
      action,
      target,
      severity: 'INFO',
      details,
    };

    this.auditEvents = [event, ...this.auditEvents];
  }
}
