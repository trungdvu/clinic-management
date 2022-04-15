import { MedicalBill } from "./medical-bill.model";
import {
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

export interface DiseaseTypeAttributes {
  id: string;
  description: string;
}

@Table
export class DiseaseType
  extends Model<DiseaseType>
  implements DiseaseTypeAttributes {
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
  @HasMany(() => MedicalBill)
  medicalBills: MedicalBill[];
}
