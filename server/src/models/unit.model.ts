import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { DrugPrice } from "./drug-price.model";
import { DrugType } from "./drug-type.model";
import { Drug } from "./drug.model";
import { MedicalBillDetail } from "./medical-bill-detail.model";

export interface UnitAttributes {
  id: string;
  description: string;
}

@Table
export class Unit extends Model<Unit> implements UnitAttributes {
  @PrimaryKey
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column(DataType.STRING)
  description: string;

  // Associations
  @HasMany(() => DrugPrice)
  drugPrices: DrugPrice[];

  @BelongsToMany(() => Drug, () => DrugType)
  drugs: Drug[];

  @HasMany(() => MedicalBillDetail)
  medicalBillDetails: MedicalBillDetail[];
}
