import { MedicalBillDetail } from "./medical-bill-detail.model";
import {
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

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
  @HasMany(() => MedicalBillDetail)
  medicalBillDetails: MedicalBillDetail[];
}
