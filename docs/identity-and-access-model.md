# Identity & Access Model

## Purpose

This document defines the identity and access foundation of the platform.

Core principle:

> Identity answers WHO the user is. Membership answers WHERE the user belongs. Role and permissions answer WHAT the user can do. Capability answers WHAT the organization supports. Workspace answers WHERE the user works.

## Core Model

```text
User
│
├── Personal Workspace
│
├── Membership → Company
│       └── Role → Permissions
│
├── Membership → Bank
│       └── Role → Permissions
│
└── Membership → Broker
        └── Role → Permissions
```

## User

A User represents a human identity. A User is independent from organizations, workspaces and roles.

```text
User
├── id
├── firstName
├── lastName
├── email
├── phone
├── country
├── language
└── status
```

## Organization

An Organization is a business or institutional entity.

```text
Organization
├── Company
├── Bank
└── Broker
```

Personal Banking is not an Organization.

## Membership

Membership connects one User to one Organization.

```text
User
  ↓
Membership
  ↓
Organization
```

A user can have multiple memberships:

```text
Maxim
├── Owner → My Factory Ltd
├── Bank Manager → Business Bank
└── Advisor → Finance Broker
```

Conceptually:

```text
Membership
├── id
├── userId
├── organizationId
├── roleIds
├── status
├── joinedAt
└── metadata
```

Statuses:

`PENDING`, `ACTIVE`, `SUSPENDED`, `REVOKED`.

## Workspace

Workspace is the active environment in which the user operates.

```text
Company → Company Workspace
Bank    → Bank Workspace
Broker  → Broker Workspace
User    → Personal Workspace
```

After login:

```text
Login
 ↓
Load User
 ↓
Load Memberships / Workspaces
 ↓
One workspace? → Open it
Multiple? → Workspace Selection
```

The user can switch workspace without logging out.

## Roles

Roles describe responsibility inside an organization.

### Company

`OWNER`, `ADMIN`, `ACCOUNTANT`, `HR_MANAGER`, `EMPLOYEE`

### Bank

`BANK_OWNER`, `BANK_MANAGER`, `CUSTOMER_MANAGER`, `COMPLIANCE_OFFICER`, `RISK_MANAGER`, `ACCOUNTANT`, `SUPPORT_AGENT`

### Broker

`BROKER_OWNER`, `BROKER_MANAGER`, `ADVISOR`, `ACCOUNTANT`

A role is contextual: the same User can have different roles in different organizations.

## Owner

The creator of an organization becomes its Owner.

```text
Create Company → OWNER
Create Bank    → BANK_OWNER
Create Broker  → BROKER_OWNER
```

Owner has the highest organization-level management authority, subject to platform policies.

## Platform Admin

Platform Admin operates at platform scope, not organization scope.

It can monitor/manage platform-wide:

- users;
- organizations;
- banks;
- companies;
- brokers;
- partnerships;
- integrations;
- documents;
- financial metrics;
- compliance;
- platform health.

## Permissions

Permissions represent concrete actions, not pages.

Examples:

```text
company.members.read
company.members.invite
company.members.manage
company.payroll.read
company.payroll.execute

bank.customers.read
bank.customers.manage
bank.fop.read
bank.fop.review
bank.fop.approve
bank.loans.approve
```

Roles are collections of permissions.

## Capability

Capability answers:

> What business functionality is enabled for this organization?

Examples:

`FOP`, `PAYROLL`, `ACCOUNTING`, `LOANS`, `DEPOSITS`, `CARDS`, `PAYMENTS`, `TREASURY`, `FRAUD_DETECTION`.

Capability and Permission are different:

```text
Capability = Does the organization support the function?
Permission = Can this user perform the action?
```

Example:

```text
Bank
└── FOP = ENABLED

Bank Manager
└── bank.fop.review = ALLOWED
```

If FOP is disabled, the function is unavailable regardless of role.

## Product

A Product is something an organization offers or consumes.

```text
Bank Products
├── Personal Account
├── Business Account
├── Card
├── Loan
├── Deposit
└── FOP Account
```

Capability can contain products:

```text
FOP Capability
├── FOP Current Account
├── FOP Business Card
└── FOP Tax Package
```

## Invitation

Invitation creates or activates a Membership.

```text
Organization
 ↓
Invitation
 ↓
User
 ↓
Membership
```

Conceptually:

```text
Invitation
├── id
├── organizationId
├── email
├── roleIds
├── status
├── expiresAt
└── createdBy
```

Statuses:

`PENDING`, `ACCEPTED`, `EXPIRED`, `REVOKED`.

Existing users accepting an invitation must receive a new Membership, not a duplicate User account.

## Organization Relationships

Organization relationships are separate from User Membership.

Examples:

```text
Company ↔ Bank
Broker  ↔ Bank
Bank    ↔ Bank
```

They will support:

- partnerships;
- integrations;
- company-bank connections;
- broker-bank relationships;
- mergers;
- acquisitions;
- ecosystem relationships.

Partnership visibility can later be:

`PRIVATE`, `LIMITED`, `OPEN`.

## Personal Banking Relationships

Personal banking relationships are separate from organization membership.

```text
User
├── Personal Workspace
└── Banking Relationships
    ├── Bank A
    └── Bank B
```

The user can switch active bank inside Personal Banking.

## Access Evaluation

```text
User
 ↓
Membership
 ↓
Organization
 ↓
Workspace
 ↓
Capability
 ↓
Role
 ↓
Permission
 ↓
Resource Policy
```

Example:

```text
Maxim wants to review an FOP application.
1. Authenticated?
2. Member of this Bank?
3. Correct active Workspace?
4. FOP enabled?
5. Role has bank.fop.review?
6. Allowed to access this application?
7. ALLOW / DENY
```

## Authorization Layers

1. Authentication
2. Membership
3. Workspace
4. Capability
5. Permission
6. Resource-level policy

The frontend can hide unavailable functionality, but the backend remains the final authority.

## Multi-Organization User

```text
User
├── Personal Banking
├── Company A → Owner
├── Company B → Accountant
├── Bank A → Bank Manager
└── Broker A → Advisor
```

This is a core requirement.

## Firebase / Mock Architecture

The business model must not depend on the initial data source.

Initial:

```text
Angular
 ↓
Mock Repository
 ↓
Mock Data
```

Later:

```text
Angular
 ↓
Application Services
 ↓
Repository / API Adapter
 ↓
Firebase APIs
```

The business concepts remain stable.

## Core Invariants

1. User is independent from Organizations.
2. User can have multiple Memberships.
3. Membership belongs to exactly one User and Organization.
4. Roles are assigned within Membership context.
5. Permissions describe actions, not pages.
6. Capabilities describe enabled business functionality.
7. Disabled capabilities make corresponding functions unavailable.
8. Products are separate from permissions.
9. Invitations create/activate Memberships.
10. Existing Users are never duplicated by invitations.
11. Personal Banking relationships are separate from Organization Memberships.
12. Platform Admin is a platform-level authorization scope.
13. Workspace switching does not require login again.
14. Backend authorization remains authoritative.

## Final Model

```text
Platform
│
├── Users
├── Organizations
│   ├── Company
│   ├── Bank
│   └── Broker
│
└── Platform Admin

Organization
│
├── Workspace
├── Capabilities
├── Products
├── Settings
└── Memberships
       └── Roles
              └── Permissions
```

## Next

```text
Identity & Access Model
        ↓
Use Cases
        ↓
Business Rules
        ↓
Domain Events
        ↓
Bounded Contexts
        ↓
Context Map
        ↓
Pages / UX
        ↓
Technical Architecture
```

Immediate next document: `docs/01-business/use-cases.md`.
