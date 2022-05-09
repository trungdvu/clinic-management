import { DrugResponse } from "../../drug";
import { UnitResponse } from "../../unit";

export interface DrugUsageReportResponse {
    drug: DrugResponse;
    unit: UnitResponse;
    quantity: number;
    numberOfUse: number;
}