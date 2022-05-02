export interface DashboardMedicalBillSummary {
  id: string;
  patientId: string;
  patientFullName: string;
  symptomDescription: string;
  createdAt: string;
}

export interface DashboardSummaryTodayResponse {
  pendingCount: number;
  activeCount: number;
  completedCount: number;
  myMedicalBills: DashboardMedicalBillSummary[];
}
