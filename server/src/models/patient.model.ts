import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Identity } from "./identity.model";
import { MedicalBill } from "./medical-bill.model";

export interface PatientAttributes {
  id: string;
  fullName: string;
  gender: string;
  dayOfBirth: string;
  address: string;
  phoneNumber: string;
  creatorId: string;
}

@Table
export class Patient extends Model<Patient> implements PatientAttributes {
  @PrimaryKey
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column(DataType.STRING)
  fullName: string;

  @Column(DataType.STRING)
  gender: string;

  @Column(DataType.STRING)
  dayOfBirth: string;

  @Column(DataType.STRING)
  address: string;

  @Column(DataType.STRING)
  phoneNumber: string;

  @ForeignKey(() => Identity)
  @Column(DataType.UUID)
  creatorId: string;

  // Associations
  @HasMany(() => MedicalBill)
  medicalBills: MedicalBill[];

  @BelongsTo(() => Identity)
  creator: Identity;
}
