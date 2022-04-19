import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { MedicalBillDetail } from "./medical-bill-detail.model";

export interface UsageAttributes {
  id: string;
  description: string;
}

@Table
export class Usage extends Model<Usage> implements UsageAttributes {
  @PrimaryKey
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column(DataType.STRING)
  description: string;

  // Association
  @HasMany(() => MedicalBillDetail)
  medicalBillDetails: MedicalBillDetail[];
}
