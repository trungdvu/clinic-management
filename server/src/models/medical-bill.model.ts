import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { DiseaseType } from "./disease-type.model";
import { MedicalBillDetail } from "./medical-bill-detail.model";
import { Patient } from "./patient.model";

enum MedicalBillStatus {
  Pending = "pending",
  Active = "active",
  Completed = "completed",
}

export interface MedicalBillAttributes {
  id: string;
  diseaseTypeId: string;
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

  @ForeignKey(() => DiseaseType)
  @Column(DataType.UUID)
  diseaseTypeId: string;

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

  @BelongsTo(() => DiseaseType)
  diseaseType: DiseaseType;
}
