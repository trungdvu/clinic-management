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
import { Drug } from "./drug.model";
import { Unit } from "./unit.model";

export interface DrugTypeAttributes {
  id: string;
  drugId: string;
  unitId: string;
}

@Table
export class DrugType extends Model<DrugType> implements DrugTypeAttributes {
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

  // Associations;
  @BelongsTo(() => Unit)
  unit: Unit;

  @BelongsTo(() => Drug)
  drug: Drug;
}
