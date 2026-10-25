import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shell/admin-layout/admin-layout').then(
        (m) => m.AdminLayout,
      ),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/admin-dashboard/admin-dashboard').then(
            (m) => m.AdminDashboard,
          ),
      },
      {
        path: 'onboarding',
        loadComponent: () =>
          import('./pages/admin-onboarding-list/admin-onboarding-list').then(
            (m) => m.AdminOnboardingList,
          ),
      },
      {
        path: 'onboarding/new',
        loadComponent: () =>
          import('./pages/admin-onboarding-create/admin-onboarding-create').then(
            (m) => m.AdminOnboardingCreate,
          ),
      },
      {
        path: 'onboarding/:id',
        loadComponent: () =>
          import('./pages/admin-onboarding-detail/admin-onboarding-detail').then(
            (m) => m.AdminOnboardingDetail,
          ),
      },
      {
        path: 'organizations',
        loadComponent: () =>
          import('./pages/admin-organizations/admin-organizations').then(
            (m) => m.AdminOrganizations,
          ),
      },
      {
        path: 'audit',
        loadComponent: () =>
          import('./pages/admin-audit-log/admin-audit-log').then(
            (m) => m.AdminAuditLog,
          ),
      },
    ],
  },
];
