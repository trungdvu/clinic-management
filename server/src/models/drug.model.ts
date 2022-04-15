import {
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { MedicalBillDetail } from "./medical-bill-detail.model";

export interface DrugAttributes {
  id: string;
  description: string;
  price: number;
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

  @Column(DataType.INTEGER)
  price: number;

  // Associations
  @HasMany(() => MedicalBillDetail)
  medicalBillDetails: MedicalBillDetail[];
}
