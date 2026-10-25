import {Component, inject} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatCell, MatColumnDef, MatHeaderCell, MatTable, MatTableModule} from "@angular/material/table";
import {DatePipe} from "@angular/common";
import {AdminDataService} from "../../data-access/admin-data.service";
import {OnboardingCase, OnboardingStatus, OrganizationType} from "../../models/admin.model";

@Component({
  selector: 'lib-admin-onboarding-list',
  imports: [
    MatIcon,
    MatButton,
    RouterLink,
    MatFormField,
    MatLabel,
    MatInput,
    FormsModule,
    MatSelect,
    MatOption,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    DatePipe,
    MatIconButton,
    MatTableModule
  ],
  templateUrl: './admin-onboarding-list.html',
  styleUrl: './admin-onboarding-list.scss',
})
export class AdminOnboardingList {
  private readonly adminData = inject(AdminDataService);

  protected searchTerm = '';
  protected selectedStatus: OnboardingStatus | 'ALL' = 'ALL';
  protected selectedType: OrganizationType | 'ALL' = 'ALL';

  protected readonly columns = [
    'id',
    'organization',
    'type',
    'contact',
    'status',
    'created',
    'actions',
  ];

  protected get filteredCases(): OnboardingCase [] {
    const query = this.searchTerm.trim().toLowerCase();

    return this.adminData.getOnboardingCases().filter((item) => {
      const matchesQuery =
        !query ||
        [
          item.id,
          item.organizationName,
          item.contactName,
          item.contactEmail,
        ].some((value) => value.toLowerCase().includes(query));

      const matchesStatus =
        this.selectedStatus === 'ALL' ||
        item.status === this.selectedStatus;

      const matchesType =
        this.selectedType === 'ALL' ||
        item.organizationType === this.selectedType;

      return matchesQuery && matchesStatus && matchesType;
    });
  }
}
