# Product Decomposition

**Document:** `docs/01-business/product-decomposition.md`  
**Status:** Living document  
**Purpose:** Decompose the Product Landscape into products, capabilities, business areas, user journeys, and use cases before designing pages and frontend architecture.

---

## 1. Purpose

`product-landscape.md` answers: **What products and capabilities exist?**

This document answers: **What does each product actually do?**

We intentionally do not define Angular routes, components, NgRx stores, Firebase collections, or exact API contracts here.

```text
Product
  ↓
Business Area
  ↓
Capability
  ↓
Business Flow
  ↓
Use Case
  ↓
Business Rules
  ↓
Page / Feature
```

The final Page / Feature layer will be designed later.

---

## 2. Product Decomposition Principles

### 2.1 Business first

Define what the business does before deciding how Angular implements it.

### 2.2 Context ownership

Every capability has a clear business owner. Avoid a giant shared model where every feature directly modifies the same entities.

### 2.3 Roles are contextual

A user can have multiple roles in different workspaces.

```text
User
├── Personal Banking → Customer
├── My Factory Ltd   → Owner
└── Business Bank    → Bank Manager
```

### 2.4 Capabilities are composable

Products can enable capabilities without changing the platform core.

### 2.5 State is explicit

Important business objects have explicit lifecycle states.

```text
FOP Application
Draft → Submitted → Under Review → Approved → Activated
                         ├────────→ Needs Information
                         └────────→ Rejected
```

### 2.6 Mock-first

Initial implementation uses mocks. Business/application logic communicates through abstractions so the data source can later change:

```text
Application
   ↓
Port / Gateway
   ├── Mock implementation
   └── Firebase/API implementation
```

---

## 3. Global Platform Model

```text
Account
  ↓
Membership
  ↓
Workspace
  ↓
Product / Organization Context
  ↓
Capabilities
  ↓
Use Cases
```

Organizations may be:

```text
Organization
├── Company
├── Bank
├── Broker
├── Provider
└── Other Financial Organization
```

Relationships may include:

```text
Partnership
Integration
Ownership
Subsidiary
Acquisition
Merger
```

---

## 4. Product Decomposition Overview

```text
PLATFORM
├── Identity & Access
├── Workspace & Organization Management
├── Personal Banking
├── FOP
├── Business Platform
├── Banking Platform
├── Accounts
├── Cards
├── Payments & Transfers
├── Loans
├── Deposits
├── Investments
├── Accounting
├── Payroll
├── Tax
├── Documents
├── Compliance & KYC
├── Fraud Detection
├── Risk & Audit
├── Workflow & Approvals
├── Support
├── Marketplace
├── Billing
├── Themes & Branding
├── Integration Hub
├── Partnerships & Ecosystem
├── Data Governance
├── Analytics
└── Platform Governance
```

---

# 5. Identity & Access

## Purpose

Provide global identity and authorization.

## Business Areas

```text
Identity
├── Registration
├── Authentication
├── Session
├── Membership
├── Roles
├── Permissions
└── Security
```

## Core flows

### Registration

```text
User → Registration → Account Created
```

Registration may later include a stepper that asks what the user wants to create/use, for example Personal Banking, Company, or another product.

### Login

```text
Login
 ↓
Account identified
 ↓
Load memberships
 ↓
One workspace? ── Yes → Open workspace
       │
       No
       ↓
Workspace selection
```

### Workspace selection

Example:

```text
Maxim

My Factory Ltd
Business Bank
Personal Banking
```

If there is only one workspace, the selection page can be skipped.

### Authorization

```text
Account → Membership → Role → Permissions → Allowed Actions
```

---

# 6. Workspace & Organization Management

## Purpose

Manage the organizational contexts in which users work.

## Areas

```text
Organization
├── Creation
├── Profile
├── Members
├── Teams
├── Roles
├── Invitations
├── Workspaces
├── Products
└── Lifecycle
```

## Use cases

- Create organization
- Invite member
- Remove member
- Assign role
- Change role
- Create workspace
- Configure workspace
- Deactivate organization

A workspace is the user's working context; an organization is the business participant behind that context.

---

# 7. Personal Banking

## Purpose

Provide the standard personal banking experience.

```text
Personal Banking
├── Dashboard
├── Banks
├── Accounts
├── Cards
├── Payments
├── Transfers
├── Loans
├── Deposits
├── Investments
├── FOP
├── Documents
├── Notifications
└── Support
```

## Core use cases

- View financial overview
- Select active bank
- View accounts
- View cards
- Create virtual card
- Freeze/unfreeze card
- Transfer money
- Schedule payment
- Open deposit
- Apply for loan
- Request FOP
- Generate document
- Contact support

---

# 8. Multi-Bank Experience

A customer can work with several banks.

```text
Personal Banking
├── Bank A
├── Bank B
├── Bank C
└── All Banks
```

The customer can switch the active bank. The selected bank determines its available products, services, theme, pricing, capabilities, and integrations.

```text
Selected Bank
      ↓
Bank-specific capabilities
      ↓
Accounts / Cards / Payments / Products
```

---

# 9. All Banks

`All Banks` is a premium cross-bank capability, not a separate bank or workspace.

## Basic tier

```text
Cards: 7
Total Balance: €24,500
```

## Premium tier

Potential capabilities:

- combined balances;
- cross-bank transaction overview;
- financial analytics;
- cross-bank reports;
- spending insights;
- advanced aggregation.

---

# 10. FOP

FOP is a distinct business product/context, not merely another page in Personal Banking.

```text
FOP
├── Application
├── Profile
├── Account
├── Income
├── Expenses
├── Payments
├── Taxes
├── Documents
├── Accounting
├── Employees
├── Payroll
├── Reports
├── Contracts
└── Settings
```

---

# 11. FOP Application Lifecycle

This is the first major cross-role business flow.

```text
Customer
   ↓
Request FOP
   ↓
Application Created
   ↓
Documents / KYC
   ↓
Submitted
   ↓
Bank Review
   ↓
Approved
   ↓
FOP Activated
```

Alternative paths:

```text
Submitted
├── Rejected
└── Needs Additional Information
```

### Customer

- request FOP;
- provide information;
- upload documents;
- submit application;
- respond to requests;
- monitor status.

### Bank Manager

- view applications;
- review information;
- review documents;
- request additional information;
- approve;
- reject.

### Platform Admin

- monitor FOP activity;
- monitor platform-wide FOP statistics;
- inspect authorized operational information;
- audit relevant actions.

---

# 12. FOP Activation

After approval:

```text
FOP Application
      ↓
Approved
      ↓
FOP Created
      ↓
FOP Account
      ↓
FOP Product Available
```

The customer then receives an FOP entry in the application navigation. The FOP area can use a different sidebar while keeping the platform/header shell consistent.

```text
Global Header
─────────────────────────────────────
FOP Sidebar       FOP Workspace
├── Dashboard
├── Account
├── Payments
├── Taxes
├── Documents
└── Reports
```

---

# 13. FOP Financial Management

## Income

- record income;
- classify income;
- view income history;
- generate income reports.

## Expenses

- record expenses;
- classify expenses;
- attach documents;
- analyze expenses.

## Payments

- create payment;
- approve payment if required;
- execute payment;
- view status;
- view history.

---

# 14. FOP Tax Management

```text
Tax
├── Tax Overview
├── Tax Liability
├── Tax Calculation
├── Tax Documents
├── Tax Declaration
├── Tax Payment
└── Tax History
```

Possible flow:

```text
Income / Expenses
       ↓
Tax Calculation
       ↓
Tax Liability
       ↓
Declaration / Document
       ↓
Approval
       ↓
Tax Payment
```

Initially this is mock business logic.

---

# 15. Business Platform

## Purpose

Give companies a complete business-finance workspace without requiring them to own a bank.

```text
Company
├── Dashboard
├── Organization
├── Employees
├── Payroll
├── Finance
├── Accounting
├── Taxes
├── Documents
├── Contracts
├── Approvals
├── Reports
├── FOP Management
├── Banking
├── Integrations
├── Partners
└── Marketplace
```

---

# 16. Business Suite

Business Suite is a product a company can purchase.

```text
Company → Business Suite → Connect Existing Bank
```

or:

```text
Company → Own Bank + Business Suite
```

Business Suite must not depend on ownership of a bank.

---

# 17. Employee Management

```text
Employees
├── Employee Directory
├── Employee Profile
├── Employee Accounts
├── Employee FOP
├── Documents
├── Permissions
└── Lifecycle
```

Use cases:

- add employee;
- invite employee;
- assign role;
- connect employee account;
- manage authorized employee/FOP relationships;
- manage employee documents.

---

# 18. Payroll

```text
Payroll
├── Payroll Calendar
├── Salary Run
├── Salary Calculation
├── Salary Payments
├── Tax-related Payroll
└── Reports
```

Example:

```text
Company
   ↓
Create Salary Run
   ↓
Calculate Salaries
   ↓
Review
   ↓
Approval
   ↓
Bulk Payment
   ↓
Employee Accounts
```

---

# 19. Company Finance

```text
Finance
├── Company Accounts
├── Income
├── Expenses
├── Cash Flow
├── Transactions
├── Budgets
└── Reports
```

A company can connect multiple banks:

```text
Company
├── Bank A → Account A
├── Bank B → Account B
└── Bank C → Account C
```

---

# 20. Company FOP Management

A company can manage authorized FOP-related relationships.

Potential capabilities:

- view employee FOP status;
- collect required documents;
- manage authorized payments;
- manage payroll-related information;
- generate reports;
- manage authorized financial processes.

Access must be controlled by company roles and permissions.

---

# 21. Accounting

```text
Accounting
├── Chart of Accounts
├── Transactions
├── Income
├── Expenses
├── Reconciliation
├── Periods
├── Reports
└── Integrations
```

Initially mock-based; later it may integrate with external accounting providers.

---

# 22. Company Tax Management

```text
Company Taxes
├── Tax Overview
├── Liabilities
├── Calculations
├── Tax Documents
├── Payments
├── Reports
└── History
```

---

# 23. Document Management

Documents are a shared capability, while ownership remains with the relevant business context.

```text
Documents
├── Generate
├── Upload
├── Store
├── Version
├── Sign
├── Share
├── Download
└── Audit
```

Examples: bank statements, tax documents, payroll reports, contracts, FOP documents, company reports.

---

# 24. Banking Platform

## Purpose

Allow an organization to operate a configurable bank.

```text
Bank
├── Dashboard
├── Customers
├── Customer 360
├── Accounts
├── Cards
├── Payments
├── Loans
├── Deposits
├── FOP
├── Business Banking
├── Products
├── Pricing
├── KYC
├── AML
├── Fraud
├── Risk
├── Approvals
├── Documents
├── Support
├── Partners
├── Integrations
└── Analytics
```

---

# 25. Bank Products

A bank can configure which services it provides.

```text
Bank A
├── Personal Accounts
├── Business Accounts
├── Cards
├── FOP
├── Deposits
└── Loans
```

Another bank may provide:

```text
Bank B
├── Personal Accounts
├── Cards
├── Investments
└── Premium Banking
```

The platform supports different product catalogs per bank.

---

# 26. Bank Manager

Bank Manager operates within a specific bank.

Responsibilities can include:

- customer management;
- FOP applications;
- account operations;
- card operations;
- loan applications;
- deposit products;
- product configuration;
- support;
- approvals;
- compliance workflows.

Bank Manager does not automatically become Platform Admin.

---

# 27. Bank FOP Management

```text
FOP Applications
├── New
├── Under Review
├── Needs Information
├── Approved
└── Rejected
```

Use cases:

- open FOP;
- review FOP;
- approve FOP;
- reject FOP;
- request documents;
- monitor active FOP.

---

# 28. Customer 360

```text
Customer 360
├── Profile
├── KYC
├── Accounts
├── Cards
├── Loans
├── Deposits
├── FOP
├── Transactions
├── Documents
├── Support
├── Risk
├── Fraud
├── Relationships
└── Activity Timeline
```

Access must respect permissions and data governance.

---

# 29. Payments & Transfers

Payments are a shared capability used by Personal Banking, FOP, Company Platform, and Bank Platform.

```text
Payments
├── Internal Transfer
├── Bank Transfer
├── Customer Transfer
├── Scheduled Payment
├── Recurring Payment
├── Bulk Payment
├── Payroll Payment
├── Tax Payment
└── International Payment
```

Lifecycle:

```text
Created → Pending → Approved → Processing → Completed
```

Alternative states: `Rejected`, `Failed`, `Cancelled`, `Expired`.

---

# 30. Workflow & Approvals

Reusable capability:

```text
Workflow
├── Payment Approval
├── Loan Approval
├── FOP Approval
├── Document Approval
├── Partnership Approval
├── Integration Approval
└── Organization Change Approval
```

Generic lifecycle:

```text
Requested → Review → Approved / Rejected
```

---

# 31. Loans

```text
Loans
├── Products
├── Eligibility
├── Application
├── Risk Assessment
├── Approval
├── Agreement
├── Disbursement
├── Repayment
└── History
```

---

# 32. Deposits

```text
Deposits
├── Products
├── Opening
├── Active Deposits
├── Interest
├── Maturity
├── Early Withdrawal
└── History
```

---

# 33. Cards

```text
Cards
├── Issue Card
├── Virtual Card
├── Physical Card
├── Activation
├── Freeze / Unfreeze
├── Limits
├── Replacement
├── Status
└── Transactions
```

Cards may exist as personal, company, employee, or bank-issued products.

---

# 34. Compliance & KYC

```text
Compliance
├── Customer Verification
├── KYC
├── AML
├── Documents
├── Risk Profile
├── Compliance Cases
└── Reviews
```

Compliance can participate in customer onboarding, FOP onboarding, account opening, loan applications, payments, and partnerships.

---

# 35. Fraud Detection

Initially mocked.

```text
Transaction
    ↓
Fraud Evaluation
    ├── Low Risk
    ├── Review
    └── Block
```

Capabilities: rules, alerts, suspicious transactions, cases, investigations, history.

---

# 36. Risk

```text
Risk
├── Customer Risk
├── Credit Risk
├── Transaction Risk
├── Organization Risk
└── Operational Risk
```

Risk can be consumed by loans, payments, onboarding, fraud, and partnerships.

---

# 37. Audit

Audit tracks important platform actions:

```text
User Logged In
Role Changed
Account Opened
Card Issued
Payment Created
Payment Approved
FOP Approved
Document Accessed
Partnership Approved
Integration Connected
Organization Merged
```

Audit records should not become the owner of underlying business state.

---

# 38. Support Center

```text
Support
├── Tickets
├── Conversations
├── Chat
├── Requests
├── Escalation
├── Status
└── History
```

Support may exist at platform, bank, and company levels.

---

# 39. Marketplace

Marketplace lets organizations/users discover and purchase capabilities.

```text
Marketplace
├── Banking Products
├── Loans
├── Deposits
├── Accounting
├── Payroll
├── Analytics
├── Integrations
├── Themes
└── Premium Capabilities
```

---

# 40. Themes & Branding

Organizations can buy/configure themes.

```text
Bank A → Theme A
Bank B → Theme B
Company A → Theme C
```

Themes may affect colors, logo, typography, navigation presentation, dashboard presentation, and product presentation. Business logic remains independent from branding.

---

# 41. Billing & Subscriptions

```text
Billing
├── Products
├── Plans
├── Subscriptions
├── Add-ons
├── Usage
├── Invoices
└── Payment Status
```

Examples:

```text
Company
├── Business Suite
├── Premium Analytics
├── All Banks
└── Theme
```

---

# 42. Integration Hub

Integration is a technical/business connection between systems.

```text
Integration
├── Connection
├── Authentication
├── Data Sync
├── Import
├── Export
├── Webhooks
├── API
└── Logs
```

Example:

```text
Company
├── Bank
├── Accounting System
├── Payroll Provider
├── CRM
└── Broker
```

Initial implementation is mock-first.

---

# 43. Partnerships & Ecosystem

Partnership is a business relationship between organizations.

```text
Organization A
      ↕
Relationship
      ↕
Organization B
```

Possible levels:

```text
Limited
Standard
Strategic
Open
Full Integration
```

Possible relationships:

```text
Partnership
Ownership
Subsidiary
Acquisition
Merger
Strategic Alliance
```

---

# 44. Data Sharing

A partnership does not automatically expose all data.

```text
Partnership
├── Shared Profile
├── Shared Products
├── Shared Documents
├── Shared Accounts
├── Shared Transactions
└── Shared Customer Data
```

Each category must have explicit permissions.

Example:

```text
Company Profile   ✓
Employee Data     ✓
Account Data      ✓
Transactions      ✗
Private Documents ✗
```

---

# 45. Organization Merger / Acquisition

Potential lifecycle:

```text
Requested → Due Diligence → Approval → Migration → Completed
```

A merger may produce:

```text
Bank A \
        > New Organization
Bank B /
```

For the prototype this can be simulated. It is a distinct organization-lifecycle capability, not merely a Partnership flag.

---

# 46. Platform Admin

Platform Admin operates at ecosystem level.

```text
Platform Admin
├── Dashboard
├── Organizations
├── Users
├── Workspaces
├── Banks
├── Companies
├── FOP
├── Accounts
├── Cards
├── Transactions
├── Payments
├── Partnerships
├── Mergers
├── Integrations
├── Data Governance
├── Compliance
├── Fraud
├── Risk
├── Audit
├── Analytics
├── Marketplace
├── Billing
└── Configuration
```

Platform Admin is not simply a Bank Manager with more permissions.

---

# 47. Platform Analytics & Ecosystem Map

Platform Admin can monitor ecosystem-level metrics:

```text
Organizations
Banks
Companies
Users
FOP
Accounts
Cards
Transactions
Financial Volume
Partnerships
Integrations
Products
Subscriptions
Compliance Cases
Fraud Cases
```

The ecosystem can eventually be visualized as:

```text
                         PLATFORM
                            |
          +-----------------+-----------------+
          |                 |                 |
        Bank A            Bank B            Bank C
          |                 |                 |
      Company A         Company B          Broker A
          |                 |                 |
          +--------- Partnership ------------+
                            |
                        Company C
```

Visibility does not automatically mean unrestricted access to sensitive financial data.

---

# 48. Cross-Product Business Flows

## 48.1 Customer Registration

```text
Registration
   ↓
Account Created
   ↓
Optional Product / Organization Setup
   ↓
Workspace Available
```

## 48.2 Login

```text
Login
   ↓
Account Identified
   ↓
Load Memberships
   ↓
One Workspace?
   ├── Yes → Open Workspace
   └── No  → Workspace Selection
```

## 48.3 Bank Selection

```text
Personal Banking
   ↓
Bank Selector
   ↓
Bank A / Bank B / Bank C
   ↓
Load bank-specific capabilities
```

## 48.4 FOP Request

```text
Customer
   ↓
Request FOP
   ↓
Application
   ↓
KYC / Documents
   ↓
Bank Review
   ↓
Approval
   ↓
FOP Activated
```

## 48.5 Company Connects Bank

```text
Company
   ↓
Banking
   ↓
Discover / Select Bank
   ↓
Connection Request
   ↓
Authorization / Approval
   ↓
Bank Connected
```

## 48.6 Company Payroll

```text
Company
   ↓
Payroll
   ↓
Salary Run
   ↓
Review
   ↓
Approval
   ↓
Bulk Payment
   ↓
Employee Accounts
```

## 48.7 Partnership

```text
Organization A
   ↓
Partnership Request
   ↓
Organization B
   ↓
Review
   ↓
Approve
   ↓
Define Scope
   ↓
Active Partnership
```

## 48.8 Merger

```text
Organization A + Organization B
             ↓
       Merger Request
             ↓
        Due Diligence
             ↓
          Approval
             ↓
          Migration
             ↓
      New Organization
```

---

# 49. Cross-Product Business Events

Important events include:

```text
AccountCreated
AccountOpened
AccountClosed

CardIssued
CardActivated
CardFrozen

PaymentCreated
PaymentApproved
PaymentRejected
PaymentCompleted
PaymentFailed

LoanRequested
LoanApproved
LoanRejected

DepositOpened
DepositMatured

FOPRequested
FOPSubmitted
FOPNeedsInformation
FOPApproved
FOPRejected
FOPActivated

DocumentGenerated
DocumentSigned
DocumentShared

EmployeeAdded
SalaryRunCreated
PayrollApproved
SalaryPaymentCompleted

PartnershipRequested
PartnershipApproved
PartnershipRejected
PartnershipTerminated

IntegrationConnected
IntegrationDisconnected

OrganizationCreated
OrganizationSuspended
MergerRequested
MergerApproved
OrganizationMerged

SubscriptionCreated
SubscriptionChanged
SubscriptionCancelled
```

These events will later connect bounded contexts without direct coupling.

---

# 50. Initial Business Rules

### Rule A — User access comes from membership

```text
Account → Membership → Workspace → Role → Permission
```

### Rule B — Product availability depends on capabilities

A bank may not expose every financial product.

### Rule C — Organization data is scoped

A company must not automatically see another organization's information.

### Rule D — Partnership does not equal unrestricted access

Data sharing is explicitly scoped.

### Rule E — Platform Admin is a separate authority model

Platform governance differs from bank management.

### Rule F — Business state belongs to the responsible context

Contexts expose contracts instead of allowing arbitrary mutation of internal state.

---

# 51. What This Document Does Not Define Yet

This document intentionally does not define:

- exact number of frontend pages;
- exact routes;
- Angular components;
- NgRx store boundaries;
- Firebase collection structure;
- API endpoint names;
- exact database schemas;
- pixel-level UI design;
- detailed page states;
- complete permission matrices;
- complete use-case specifications.

Those are later design stages.

---

# 52. Recommended Decomposition Order

## Stage 1 — Core user journey

```text
Registration
   ↓
Login
   ↓
Workspace Selection
   ↓
Personal Banking
   ↓
Bank Selection
   ↓
FOP Request
   ↓
Bank Review
   ↓
FOP Activation
```

## Stage 2 — Financial operations

```text
Accounts
Cards
Payments
Transfers
Deposits
Loans
```

## Stage 3 — Business platform

```text
Company
Employees
Payroll
Accounting
Taxes
Documents
```

## Stage 4 — Bank platform

```text
Customers
Customer 360
Products
FOP
Compliance
Risk
Fraud
Approvals
```

## Stage 5 — Ecosystem

```text
Marketplace
Billing
Themes
Integrations
Partnerships
Data Sharing
```

## Stage 6 — Platform governance

```text
Platform Admin
Analytics
Ecosystem Map
Mergers
Organization Governance
```

---

# 53. Next Detailed Target

The first complete vertical business slice is **FOP — end-to-end business decomposition** because it crosses:

```text
Customer
  ↓
Personal Banking
  ↓
FOP
  ↓
KYC
  ↓
Documents
  ↓
Bank Manager
  ↓
Workflow / Approval
  ↓
Bank
  ↓
Platform Admin
  ↓
Audit / Analytics
```

For this slice we will next specify, for every use case:

```text
Use Case
  ↓
Actors
  ↓
Preconditions
  ↓
Main Flow
  ↓
Alternative Flows
  ↓
Business Rules
  ↓
Events
  ↓
Result
```

Then:

```text
Use Case
  ↓
Page
  ↓
Feature
  ↓
User Action
  ↓
UI State
```

The resulting traceability is:

```text
Product
  ↓
Capability
  ↓
Business Flow
  ↓
Use Case
  ↓
Business Rule
  ↓
Event
  ↓
Page / Feature
  ↓
Application Logic
  ↓
API / Mock
```

This document therefore becomes the bridge between the Product Landscape and the later detailed UX, DDD, and Angular architecture work.
