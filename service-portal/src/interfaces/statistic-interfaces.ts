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

export interface MonthlyRevenuePayload {
  month: number;
  year: number;
}

export interface DrugUsageReportPayload {
  month: number;
  year: number;
}
