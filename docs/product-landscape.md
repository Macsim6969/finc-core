# Product Landscape

**Document:** `docs/01-business/product-landscape.md`  
**Status:** Living document — strategic product definition  
**Scope:** Business/product landscape only. Detailed page design, API contracts, Angular architecture, and technical implementation are intentionally deferred.

## 1. Purpose

This document defines the complete product landscape of the platform. The project is not a small internet-banking application; it is a **configurable financial platform constructor and ecosystem**.

The platform should allow individuals to use personal banking, companies to manage business operations, banks to operate configurable banking products, and organizations to integrate, partner, share selected data, acquire or merge when appropriate rights and approvals exist.

The core architectural goal is **extensibility**: new business capabilities should be additive and should not require redesigning the platform core.

## 2. Product Vision

```text
                         FINANCIAL PLATFORM
                                  |
        +-------------------------+-------------------------+
        |                         |                         |
        v                         v                         v
 PERSONAL BANKING          BUSINESS PLATFORM          BANKING PLATFORM
        |                         |                         |
     Customer                  Company                    Bank
        |                         |                         |
        +-------------------------+-------------------------+
                                  |
                                  v
                       FINANCIAL ECOSYSTEM
                                  |
          +-----------------------+-----------------------+
          |                       |                       |
          v                       v                       v
     Partnerships          Integrations            Organizations
          |                       |                       |
          +-----------------------+-----------------------+
                                  |
                                  v
                       PLATFORM GOVERNANCE
                                  |
                                  v
                           Platform Admin
```

The platform behaves more like an ecosystem and constructor than a single fixed banking product.

## 3. Core Product Principles

### 3.1 Platform-first

The platform itself is a first-class business product. It owns platform-wide concepts such as identity, organizations, workspaces, memberships, capabilities, subscriptions, marketplace, partnerships, integrations, governance, and ecosystem analytics.

### 3.2 Workspace-oriented experience

After authentication, the platform determines which workspaces the user can access.

```text
Login -> Account -> Workspace Selection -> Current Workspace
```

If there is one workspace it can be selected automatically. If there are several, the user gets a dedicated selection screen similar to an account/profile selector.

Example:

```text
My Factory Ltd
Business Bank
Personal Banking
```

A Workspace is a working context, not a replacement for Company, Bank, Customer, or Account.

### 3.3 One Account can have multiple roles

```text
Account: User
 |
 +-- My Factory Ltd      -> Owner
 +-- Business Bank       -> Bank Manager
 +-- Personal Banking    -> Customer
```

`Account` is identity; `Membership` connects an account to a workspace; `Role` defines responsibility in that context; `Organization` is the business participant.

### 3.4 Capabilities are composable

Capabilities may come from platform defaults, organization configuration, purchased products, subscriptions, partnerships, integrations, or permissions.

### 3.5 Banks are configurable products

Two banks inside the same platform may have different branding, themes, products, pricing, capabilities, integrations, workflows, and customer experiences.

## 4. Participant Landscape

### Individual / Customer

Uses personal financial services and may cooperate with multiple banks.

### Company

Can use Business Suite, connect to existing banks, work with several banks, manage employees/FOP/payroll/taxes/documents, and potentially create or operate a bank where the business model permits it.

### Bank

Provides accounts, cards, payments, loans, deposits, FOP and business banking; configures products and pricing; manages KYC/AML, risk, fraud, approvals, integrations and partnerships.

### External Organization

Future organization types include brokers, accounting providers, insurance providers, payment providers, investment providers, payroll providers and other financial services.

## 5. Product Landscape Overview

```text
FINANCIAL PLATFORM
|
+-- 01. Identity & Access
+-- 02. Workspace & Organization Management
+-- 03. Personal Banking
+-- 04. FOP
+-- 05. Business Platform
+-- 06. Banking Platform
+-- 07. Accounts
+-- 08. Cards
+-- 09. Payments & Transfers
+-- 10. Loans
+-- 11. Deposits & Savings
+-- 12. Investments
+-- 13. Accounting
+-- 14. Payroll
+-- 15. Tax Management
+-- 16. Documents
+-- 17. Compliance & KYC
+-- 18. Fraud Detection
+-- 19. Risk & Audit
+-- 20. Workflow & Approvals
+-- 21. Support Center
+-- 22. Marketplace & Product Catalog
+-- 23. Billing & Subscriptions
+-- 24. Integration Hub
+-- 25. Partnership & Ecosystem
+-- 26. Data Governance
+-- 27. Analytics
+-- 28. Platform Governance
+-- 29. Branding & Themes
+-- 30. Notifications
```

These are product/capability areas, not a final route list.

## 6. Identity & Access

Responsibilities: registration, authentication, sessions, identity, memberships, roles, permissions, authorization, organization access and workspace access.

```text
Account
  |
  +-- Membership
        |
        +-- Workspace
              +-- Role
              +-- Permissions
```

Identity should not contain banking business logic.

## 7. Workspace & Organization Management

Capabilities: organization creation/configuration, workspace selection, memberships, invitations, teams, organization profile and lifecycle management.

A user may have several workspaces at the same time.

## 8. Personal Banking

Personal Banking is the main personal financial product.

Capabilities:

- Dashboard and financial overview
- Current, savings and multi-currency accounts
- Account details, statements and transactions
- Physical and virtual cards
- Card activation, freeze/unfreeze, limits and settings
- Payments and transfers
- Scheduled and recurring payments
- Recipients
- Loans and repayments
- Deposits and savings
- Investments (future)
- Insurance (future)
- Documents
- Notifications
- Support
- Settings

A customer may have relationships with multiple banks.

```text
Personal Banking
 |
 +-- Bank A
 +-- Bank B
 +-- Bank C
 +-- All Banks (premium capability)
```

## 9. FOP Product

FOP is a **separate business product/context**, not merely another menu item.

The common platform header may remain, while the FOP area has its own navigation/application shell.

### FOP lifecycle

```text
Customer
   |
   v
Request FOP
   |
   v
FOP Application
   |
   v
Pending
   |
   +--> Rejected
   |
   +--> Approved
           |
           v
       FOP Active
           |
           v
      FOP Context
```

Before activation the user sees the request/application state. After activation the FOP product becomes available as a dedicated business area.

Capabilities:

- FOP dashboard
- FOP account
- income/expenses
- payments
- taxes and tax calculations
- tax payments and tax documents
- employees
- payroll
- accounting
- reports
- contracts
- generated documents
- settings

Customer flow: request FOP -> application -> approval/rejection. Bank Manager flow: FOP applications -> review -> approve/reject.

## 10. Business Platform

A company can use the Business Platform without creating its own bank.

Capabilities:

- Company Dashboard
- Organization management
- Employees
- Employee accounts
- Employee FOP
- Payroll and salary runs
- Company accounts
- Income/expenses/cash flow
- Taxes
- Accounting
- Reports
- Documents
- Contracts
- Approvals
- Company banking
- Integrations
- Partnerships
- Marketplace

### Business Suite

Business Suite is a commercial product that a company can purchase.

```text
Company
 |
 +-- Business Suite
 |
 +-- Connect Existing Bank
```

or:

```text
Company
 |
 +-- Own Bank
 +-- Business Suite
```

Owning a bank is therefore not a prerequisite for using business functionality.

## 11. Employee & Payroll Management

Capabilities: employee list/profile, employee bank accounts, employee FOP, salary calculation, salary runs, salary payments, payroll calendar, payroll reports and tax-related payroll operations.

```text
Company
 |
 +-- Employee A -> Bank Account + FOP
 +-- Employee B -> Bank Account + FOP
 +-- Employee C -> Bank Account + FOP
```

## 12. Banking Platform

A bank is a configurable organization/product inside the platform.

Capabilities:

- Bank Dashboard
- Customers
- Customer 360
- Accounts
- Cards
- Payments and transfers
- Loans
- Deposits
- FOP
- Business Banking
- Products
- Pricing
- KYC/AML
- Fraud
- Risk
- Approvals
- Documents
- Support
- Partners
- Integrations
- Analytics
- Settings

Two banks may look completely different while using the same platform foundation.

## 13. Customer 360

A bank should have a unified customer view:

```text
Customer 360
|
+-- Profile
+-- KYC
+-- Accounts
+-- Cards
+-- Loans
+-- Deposits
+-- FOP
+-- Transactions
+-- Documents
+-- Support
+-- Risk
+-- Fraud
+-- Relationships
+-- Activity Timeline
```

The timeline can show events such as account opening, card issuance, transactions, KYC decisions and loan applications.

## 14. Accounts

Potential account types: personal current, savings, business, FOP, multi-currency, internal and settlement accounts.

Capabilities: opening, closing, status, balances, transactions, statements, permissions and limits.

Different contexts may have different meanings of Account; the platform should not force one universal model.

## 15. Cards

Capabilities: issuance, physical/virtual cards, activation, freeze/unfreeze, limits, replacement, expiry, status, controls and transactions.

Future extensions: family cards, employee cards, disposable virtual cards and merchant controls.

## 16. Payments & Transfers

Payments are a major business capability.

Types:

- internal transfer
- bank transfer
- customer-to-customer transfer
- scheduled payment
- recurring payment
- bulk payment
- payroll payment
- tax payment
- international payment

Lifecycle:

```text
Created -> Pending -> Approved -> Processing -> Completed
```

Alternative states: rejected, failed, cancelled, expired.

Payments may interact with Workflow, Compliance, Fraud, Risk, Audit and Notifications.

## 17. Loans

Capabilities: products, eligibility, applications, approval workflow, risk assessment, agreements, disbursement, repayment schedules, early repayment, overdue state and history.

## 18. Deposits & Savings

Capabilities: products, rates, opening, maturity, early withdrawal, interest calculation, statements and renewal.

## 19. Investments

Future capability: portfolios, stocks, bonds, funds, investment accounts, orders, transactions and performance analytics.

If implemented deeply, Investments should become its own bounded context rather than a large extension of Banking.

## 20. Accounting

Capabilities: chart of accounts, income, expenses, accounting records, reconciliation, accounting reports, period closing, exports and external accounting integrations.

Initially this can be mock-based.

## 21. Tax Management

Capabilities: tax overview, calculation, liabilities, payment, documents, reports, filing preparation and reminders.

Government/tax integrations may initially be simulated.

## 22. Documents

Documents are a platform capability.

```text
Documents
|
+-- Document Vault
+-- Generated Documents
+-- Uploaded Documents
+-- Contracts
+-- Tax Documents
+-- Statements
+-- Reports
+-- Templates
+-- Digital Signatures
+-- Sharing
```

Documents need ownership, access control, versions, status, signatures and audit history.

## 23. Compliance & KYC

Capabilities: identification, KYC, AML, verification, document checks, sanctions-related checks, customer risk profiles and compliance cases.

## 24. Fraud Detection

Initially mock-based.

```text
Payment -> Fraud Evaluation -> Low Risk / Review / Block
```

Capabilities: suspicious transaction detection, risk scoring, alerts, cases, investigation and rules.

## 25. Risk & Audit

Risk areas: customer, transaction, credit, organization and operational risk.

Audit areas: user actions, financial actions, permission changes, configuration changes, data access, partnership changes and integration changes.

## 26. Workflow & Approvals

A reusable workflow capability should support payment approval, loan approval, FOP approval, employee onboarding, document approval, partnership approval, merger workflows and sensitive data access.

```text
Request -> Workflow -> Approver(s) -> Approved / Rejected
```

The goal is to avoid implementing separate approval engines inside every product.

## 27. Support Center

Capabilities: tickets, conversations, chat, requests, escalation, support history, SLA/status and internal notes.

## 28. Marketplace

The Marketplace turns the platform into a configurable ecosystem.

Possible items:

- banking products
- loans
- deposits
- insurance
- accounting
- payroll
- analytics
- integrations
- themes
- premium capabilities

## 29. Branding & Themes

Organizations can buy or configure themes.

A bank can therefore have a unique visual identity while running on shared platform infrastructure.

Branding may include logo, colors, typography, navigation configuration, dashboard widgets and product presentation.

## 30. Billing & Subscriptions

Capabilities: products, plans, subscriptions, add-ons, licenses, usage, invoices, payment status, cancellation, upgrades and downgrades.

Example:

```text
Company
 |
 +-- Business Suite
 +-- Premium Analytics
 +-- All Banks
 +-- Custom Theme
```

## 31. All Banks

All Banks is a **premium cross-bank capability**, not a separate Workspace.

```text
Personal Banking
|
+-- Bank A
+-- Bank B
+-- Bank C
+-- All Banks
```

Basic tier may show total cards and total balance. Premium may add combined balances, cross-bank transactions, analytics, reports and advanced insights.

## 32. Integration Hub

Integration and Partnership are separate concepts.

**Partnership:** a business relationship.  
**Integration:** a technical relationship that enables systems to exchange data or invoke capabilities.

Capabilities:

- API connections
- OAuth
- webhooks
- data synchronization
- import/export
- integration logs
- external service connections
- integration marketplace

Example:

```text
Company
 |
 +-- Bank
 +-- Accounting System
 +-- Payroll Provider
 +-- CRM
 +-- Broker
```

## 33. Partnership & Ecosystem

Organizations may establish relationships such as bank-company, bank-bank, company-company, company-broker and bank-provider.

Partnership scope can range from narrow to fully open:

```text
Relationship
|
+-- Limited Partnership
+-- Standard Partnership
+-- Strategic Partnership
+-- Open Partnership
+-- Full Integration Relationship
```

The exact legal/commercial semantics are to be refined later.

## 34. Data Sharing

Partnership does not automatically grant unrestricted access.

A partnership may have an explicit Data Sharing Policy:

```text
Partnership
 |
 +-- Company Profile       ✓
 +-- Employee Data         ✓
 +-- FOP Data              ✓
 +-- Account Data          ✓
 +-- Transaction Data      ✗
 +-- Personal Documents    ✗
 +-- Internal Bank Data    ✗
```

Data sharing must be explicit, scoped, permission-based, auditable and revocable.

## 35. Mergers, Acquisitions & Organization Changes

The ecosystem can support relationships stronger than partnership:

- ownership
- subsidiary
- acquisition
- merger
- strategic alliance
- integration

Example:

```text
Bank A + Bank B
       |
     Merger
       v
New Organization
```

Possible lifecycle:

```text
Requested -> Due Diligence -> Approval -> Migration -> Completed
```

The platform does not assume organizations can merge automatically. Appropriate rights, approvals and business rules are required. For the prototype, this can initially be represented by a simulated workflow.

## 36. Platform Governance

Platform Admin operates at the ecosystem level and is distinct from Bank Manager.

```text
Platform Admin
|
+-- Dashboard
+-- Organizations
|   +-- Banks
|   +-- Companies
|   +-- Brokers
|   +-- Providers
+-- Users
+-- Workspaces
+-- FOP
+-- Accounts
+-- Cards
+-- Transactions
+-- Payments
+-- Partnerships
+-- Mergers & Acquisitions
+-- Integrations
+-- Data Governance
+-- Documents
+-- Compliance
+-- Risk
+-- Fraud
+-- Audit
+-- Financial Analytics
+-- Platform Analytics
+-- Marketplace
+-- Billing
+-- Platform Configuration
```

## 37. Platform Analytics & Ecosystem Map

Platform Admin should eventually see the entire ecosystem as a network.

```text
                         PLATFORM
                            |
          +-----------------+-----------------+
          |                 |                 |
        Bank A            Bank B            Bank C
          |                 |                 |
       Company A         Company B         Broker A
          |                 |                 |
          +-------- Partnership -----------+
                            |
                        Company C
```

Metrics can include organizations, banks, companies, users, FOP, accounts, cards, transaction volume, financial volume, partnerships, integrations, products, subscriptions, compliance cases, fraud cases and growth.

## 38. Visibility vs Business Access

```text
Visibility != Business Access
```

Platform Admin can have ecosystem-level visibility without automatically receiving unrestricted access to sensitive customer documents or financial details. Elevated access must be permissioned and auditable.

## 39. Notifications

Cross-platform events can generate in-app, email, push, SMS or webhook notifications.

Examples: payments, cards, accounts, FOP status, tax deadlines, loans, documents, approvals, partnerships, integrations and fraud alerts.

## 40. Analytics

Analytics exist at multiple levels.

Customer: income, expenses, cash flow, spending, savings, investments.

Company: revenue, expenses, payroll, cash flow, taxes, employee costs, banking.

Bank: customers, deposits, loans, transactions, revenue, risk, fraud and product adoption.

Platform: organizations, users, banks, companies, FOP, transactions, financial volume, partnerships, integrations and growth.

Analytics should consume business data/events rather than own transactional business logic.

## 41. Product vs Business Context

A product can contain several capabilities, and a capability may participate in multiple products.

For example:

```text
FOP
 |
 +-- Personal Banking
 +-- Business Platform
 +-- Banking Platform
```

This does not imply one universal FOP domain model. Each bounded context owns the model relevant to its business concern and integrates through explicit contracts.

## 42. Extensibility Rules

### Rule 1 — New capabilities should be additive

Adding Insurance, for example, should not require rewriting Identity, Workspace, Banking or Company foundations.

### Rule 2 — No universal domain model

Avoid one universal User/Customer/Account/Product/Organization model shared by every context. The same word may have different meanings in different contexts.

### Rule 3 — Integrate through contracts

Contexts communicate through commands, queries, APIs, events and explicit translation models. One context should not manipulate another context's internal data directly.

### Rule 4 — Business events are first-class

Examples:

```text
FOPRequested
FOPApproved
FOPRejected
FOPActivated

AccountOpened
CardIssued

PaymentCreated
PaymentApproved
PaymentCompleted
PaymentFailed

LoanRequested
LoanApproved
LoanRejected

PartnershipRequested
PartnershipApproved
PartnershipRejected

IntegrationConnected
IntegrationDisconnected

OrganizationMergeRequested
OrganizationMerged
```

Events should enable downstream capabilities without creating tight coupling.

## 43. Mock-First Implementation Strategy

The first implementation uses mocks, but the business/application layer must not depend directly on mock storage.

```text
UI
 |
v
Application / Use Case
 |
v
Port / Repository / Gateway
 |
+-----------------------+
|                       |
v                       v
Mock Implementation   Firebase / API
```

Initially the platform uses mock implementations. Later Firebase or other APIs can replace them without changing business rules.

## 44. Delivery Phases

The landscape is intentionally large. We do not implement everything at once.

### Phase 1 — Foundation

- Identity
- Workspace
- Organization
- Roles/permissions
- Personal Banking
- Company Workspace
- Bank Workspace
- FOP lifecycle
- basic Accounts
- basic Cards
- basic Payments
- mock data

### Phase 2 — Core Financial Platform

- Loans
- Deposits
- Payroll
- Taxes
- Documents
- Accounting
- Compliance
- Workflow
- Audit
- Support

### Phase 3 — Ecosystem

- Marketplace
- Billing
- Themes
- Integrations
- Partnerships
- Data Sharing
- Ecosystem Map
- Platform Analytics

### Phase 4 — Advanced Ecosystem

- Investments
- Insurance
- Brokers
- advanced Risk
- Fraud
- mergers/acquisitions
- advanced organization relationships
- advanced cross-bank capabilities

## 45. What This Document Does NOT Define Yet

This document intentionally does not define:

- exact number of frontend pages;
- exact routes;
- exact Angular components;
- exact Nx library structure;
- NgRx store boundaries;
- Firebase collection structure;
- API endpoint names;
- exact database schemas;
- pixel-level UI design;
- detailed page behavior;
- complete permission matrices;
- complete use-case specifications.

Those belong to later stages:

```text
Product
   |
   v
Capability
   |
   v
Business Flow
   |
   v
Use Case
   |
   v
Page / Feature
```

## 46. Strategic Architecture Direction

```text
                       PLATFORM CORE
                            |
        +-------------------+-------------------+
        |                   |                   |
    Identity            Organization        Governance
        |                   |                   |
        +-------------------+-------------------+
                            |
                     Business Contexts
                            |
       +--------------------+---------------------+
       |                    |                     |
 Personal Banking     Business Platform     Banking Platform
       |                    |                     |
       +--------------------+---------------------+
                            |
                    Financial Capabilities
                            |
       +--------------------+---------------------+
       |          |         |         |            |
    Payments   Cards      Loans    Deposits     FOP
       |
       +--------------------+---------------------+
                            |
                  Cross-Cutting Capabilities
                            |
       +---------+---------+---------+------------+
       |         |         |         |            |
    KYC/AML   Fraud      Risk      Audit      Workflow
                            |
                    Ecosystem Layer
                            |
       +--------------------+---------------------+
       |                    |                     |
 Partnerships        Integrations           Marketplace
       |                    |                     |
       +--------------------+---------------------+
                            |
                       External World
```

The goal is not to make every box a microservice immediately. The goal is to establish clear business boundaries first and then choose the appropriate technical decomposition. Bounded contexts are modelling boundaries; they do not automatically imply one deployment/service per context.

## 47. Final Product Definition

The project is a:

> **Configurable financial ecosystem and banking platform constructor.**

It allows:

```text
INDIVIDUAL
    |
    +-- Personal Banking
    +-- Multiple Banks
    +-- Cards
    +-- Accounts
    +-- Payments
    +-- FOP
    +-- Investments
    +-- Loans
    +-- Deposits

COMPANY
    |
    +-- Business Suite
    +-- Employees
    +-- Payroll
    +-- Accounting
    +-- Taxes
    +-- Documents
    +-- FOP Management
    +-- Banking
    +-- Integrations
    +-- Partnerships

BANK
    |
    +-- Customers
    +-- Accounts
    +-- Cards
    +-- Loans
    +-- Deposits
    +-- FOP
    +-- Business Banking
    +-- Products
    +-- Compliance
    +-- Fraud
    +-- Risk
    +-- Partnerships
    +-- Integrations

PLATFORM
    |
    +-- Organizations
    +-- Users
    +-- Workspaces
    +-- Partnerships
    +-- Integrations
    +-- Data Governance
    +-- Marketplace
    +-- Billing
    +-- Analytics
    +-- Platform Governance
    +-- Ecosystem Map
```

The core composition model is:

```text
Organization
    +
Products
    +
Capabilities
    +
Roles
    +
Permissions
    +
Integrations
    +
Partnerships
    +
Data Sharing
    +
Branding
    =
Configurable Financial Organization
```

The next stage is to decompose each product into business capabilities, user journeys, use cases, and eventually pages/features.
