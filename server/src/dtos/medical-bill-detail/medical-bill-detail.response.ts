import { DrugResponse } from "../drug";
import { PatientResponse } from "../patient";
import { UnitResponse } from "../unit";
import { UsageResponse } from "../usage";

export interface MedicalBillDetailResponse {
  id: string;
  drug: DrugResponse;
  unit: UnitResponse;
  availableUnits: UnitResponse[];
  usage: UsageResponse;
  quantity: number;
  price: number;
}
