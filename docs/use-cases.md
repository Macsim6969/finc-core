# Business Use Cases

## Purpose

This document converts the product landscape and business capabilities into concrete business operations.

A Use Case describes a business operation, not a UI page.

```text
Business Capability
 ↓
Use Case
 ↓
Business Rule
 ↓
Domain Event
 ↓
Bounded Context
 ↓
Application Service
 ↓
Page / API
```

## Use Case Structure

Each important use case should eventually define:

```text
Use Case
├── ID
├── Actor
├── Goal
├── Preconditions
├── Main Flow
├── Alternative Flows
├── Result
├── Permissions
├── Required Capability
└── Related Domain
```

# 1. Platform Administration

## Platform Admin

### Organizations

- View all organizations
- View organization details
- Suspend organization
- Reactivate organization
- Review organization activity

### Users

- View users
- View user details
- Suspend user
- Reactivate user
- Review user activity

### Banks

- View all banks
- Review bank status
- Monitor bank customers
- Monitor bank products
- Monitor bank FOP activity

### Ecosystem

- View organization relationships
- Manage partnerships
- Review integrations
- Monitor platform financial metrics
- Monitor platform documents
- Monitor platform risk

# 2. Personal Banking

## Customer

### Account

- View profile
- Update profile
- View dashboard

### Banks

- View connected banks
- Connect to a bank
- Disconnect from a bank
- Switch active bank

### Accounts

- View accounts
- Open account
- View account details
- Freeze account

### Cards

- View cards
- Request card
- Activate card
- Freeze card
- Manage card settings

### Payments

- View transactions
- Create payment
- Transfer money
- View payment status
- Cancel eligible payment

# 3. FOP

FOP is a separate business journey and is not created during registration.

## Customer

- Request FOP opening
- Choose eligible bank
- Complete application
- Submit documents
- Track application
- Respond to document requests
- View FOP status
- View FOP account
- Generate FOP documents
- Generate tax documents

### Flow

```text
Customer
 ↓
FOP
 ↓
Open FOP
 ↓
Select eligible bank
 ↓
Application
 ↓
Documents
 ↓
KYC
 ↓
Bank Review
 ↓
Approved
 ↓
FOP Activated
```

## Bank FOP Operations

Only when FOP capability is enabled:

- Enable FOP capability
- Configure FOP service
- View FOP applications
- Review application
- Request additional documents
- Approve application
- Reject application
- Manage active FOP customers

# 4. Company

## Company Owner

### Company

- Create company
- View company
- Update company
- Manage settings
- Invite member
- Remove member
- Assign role

### Banking

- Connect company to bank
- View connected banks
- Switch active bank relationship
- Disconnect bank

### Accounts

- View company accounts
- View balances
- View transactions

# 5. Company Accounting

## Accountant

- View accounting dashboard
- Create accounting record
- Update accounting record
- Reconcile transactions
- Generate accounting report
- Export accounting data

# 6. Company Tax

- View tax obligations
- Prepare tax payment
- Generate tax document
- Review tax document
- Submit tax payment
- Track tax status

# 7. Company Payroll

- View employees
- Add employee
- Manage employee banking details
- Create payroll run
- Calculate payroll
- Review payroll
- Approve payroll
- Pay employees
- Generate payroll documents
- Generate payroll report

```text
Company
 ↓
Employees
 ↓
Payroll Run
 ↓
Calculate
 ↓
Review
 ↓
Approve
 ↓
Transfer salaries
 ↓
Generate documents
```

# 8. Company Documents

- View documents
- Upload document
- Generate document
- Approve document
- Download document
- Archive document

# 9. Bank

## Bank Owner

- Create bank
- Manage bank profile
- Manage bank branding
- Manage bank members
- Manage bank roles
- Enable capability
- Disable capability
- Configure products

## Bank Manager

### Customers

- View customers
- View customer profile
- Manage customer relationship
- Suspend customer

### Accounts

- Review account application
- Open account
- Freeze account
- Close account

### Cards

- Review card application
- Issue card
- Freeze card
- Replace card

### Payments

- View payments
- Review payment
- Approve payment
- Reject payment

# 10. Compliance

- Review KYC case
- Request customer documents
- Approve KYC
- Reject KYC
- Review AML alert
- Create compliance case
- Close compliance case

# 11. Risk

- View risk dashboard
- Review risk case
- Assess customer risk
- Assess loan risk
- Set risk decision
- Monitor risk indicators

# 12. Support

- View customer tickets
- Create support case
- Assign support case
- Respond to customer
- Close support case

# 13. Banking Products

## Loans

- View loan products
- Apply for loan
- Review loan application
- Assess loan
- Approve loan
- Reject loan
- Manage active loan

## Deposits

- View deposit products
- Open deposit
- View deposit
- Close eligible deposit

## Investments

- View investment products
- Open investment account
- Create investment order
- View investment portfolio

# 14. Broker

## Broker Owner

- Create broker
- Manage broker profile
- Manage broker members
- Assign broker roles
- Manage broker services

## Broker Manager / Advisor

- View clients
- Create client relationship
- Manage client relationship
- Recommend product
- Create application
- Track application

# 15. Partnerships

Organizations can establish controlled relationships.

- Discover potential partner
- Send partnership request
- Review partnership request
- Accept partnership
- Reject partnership
- Manage partnership
- Terminate partnership

Visibility may be:

`PRIVATE`, `LIMITED`, `OPEN`.

# 16. Mergers and Acquisitions

Later the platform may support:

- Request merger
- Review merger
- Approve merger
- Execute merger
- Manage resulting organization

These operations require explicit authorization and audit trails.

# 17. Integrations

- View available integrations
- Connect integration
- Configure integration
- Disconnect integration
- View integration status
- Review integration errors

Potential relationships:

```text
Bank ↔ Bank
Company ↔ Bank
Broker ↔ Bank
Accounting
Tax
Payments
Documents
External Financial Providers
```

# 18. All Banks

All Banks is a premium platform capability.

Basic:

```text
All Banks
├── Total number of cards
└── Total balance
```

Premium:

```text
All Banks
├── Accounts
├── Cards
├── Balances
├── Transactions
├── Analytics
├── Cross-bank transfers
└── Advanced reporting
```

Use cases:

- View aggregated banking overview
- View total cards
- View total balance
- View cross-bank analytics
- Use advanced All Banks features

# 19. Marketplace

- View marketplace
- View product
- Purchase product
- Activate product
- Deactivate product
- View purchased products

Possible products:

```text
Payroll
Accounting
Advanced Analytics
All Banks
Fraud Detection
Theme
Premium Support
```

# 20. Theme Marketplace

- View themes
- Preview theme
- Purchase theme
- Activate theme
- Deactivate theme
- Switch active theme

Theme is presentation configuration, not business logic.

# 21. Registration and Onboarding

- Create account
- Select purpose
- Complete personal onboarding
- Complete company onboarding
- Complete bank onboarding
- Complete broker onboarding
- Accept invitation
- Create initial workspace

FOP is intentionally not part of registration.

# 22. Login and Workspace

- Login
- Logout
- Restore session
- View available workspaces
- Select workspace
- Switch workspace
- Switch personal banking bank

Workspace switching must not require another login.

# 23. Use Case → Capability

Capabilities group business operations.

```text
FOP Capability
├── Request FOP
├── Review FOP
├── Approve FOP
├── Reject FOP
└── Manage FOP
```

```text
Payroll Capability
├── Manage Employees
├── Create Payroll
├── Approve Payroll
├── Execute Payroll
└── Generate Payroll Documents
```

This keeps capabilities modular.

# 24. Use Case → Permission

Example:

```text
Approve FOP application
        ↓
bank.fop.approve
```

```text
Pay employees
        ↓
company.payroll.execute
```

Permissions remain independent from Angular routes.

# 25. Use Case → Domain

Initial domain grouping:

```text
Identity
Authentication
Workspace
Company
Bank
Broker
FOP
Accounts
Cards
Payments
Loans
Deposits
Investments
Accounting
Payroll
Tax
Documents
Compliance
Risk
Support
Partnerships
Integrations
Marketplace
Themes
```

These are not yet final Bounded Contexts.

# 26. Use Case Design Principle

Do not design the system as:

```text
Page → API → Database
```

Design it as:

```text
User Intent
    ↓
Use Case
    ↓
Business Rules
    ↓
Domain Operation
    ↓
Domain Event
    ↓
Persistence / Integration
```

Example:

```text
Customer clicks "Open FOP"
        ↓
RequestFopOpening
        ↓
Check eligibility
        ↓
Check bank FOP capability
        ↓
Create FOP Application
        ↓
FopApplicationSubmitted
        ↓
Notify bank
```

The page is only the interface through which the use case is triggered.

# 27. Extensibility Rule

New functionality should be added as an isolated capability whenever possible.

Example:

```text
Existing Platform
├── Payments
├── Cards
├── FOP
└── Payroll

New Capability
└── Insurance
    ├── Insurance Products
    ├── Insurance Applications
    ├── Insurance Policies
    └── Insurance Claims
```

Existing capabilities should not need to be rewritten merely because a new capability is introduced.

# 28. Next Design Stage

```text
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
Detailed User Journeys
    ↓
Pages / Navigation
    ↓
Application Services
    ↓
Angular Monorepo Architecture
```

Immediate next step: identify the major business rules and domain events behind the highest-value use cases.
