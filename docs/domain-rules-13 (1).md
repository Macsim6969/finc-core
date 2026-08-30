# 13 — Domain Rules

## Purpose

This document defines the high-level business rules of the platform. It establishes how Users, Organizations, Workspaces, Banks, Companies, Brokers, Customers, Products, Capabilities and the main banking/business domains interact.

The goal is to keep the platform extensible: new business capabilities should be addable without rewriting existing bounded contexts.

---

## 13.1 — Identity Rules

Identity represents the global User.

```text
User
├── Identity
├── Credentials
├── Profile
├── Memberships
└── Preferences
```

A User can participate in multiple organizations and workspaces.

A User is not the same thing as a Customer, Employee, Contractor or Membership.

---

## 13.2 — Organization Rules

Organization is the main business ownership boundary.

Supported organization types:

```text
PERSON
COMPANY
BANK
BROKER
```

An Organization can have Members, Roles, Permissions, Products, Capabilities, Relationships, Documents and Settings.

Organizations have their own lifecycle:

```text
CREATING → PENDING → ACTIVE → SUSPENDED → ARCHIVED
```

---

## 13.3 — Workspace Rules

Workspace represents the user's working environment.

A User can have several workspaces:

```text
My Factory Ltd
Business Bank
Personal Banking
```

After login:

```text
Login
↓
Resolve User
↓
Resolve Memberships
↓
If one workspace → open it
If multiple → Workspace Selection
↓
Home
```

Workspace controls the user's working context, navigation and available functionality.

---

## 13.4 — Company Rules

Company is a first-class Organization.

```text
Company
├── Employees
├── Contractors
├── Accounts
├── Banks
├── Payroll
├── Accounting
├── Taxes
├── Documents
└── Reports
```

A Company can exist without creating its own Bank and can connect to multiple Banks.

A Company may later create its own Bank.

### Company Roles

Initial roles:

```text
OWNER
ADMIN
ACCOUNTANT
HR_MANAGER
PAYROLL_MANAGER
EMPLOYEE
```

Custom roles may be added later.

### Employee ≠ User

An Employee is a Company business record. A User is a platform identity.

An Employee can exist before the Company invites that person to the platform.

### Employee ≠ Contractor/FOP

Employees and external Contractors/FOP are separate business concepts.

### Payroll

```text
Select Period
↓
Calculate Salaries
↓
Calculate Taxes
↓
Generate Payments
↓
Approval
↓
Execution
```

### Accounting

```text
Transactions
Expenses
Revenue
Invoices
Reconciliation
Reports
```

### Taxes

```text
Payroll Taxes
Company Taxes
Tax Payments
Tax Documents
Tax Reports
```

### Company Marketplace

A Company may purchase additional capabilities such as Payroll, Accounting, Tax Management, Advanced Reports, Document Management and Analytics.

Company functionality is modular and capability-driven.

---

## 13.5 — Bank Rules

Bank is a first-class Organization.

```text
Bank
├── Members
├── Customers
├── Products
├── Accounts
├── Cards
├── Payments
├── FOP
├── Loans
├── Deposits
├── Compliance
├── Risk
├── Fraud
├── Treasury
├── Support
├── Partnerships
└── Integrations
```

Bank Owner manages the Bank and is not automatically Platform Admin.

Bank Manager operates the Bank according to assigned permissions.

A User can be a Customer of multiple Banks.

Each Bank can offer a different set of products and capabilities.

### FOP Capability

FOP is not part of the initial registration flow.

```text
FOP = ON  → Bank can accept FOP applications
FOP = OFF → Bank cannot accept FOP applications
```

### FOP Application

```text
Customer
↓
FOP Page
↓
Choose Bank
↓
Check Capability
↓
Application
↓
Verification
↓
Approval
↓
FOP Created
```

### Bank Branding

Banks can look completely different while using the same platform foundation.

Branding may include Logo, Colors, Theme, Typography and Navigation.

Business logic must not use bank-specific conditionals. Instead:

```text
Capabilities
↓
Products
↓
Permissions
↓
Navigation
```

Companies can connect to Banks through a CompanyBankRelationship.

Banks can establish partnerships, integrations and other relationships.

Banks may potentially merge through a controlled migration and audit process.

---

## 13.6 — Broker Rules

Broker is a separate Organization.

```text
Broker
├── Members
├── Clients
├── Applications
├── Banks
├── Products
├── Deals
├── Documents
├── Commissions
└── Integrations
```

A Broker can work with multiple Banks.

```text
Customer
↓
Broker
↓
Compare Products
↓
Bank A / Bank B / Bank C
```

Broker access must be scope-based.

Possible scopes:

```text
CUSTOMER_PROFILE
APPLICATION
DOCUMENTS
PRODUCTS
STATUS
```

A Broker can receive commissions for completed deals.

Banks and Brokers may establish formal Partnerships.

---

## 13.7 — Customer Rules

Customer represents the relationship between a User and a Bank.

```text
User
↓
Bank Customer Relationship
↓
Customer
```

A User may be a Customer of multiple Banks.

Possible customer types:

```text
PERSONAL
BUSINESS
FOP
```

Customer status:

```text
PENDING
ACTIVE
RESTRICTED
SUSPENDED
CLOSED
```

Available Customer products depend on the Bank's capabilities and products.

---

## 13.8 — FOP Rules

FOP is a separate business context.

```text
FOP
├── Owner
├── Bank
├── Application
├── Account
├── Taxes
├── Payments
├── Documents
└── Reports
```

FOP is requested after registration through a dedicated flow.

```text
Customer
↓
Request FOP
↓
Choose Bank
↓
Check FOP Capability
↓
Application
↓
Verification
↓
Approval
↓
FOP Created
```

After successful opening, the user receives a dedicated FOP experience.

The Header can remain shared while the FOP workspace/sidebar is different.

A personal FOP is not owned by the Company simply because the person is an employee or contractor.

---

## 13.9 — Account Rules

Account belongs to an ownership context and Bank.

```text
Account
├── Owner
├── Bank
├── Type
├── Currency
├── Balance
├── Status
└── Transactions
```

Possible types:

```text
Personal
Business
FOP
Savings
Credit
Internal
```

Status:

```text
PENDING
ACTIVE
BLOCKED
FROZEN
CLOSED
```

Ownership must support different owner types rather than assuming every account belongs directly to a User.

---

## 13.10 — Card Rules

Cards are associated with Accounts.

```text
Card
↓
Account
↓
Bank
```

Types:

```text
Physical
Virtual
Debit
Credit
Business
```

Lifecycle:

```text
Requested
↓
Issued
↓
Active
↓
Blocked
↓
Expired / Closed
```

Operations:

```text
Activate
Block
Unblock
Replace
Freeze
Set Limits
```

---

## 13.11 — Payment Rules

Payment is a separate business context.

```text
Payment
├── Sender
├── Receiver
├── Amount
├── Currency
├── Source Account
├── Destination
├── Status
└── Metadata
```

Lifecycle:

```text
Created
↓
Pending
↓
Approved
↓
Processing
↓
Completed
```

Failure paths include Rejected and Failed.

Possible payment types:

```text
Internal Transfer
Bank Transfer
Card Payment
Payroll Payment
Tax Payment
FOP Payment
Company Payment
```

Workflow & Approvals provides the generic approval mechanism.

---

## 13.12 — Product Rules

Product is a concrete offering made available by an Organization.

```text
Bank
├── Debit Card
├── Credit Card
├── Business Account
├── FOP Account
├── Loan
└── Deposit
```

Product is not the same as Capability.

```text
Capability → what the organization can support
Product    → what the organization offers to users
```

Product lifecycle:

```text
Draft
↓
Configured
↓
Published
↓
Active
↓
Suspended
↓
Retired
```

---

## 13.13 — Capability Rules

Capability is one of the main architectural mechanisms.

```text
Organization
↓
Capability
↓
Feature
```

Example:

```text
Bank
├── FOP = ON
├── Loans = ON
├── Deposits = OFF
└── Investments = OFF
```

Capability and Permission are different.

Capability answers:

> Can this Organization provide this functionality?

Permission answers:

> Can this particular User perform this action?

Capabilities can be hierarchical:

```text
BANKING
├── ACCOUNTS
├── CARDS
├── PAYMENTS
├── FOP
├── LOANS
└── DEPOSITS
```

Capabilities can also have configuration:

```text
FOP
├── enabled
├── applicationRequired
├── supportedCurrencies
├── supportedRegions
└── requiredDocuments
```

---

## 13.14 — Organization Relationship Rules

Relationships between Organizations are first-class business objects.

```text
OrganizationRelationship
```

Possible relationships:

```text
Company ↔ Bank
Bank ↔ Bank
Broker ↔ Bank
Company ↔ Broker
Company ↔ Company
```

Lifecycle:

```text
REQUESTED
↓
PENDING
↓
ACTIVE
↓
SUSPENDED
↓
TERMINATED
```

Relationships contain explicit scopes such as:

```text
PAYMENTS
PAYROLL
ACCOUNTING
DOCUMENTS
LOANS
FOP
REPORTING
```

A relationship does not automatically grant unrestricted access.

---

## 13.15 — Partnership Rules

Partnership represents a higher-level relationship between organizations.

```text
Bank A
↕
Partnership
↕
Bank B
```

Visibility/access models:

```text
PRIVATE
LIMITED
OPEN
```

Possible types:

```text
Product Distribution
Payments
Referrals
Data Sharing
Integration
Joint Products
```

Partnership does not imply full data access.

Access is controlled through:

```text
Scopes
Permissions
Contracts
Data Sharing Rules
```

---

## 13.16 — Organization Merge Rules

Organizations can potentially merge.

```text
Organization A
+
Organization B
↓
Merge Request
↓
Review
↓
Approvals
↓
Compliance
↓
Migration
↓
Merged Organization
```

Potentially affected data:

```text
Users
Members
Accounts
Products
Documents
Relationships
Contracts
Payments
Employees
```

Every merge must preserve an Audit Trail.

---

## 13.17 — Document Rules

Documents are a separate context.

```text
Document
├── Owner
├── Type
├── Status
├── Version
├── Storage
└── Permissions
```

Types:

```text
KYC
Contract
Invoice
Tax Document
Payroll Document
Bank Document
FOP Document
Report
```

Lifecycle:

```text
Created
↓
Uploaded / Generated
↓
Verified
↓
Signed
↓
Archived
```

---

## 13.18 — Audit Rules

Critical actions must produce an immutable audit event.

```text
User
↓
Action
↓
Audit Event
```

Example:

```text
Who: Accountant
What: Approved Payroll
Where: Company A
When: timestamp
Result: Success
```

Normal users cannot modify audit records.

---

## 13.19 — Notification Rules

Notification is a shared context.

```text
Notification
├── User
├── Type
├── Channel
├── Status
└── Payload
```

Channels:

```text
In-App
Email
Push
SMS
```

New channels should be addable without changing business contexts.

---

## 13.20 — Support Rules

Support Center provides customer support.

```text
Customer
↓
Ticket
↓
Support Agent
↓
Resolution
```

Tickets may reference:

```text
Account
Payment
Card
FOP
Loan
Company
Bank
```

Support can also provide Chat, FAQ and Complaints.

---

## 13.21 — Workflow & Approval Rules

Workflow & Approvals is a reusable business mechanism.

It can be used by:

```text
Payments
Loans
FOP
Bank Connections
Partnerships
Merges
Payroll
```

Generic flow:

```text
Created
↓
Approval Required
↓
Approved / Rejected
↓
Executed
```

The workflow engine does not own the underlying business object.

---

## 13.22 — Compliance Rules

Compliance is a separate cross-cutting business context.

```text
Customer
↓
KYC
↓
AML
↓
Risk
↓
Decision
```

Compliance may participate in:

```text
FOP
Loans
Payments
Bank Connection
Partnership
Organization Merge
```

---

## 13.23 — Fraud Rules

Fraud Detection should not belong exclusively to Payments.

Signals may come from:

```text
Transactions
Payments
Cards
Accounts
Login
```

Flow:

```text
Event
↓
Fraud Engine
↓
Risk Score
↓
ALLOW / REVIEW / BLOCK
```

The first implementation may use mocks, while keeping an adapter boundary for a real engine later.

---

## 13.24 — Treasury Rules

Treasury primarily belongs to the Bank domain.

```text
Bank
↓
Treasury
├── Liquidity
├── Reserves
├── Internal Accounts
├── Funding
└── Financial Position
```

Treasury functionality is not exposed to ordinary Customers.

---

## 13.25 — Integration Rules

External integrations must be isolated behind ports/adapters.

```text
Domain
↓
Application
↓
Integration Port
↓
Adapter
↓
External System
```

Example:

```text
Bank
↓
KYC Port
↓
KYC Adapter
↓
External KYC Provider
```

Business logic must not depend directly on a specific external provider.

---

## 13.26 — Marketplace Rules

Marketplace is an ecosystem context.

```text
Marketplace
├── Products
├── Integrations
├── Services
├── Themes
└── Add-ons
```

Users, Companies and Banks may purchase additional capabilities.

---

## 13.27 — Theme Rules

Theme is presentation configuration, not business logic.

A Bank can have its own:

```text
Colors
Logo
Typography
Navigation Style
Branding
```

Theme must never determine:

```text
Payment Rules
Account Rules
Authorization
Business Logic
```

---

## 13.28 — All Banks Rules

All Banks is an additional premium capability.

```text
Personal Banking
├── Bank A
├── Bank B
├── Bank C
└── All Banks
```

### Basic

May show:

```text
Total Cards
Total Balance
Number of Banks
```

### Premium

May provide:

```text
Cross-bank Analytics
Aggregated Transactions
Financial Insights
Advanced Reports
Cross-bank Transfers
```

All Banks does not own the underlying bank accounts.

---

## 13.29 — Financial Aggregation Rules

All Banks aggregates information from participating Banks.

```text
Bank A
Bank B
Bank C
↓
Aggregation Layer
↓
All Banks
```

Each Bank remains authoritative for its own data.

---

## 13.30 — Platform Rules

Platform is the highest-level ecosystem boundary.

```text
Platform
├── Users
├── Organizations
├── Workspaces
├── Banks
├── Companies
├── Brokers
├── Customers
├── Products
├── Relationships
├── Marketplace
└── Ecosystem
```

Platform provides global governance and shared infrastructure.

---

## 13.31 — Platform Admin Rules

Platform Admin has global operational visibility.

Potential areas:

```text
Users
Organizations
Banks
Companies
Brokers
Customers
Relationships
Partnerships
Integrations
Financial Metrics
Compliance
Risk
Fraud
```

Platform Admin does not automatically receive unrestricted access to all customer business data.

Administrative access is governed by:

```text
Platform Permissions
Administrative Scopes
Audit
Access Policies
```

---

## 13.32 — Platform Analytics Rules

Platform Analytics aggregates platform-wide metrics.

Example:

```text
Banks
Companies
Users
Cards
Accounts
Transactions
```

It can also show:

```text
Bank Relationships
Partnerships
Integrations
Product Adoption
Revenue
Transaction Volume
```

---

## 13.33 — Organization Lifecycle Rules

All Organizations have lifecycle states:

```text
CREATING
↓
PENDING
↓
ACTIVE
↓
SUSPENDED
↓
ARCHIVED
```

Physical deletion should not be the normal business operation.

---

## 13.34 — User Lifecycle Rules

Users have their own lifecycle:

```text
REGISTERED
↓
ACTIVE
↓
SUSPENDED
↓
DEACTIVATED
```

User lifecycle is independent from Membership lifecycle.

---

## 13.35 — Membership Lifecycle Rules

Memberships have their own lifecycle:

```text
INVITED
↓
PENDING
↓
ACTIVE
↓
SUSPENDED
↓
REMOVED
```

A User may remain active even after being removed from one Company or Bank.

---

## 13.36 — Permission Rules

Permissions represent specific actions.

Examples:

```text
PAYMENT_VIEW
PAYMENT_CREATE
PAYMENT_APPROVE
PAYMENT_EXECUTE
```

Avoid broad permissions such as `CAN_DO_EVERYTHING`.

---

## 13.37 — Role Rules

Role is a reusable collection of Permissions.

Example:

```text
Accountant
├── ACCOUNTING_VIEW
├── ACCOUNTING_EDIT
├── TAX_VIEW
└── REPORT_VIEW
```

Roles should not contain business logic.

---

## 13.38 — Capability + Permission Rules

Final authorization model:

```text
Organization
↓
Capability
↓
Product
↓
User Membership
↓
Role
↓
Permission
↓
Business Rule
```

Example:

```text
Bank
↓
FOP Capability = ON
↓
FOP Product = Active
↓
Bank Manager
↓
FOP_APPLICATION_REVIEW
↓
Can review application
```

---

## 13.39 — Context Independence Rules

Adding a new business capability must not require rewriting existing contexts.

For example, adding Insurance should not require changing:

```text
Payments
Accounts
Cards
Identity
Company
```

Instead:

```text
Insurance Context
↓
Events / APIs / Relationships
↓
Existing Contexts
```

This is a core architectural principle.

---

## 13.40 — Overall Domain Rules Model

```text
                         PLATFORM
                            │
             ┌──────────────┼──────────────┐
             │              │              │
          Identity      Organization    Workspace
                            │
          ┌─────────────────┼─────────────────┐
          │                 │                 │
       Company             Bank             Broker
          │                 │                 │
     ┌────┼────┐       ┌────┼────┐            │
     │    │    │       │    │    │            │
 Payroll Tax Accounting FOP Loans Payments   Deals
     │                 │
 Documents          Accounts
 Reports            Cards
                    Compliance
                    Risk
                    Fraud
                    Treasury
```

Shared/cross-cutting contexts:

```text
Workflow
Compliance
Audit
Notifications
Support
Documents
Integrations
Marketplace
Analytics
```

The architecture must allow future capabilities to be introduced without turning existing domains into tightly coupled God Objects.
