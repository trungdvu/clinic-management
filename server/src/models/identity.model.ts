import {
  Column,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { BillPayment } from "./bill-payment.model";
import { MedicalBill } from "./medical-bill.model";
import { Patient } from "./patient.model";

export interface IdentityAttributes {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  phoneNumber: string;
  accessToken: string;
}

@Table
export class Identity extends Model<Identity> {
  @PrimaryKey
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  password: string;

  @Column(DataType.STRING)
  firstName: string;

  @Column(DataType.STRING)
  lastName: string;

  @Column(DataType.STRING)
  username?: string;

  @Column(DataType.STRING)
  phoneNumber: string;

  @Column(DataType.STRING)
  accessToken: string;

  @HasMany(() => Patient)
  patients: Patient[];

  @HasMany(() => MedicalBill)
  medicalBills: MedicalBill[];

  @HasMany(() => BillPayment)
  billPayments: BillPayment[];
}
