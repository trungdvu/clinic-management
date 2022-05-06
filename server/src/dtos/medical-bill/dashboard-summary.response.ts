export interface DashboardMedicalBillSummaryResponse {
  id: string;
  patientId: string;
  patientFullName: string;
  symptomDescription: string;
  createdAt: string;
}

export interface ViewDashboardSummaryTodayResponse {
  pendingCount: number;
  activeCount: number;
  completedCount: number;
  myMedicalBills: DashboardMedicalBillSummaryResponse[];
}
