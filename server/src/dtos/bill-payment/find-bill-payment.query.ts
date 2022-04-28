import { QueryParams } from "../../shared";

export interface FindBillPaymentsQueryParams extends QueryParams {
  patientId?: string;
  medicalBillId?: string;
  page?: number;
}
