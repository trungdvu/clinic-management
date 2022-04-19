import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { DiseaseType } from "./disease-type.model";
import { MedicalBill } from "./medical-bill.model";

export interface MedicalBillDiseaseTypeAttributes {
  id: string;
  diseaseTypeId: string;
  medicalBillId: string;
}

@Table
export class MedicalBillDiseaseType
  extends Model<MedicalBillDiseaseType>
  implements MedicalBillDiseaseTypeAttributes {
  @PrimaryKey
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @ForeignKey(() => DiseaseType)
  @Column(DataType.UUID)
  diseaseTypeId: string;

  @ForeignKey(() => MedicalBill)
  @Column(DataType.UUID)
  medicalBillId: string;

  // Associations
  @BelongsTo(() => DiseaseType)
  diseaseType: DiseaseType;

  @BelongsTo(() => MedicalBill)
  medicalBill: MedicalBill;
}
