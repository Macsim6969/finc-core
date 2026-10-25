import {Component, inject} from '@angular/core';
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {AdminDataService} from "../../data-access/admin-data.service";

@Component({
  selector: 'lib-admin-dashboard',
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
  ],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.scss',
})
export class AdminDashboard {
  private readonly adminData = inject(AdminDataService);

  protected readonly columns = [
    'organization',
    'type',
    'status',
  ];

  protected get openOnboarding(): number {
    return this.adminData.getOpenOnboardingCount();
  }

  protected get pendingReview(): number {
    return this.adminData.getPendingReviewCount();
  }

  protected get activeOrganizations(): number {
    return this.adminData.getActiveOrganizationsCount();
  }

  protected get criticalEvents(): number {
    return this.adminData.getCriticalEventsCount();
  }

  protected get recentCases() {
    return this.adminData.getRecentCases(5);
  }

  protected get recentEvents() {
    return this.adminData.getRecentEvents(4);
  }
}
