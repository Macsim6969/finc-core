# Registration Architecture

## Purpose

Registration creates the user's account and the initial business context in which the user will work.

Registration must remain intentionally small. It must not configure the whole banking platform or launch complex business processes.

> Registration creates the context. Workspace develops the context.

## 1. High-Level Registration Flow

```text
REGISTRATION
│
├── Step 1 — Account
│
├── Step 2 — Purpose
│
└── Dynamic Onboarding
    ├── Personal
    ├── Company
    ├── Bank
    └── Broker
```

After onboarding:

```text
Dynamic Onboarding
        ↓
Review
        ↓
Create User
        ↓
Create Organization / Relationship
        ↓
Create Membership
        ↓
Create Workspace
        ↓
Login
        ↓
Home
```

## 2. Step 1 — Account

Common fields:

- First name
- Last name
- Email
- Phone
- Password
- Country
- Language

Language is included from the first version as a user preference.

Other preferences such as timezone, currency and notification settings can be added later.

## 3. Step 2 — Purpose

```text
How do you want to use the platform?

○ Personal
○ Company
○ Bank
○ Broker
```

Important:

- Owner is not a registration type.
- Company, Bank and Broker are organization types.
- Owner is a membership role.
- When a user creates a new organization, the user automatically becomes its Owner.

```text
User
 ↓
Create Company
 ↓
Company
 ↓
Owner Membership
```

## 4. Personal Onboarding

```text
Personal Onboarding
│
├── P1 — Personal Information
├── P2 — Choose Bank
└── P3 — Review
```

### P1 — Personal Information

Only information not already collected in Step 1 should be requested. Do not duplicate fields unnecessarily.

### P2 — Choose Bank

The user selects one or more banks they want to work with.

```text
Choose a bank to work with

☑ Bank Alpha
☑ Bank Beta
```

The bank card can show services available from that bank:

```text
Bank Alpha
✓ Accounts
✓ Cards
✓ Payments
✓ FOP

Bank Beta
✓ Accounts
✓ Cards
✓ Payments
✗ FOP
```

The user is choosing a banking relationship, not individual products.

The bank's capabilities determine which products are available.

### P3 — Review

```text
Your setup

Personal Banking

Banks:
✓ Bank Alpha
✓ Bank Beta

Language:
English

Country:
Bulgaria
```

After confirmation:

```text
Create User
    ↓
Create Banking Relationships
    ↓
Create Personal Workspace
    ↓
Login
    ↓
Home
```

### What Personal Registration Does NOT Contain

The following are separate business journeys:

- FOP application
- FOP KYC
- FOP documents
- Tax setup
- Accounting
- Payroll
- Loan application
- Deposit opening
- Investment onboarding

FOP flow:

```text
Personal Banking
      ↓
FOP
      ↓
Open FOP
      ↓
Choose eligible bank
      ↓
FOP Application
      ↓
KYC
      ↓
Documents
      ↓
Bank Review
      ↓
FOP Activated
```

## 5. Company Onboarding

```text
Company Onboarding
│
├── C1 — Company Information
├── C2 — Company Profile
├── C3 — Business Needs
├── C4 — Banking Preference
└── C5 — Review
```

### C1 — Company Information

- Company Name
- Legal Name
- Country
- Company Type
- Registration Number
- Industry

### C2 — Company Profile

Keep this minimal initially:

- Company Size
- Number of Employees

### C3 — Business Needs

Initial requirements may be collected:

```text
☑ Business Banking
☑ Payroll
☑ Accounting
☑ Tax Management
☐ Loans
☐ Deposits
```

These are initial preferences/configuration and do not automatically execute those business processes.

### C4 — Banking Preference

A company can:

```text
○ Connect an existing bank
○ Create my own bank
○ Later
```

A company does not have to create its own bank.

### C5 — Review

```text
Company

My Factory Ltd

Owner:
User

Business:
Manufacturing

Needs:
✓ Business Banking
✓ Payroll
✓ Accounting
✓ Tax Management

Bank:
Bank Alpha
```

After confirmation:

```text
Create User
      ↓
Create Company
      ↓
Create Owner Membership
      ↓
Create Company Workspace
      ↓
Login
```

## 6. Bank Onboarding

```text
Bank Onboarding
│
├── B1 — Bank Information
├── B2 — Bank Type
├── B3 — Target Customers
├── B4 — Initial Products
├── B5 — Branding
└── B6 — Review
```

### B1 — Bank Information

- Bank Name
- Legal Name
- Country
- Registration Number

### B2 — Bank Type

```text
○ Digital Bank
○ Retail Bank
○ Business Bank
○ Universal Bank
○ Investment Bank
```

### B3 — Target Customers

```text
☑ Individuals
☑ Companies
☑ FOP
☐ Investors
☐ Institutions
```

### B4 — Initial Products

Initial product catalog:

- Accounts
- Cards
- Payments
- Loans
- Deposits
- Investments
- Business Banking

### B5 — Branding

Initial branding may include:

- Logo
- Colors
- Theme

Default configuration must be available so branding does not block registration.

### B6 — Review

After confirmation:

```text
Create User
      ↓
Create Bank Organization
      ↓
Create Bank Owner Membership
      ↓
Create Bank Workspace
      ↓
Create Initial Product Catalog
      ↓
Login
```

### FOP Is NOT Part of Bank Registration

FOP capability is configured after the bank exists.

```text
Bank Workspace
      ↓
Capabilities
      ↓
FOP
      ↓
Enable FOP
```

FOP then has its own setup and lifecycle:

```text
Enable FOP
    ↓
FOP Configuration
    ↓
FOP Products
    ↓
Eligibility Rules
    ↓
Required Documents
    ↓
Compliance Configuration
    ↓
Activate FOP
```

The same lifecycle pattern can later support:

- Loans
- Investments
- Insurance
- Payroll
- Treasury
- Fraud Detection

## 7. Broker Onboarding

```text
Broker Onboarding
│
├── BR1 — Broker Information
├── BR2 — Broker Type
├── BR3 — Services
├── BR4 — Client Types
├── BR5 — Initial Partners
└── BR6 — Review
```

### BR1 — Broker Information

- Broker Name
- Legal Name
- Country
- Registration Number

### BR2 — Broker Type

```text
○ Investment Broker
○ Loan Broker
○ Insurance Broker
○ Financial Advisor
○ Multi-service Broker
```

### BR3 — Services

```text
☑ Investment Products
☑ Financial Advisory
☐ Loans
☐ Insurance
```

### BR4 — Client Types

```text
☑ Individuals
☑ Companies
☐ Banks
☐ FOP
```

### BR5 — Initial Partners

Initial partners may be configured, but this can be skipped.

Partnership management is a separate business journey.

### BR6 — Review

After confirmation:

```text
Create User
      ↓
Create Broker Organization
      ↓
Create Broker Owner Membership
      ↓
Create Broker Workspace
      ↓
Login
```

## 8. Invitation Registration

Company, Bank or Broker can invite users by email or registration link.

Example:

```text
/register?invitation=...
```

The invitation already contains organization and role context.

```text
Company = My Factory Ltd
Role = Accountant
```

Therefore the invited user does not need to select Purpose.

Flow:

```text
Invitation
    ↓
Identify Organization
    ↓
Identify Role
    ↓
Registration
    ↓
Create / Link User
    ↓
Accept Invitation
    ↓
Create Membership
    ↓
Workspace
    ↓
Login
```

Existing users can accept an invitation without creating another account.

## 9. Final Registration Architecture

```text
                           REGISTRATION
                                │
                                ▼
                         STEP 1 — ACCOUNT
                                │
                                ├── First Name
                                ├── Last Name
                                ├── Email
                                ├── Phone
                                ├── Password
                                ├── Country
                                └── Language
                                │
                                ▼
                         STEP 2 — PURPOSE
                                │
          ┌─────────────────────┼──────────────────────┐
          │                     │                      │
          ▼                     ▼                      ▼
      PERSONAL               COMPANY                  BANK
          │                     │                      │
          ▼                     ▼                      ▼
   P1 Information        C1 Information         B1 Information
   P2 Choose Bank        C2 Profile             B2 Bank Type
   P3 Review             C3 Business Needs      B3 Customers
                         C4 Banking              B4 Products
                         C5 Review               B5 Branding
                                                B6 Review
          │                     │                      │
          └─────────────────────┼──────────────────────┘
                                │
                              BROKER
                                │
                                ▼
                         BR1 Information
                         BR2 Broker Type
                         BR3 Services
                         BR4 Clients
                         BR5 Partners
                         BR6 Review
                                │
                                ▼
                           CREATE USER
                                │
                                ▼
                    CREATE CONTEXT / RELATIONSHIP
                                │
                                ▼
                         CREATE MEMBERSHIP
                                │
                                ▼
                         CREATE WORKSPACE
                                │
                                ▼
                              LOGIN
                                │
                                ▼
                               HOME
```

## 10. Architectural Principles

### Registration must not become the platform

Registration answers:

> Who are you and what initial context are you creating?

It does not configure every banking capability the user may ever use.

### Capabilities are lifecycle operations

```text
Workspace
   ↓
Capabilities
   ↓
Enable Capability
   ↓
Capability-specific Setup
```

### Products belong to organizations

A Bank defines which products it provides. A Company can connect to those products. A Customer uses products exposed by the selected bank.

### FOP is an independent business process

```text
Customer
   ↓
FOP Request
   ↓
Eligible Bank
   ↓
Application
   ↓
Review
   ↓
FOP
```

It is never silently created as a side effect of registration.

## 11. Out of Scope for Registration

The following belong to separate documents and journeys:

- Detailed page structure
- Exact UI screens
- FOP domain logic
- KYC implementation
- Loan lifecycle
- Deposit lifecycle
- Payroll lifecycle
- Accounting lifecycle
- Partnership lifecycle
- Integration lifecycle
- Authorization matrix
- Technical Angular architecture
- API contracts

## 12. Next Stage

The next business-design stage is:

```text
Registration Architecture
        ↓
User / Organization / Membership Model
        ↓
Invitation Model
        ↓
Workspace Model
        ↓
Capabilities & Entitlements
        ↓
Authorization / Roles
        ↓
Use Cases
        ↓
Pages / UX
        ↓
DDD / Application Architecture
        ↓
Angular Architecture
```

The immediate next document should define the identity and access model: User, Organization, Membership, Workspace, roles, permissions and how one user can belong to multiple organizations.
