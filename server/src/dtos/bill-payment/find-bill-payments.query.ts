import { QueryParams } from "../../shared";

export interface FindBillPaymentsQueryParams extends QueryParams {
  medicalBillId?: string;
}
