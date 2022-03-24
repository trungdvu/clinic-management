export interface Mapper<M = any, D = any> {
  toModel(dbModel: D): M;
  fromModel(model: M): D;
}
