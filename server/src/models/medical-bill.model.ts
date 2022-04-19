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
import { DiseaseType } from "./disease-type.model";
import { MedicalBillDetail } from "./medical-bill-detail.model";
import { MedicalBillDiseaseType } from "./medical-bill-disease-type.model";
import { Patient } from "./patient.model";

enum MedicalBillStatus {
  Pending = "pending",
  Active = "active",
  Completed = "completed",
}

export interface MedicalBillAttributes {
  id: string;
  symptomDescription: string;
  status?: MedicalBillStatus;
  prediction: string;
  patientId: string;
}

@Table
export class MedicalBill
  extends Model<MedicalBill>
  implements MedicalBillAttributes {
  @PrimaryKey
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column(DataType.STRING)
  symptomDescription: string;

  @Column({ type: DataType.STRING, defaultValue: MedicalBillStatus.Pending })
  status: MedicalBillStatus;

  @Column(DataType.STRING)
  prediction: string;

  @ForeignKey(() => Patient)
  @Column(DataType.UUID)
  patientId: string;

  // Associations
  @BelongsTo(() => Patient)
  patient: Patient;

  @HasOne(() => MedicalBillDetail)
  medicalBillDetail: MedicalBillDetail;

  @BelongsToMany(() => DiseaseType, () => MedicalBillDiseaseType)
  diseaseTypes: DiseaseType[];
}
