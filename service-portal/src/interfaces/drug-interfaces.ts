import { Unit } from './unit-interfaces';

export interface Drug {
  id: string;
  description: string;
}

export interface DrugUnit {
  price: number;
  unit: Unit;
}
