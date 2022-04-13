export interface DrugInformation {
  drugId: string;
  unitId: string;
  usageId: string;
  quantity: number;
}

export interface CreateMedicalBillDetailDto {
  medicalBillId: string;
  drugInformations: DrugInformation[];
}
