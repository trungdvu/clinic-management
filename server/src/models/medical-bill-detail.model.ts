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
import { Drug } from "./drug.model";
import { MedicalBill } from "./medical-bill.model";
import { Unit } from "./unit.model";
import { Usage } from "./usage.model";

export interface MedicalBillDetailAttributes {
  id: string;
  drugId: string;
  unitId: string;
  usageId: string;
  medicalBillId: string;
  isDeleted: boolean;
  quantity: number;
}

@Table
export class MedicalBillDetail
  extends Model<MedicalBillDetail>
  implements MedicalBillDetailAttributes {
  @PrimaryKey
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @ForeignKey(() => Drug)
  @Column(DataType.UUID)
  drugId: string;

  @ForeignKey(() => Unit)
  @Column(DataType.UUID)
  unitId: string;

  @ForeignKey(() => Usage)
  @Column(DataType.UUID)
  usageId: string;

  @ForeignKey(() => MedicalBill)
  @Column(DataType.UUID)
  medicalBillId: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isDeleted: boolean;

  @Column(DataType.INTEGER)
  quantity: number;

  // Associations
  @BelongsTo(() => MedicalBill)
  medicalBill: MedicalBill;

  @BelongsTo(() => Drug)
  drug: Drug;

  @BelongsTo(() => Unit)
  unit: Unit;

  @BelongsTo(() => Usage)
  usage: Usage;
}
