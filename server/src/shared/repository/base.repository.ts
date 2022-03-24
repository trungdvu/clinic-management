export interface IBaseRepository<Model> {
  findById(id: string): Model;
  create(model: Model): Model;
  update(id: string, model: Model): Model;
  delete(id: string): string;
}
