export type OrganizationType = 'COMPANY' | 'BANK' | 'BROKER';

export type OnboardingStatus =
  | 'DRAFT'
  | 'PENDING_REVIEW'
  | 'APPROVED'
  | 'INVITATION_SENT'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'REJECTED'
  | 'CANCELLED';

export type OrganizationStatus =
  | 'ACTIVE'
  | 'PENDING'
  | 'SUSPENDED';

export type AuditSeverity = 'INFO' | 'WARNING' | 'CRITICAL';

export interface OnboardingCase {
  id: string;
  organizationName: string;
  organizationType: OrganizationType;
  contactName: string;
  contactEmail: string;
  owner: string;
  notes?: string;
  status: OnboardingStatus;
  createdAt: string;
  updatedAt: string;
}

export type CreateOnboardingCase = Pick<
  OnboardingCase,
  | 'organizationName'
  | 'organizationType'
  | 'contactName'
  | 'contactEmail'
  | 'owner'
> & {
  notes?: string;
};

export type UpdateOnboardingCase = Partial<
  Pick<
    OnboardingCase,
    | 'organizationName'
    | 'organizationType'
    | 'contactName'
    | 'contactEmail'
    | 'owner'
    | 'notes'
  >
>;

export interface Organization {
  id: string;
  name: string;
  type: OrganizationType;
  status: OrganizationStatus;
  country: string;
  membersCount: number;
  createdAt: string;
}

export interface AuditEvent {
  id: string;
  occurredAt: string;
  actor: string;
  action: string;
  target: string;
  severity: AuditSeverity;
  details: string;
}
