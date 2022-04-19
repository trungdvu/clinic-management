import { DrugResponse } from "../drug";
import { UnitResponse } from "../unit";
import { UsageResponse } from "../usage";

export interface MedicalBillDetailResponse {
  id: string;
  drug: DrugResponse;
  availableUnits: UnitResponse[];
  usage: UsageResponse;
  quantity: number;
  price: number;
}
