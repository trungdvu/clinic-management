import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { MedicalBill } from "./medical-bill.model";
import { Patient } from "./patient.model";
import { DEFAULT_MEDICAL_EXAMINATION_AMOUNT } from "../constants";
import { Identity } from "./identity.model";

export enum BillPaymentStatus {
  Active = "active",
  Completed = "completed",
}
export interface BillPaymentAttributes {
  id: string;
  medicalBillId: string;
  medicalExamCost: number;
  status: BillPaymentStatus;
  totalDrugCost: number;
  patientId: string;
}

@Table
export class BillPayment
  extends Model<BillPayment>
  implements BillPaymentAttributes {
  @PrimaryKey
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => MedicalBill)
  @Column(DataType.UUID)
  medicalBillId: string;

  @ForeignKey(() => Patient)
  @Column(DataType.UUID)
  patientId: string;

  @ForeignKey(() => Identity)
  @Column(DataType.UUID)
  createdBy: string;

  @Column({ type: DataType.STRING, defaultValue: BillPaymentStatus.Active })
  status: BillPaymentStatus;

  @Column({
    type: DataType.INTEGER,
    defaultValue: DEFAULT_MEDICAL_EXAMINATION_AMOUNT,
  })
  medicalExamCost: number;

  @Column(DataType.INTEGER)
  totalDrugCost: number;

  // Associations
  @BelongsTo(() => MedicalBill)
  medicalBill: MedicalBill;

  @BelongsTo(() => Patient)
  patient: Patient;

  @BelongsTo(() => Identity)
  creator: Identity;
}
