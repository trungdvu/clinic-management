import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { DrugPrice } from "./drug-price.model";
import { DrugType } from "./drug-type.model";
import { MedicalBillDetail } from "./medical-bill-detail.model";
import { Unit } from "./unit.model";

export interface DrugAttributes {
  id: string;
  description: string;
}

@Table
export class Drug extends Model<Drug> implements DrugAttributes {
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

  @BelongsToMany(() => Unit, () => DrugType)
  units: Unit[];

  @HasMany(() => MedicalBillDetail)
  medicalBillDetails: MedicalBillDetail[];
}
