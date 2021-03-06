import { QueryParams } from "../../shared";

export interface FindMedicalBillsQueryParams extends QueryParams {
  patientId?: string;
  page?: number;
  month?: number;
}
