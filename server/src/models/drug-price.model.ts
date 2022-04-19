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

export interface DrugPriceAttributes {
  id: string;
  unitId: string;
  drugId: string;
  price: number;
}

@Table
export class DrugPrice extends Model<DrugPrice> implements DrugPriceAttributes {
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

  @Column(DataType.INTEGER)
  price: number;

  // Associations
  @BelongsTo(() => Unit)
  unit: Unit;

  @BelongsTo(() => Drug)
  drug: Drug;
}
