import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { MedicalBillDiseaseType } from "./medical-bill-disease-type.model";
import { MedicalBill } from "./medical-bill.model";

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
  @BelongsToMany(() => MedicalBill, () => MedicalBillDiseaseType)
  medicalBills: MedicalBill[];
}
