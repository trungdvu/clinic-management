import { Drug } from './drug-interfaces';
import { Unit } from './unit-interfaces';

export interface MonthlyRevenue {
  day: number;
  numberOfPatient: number;
  revenue: number;
}

export interface DrugUsageReport {
  drug: Drug;
  unit: Unit;
  quantity: number;
  numberOfUse: number;
}
