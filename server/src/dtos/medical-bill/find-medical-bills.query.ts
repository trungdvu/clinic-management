import { QueryParams } from "../../shared";

export interface FindMedicalBillsQueryParams extends QueryParams {
  patientId?: string;
}
