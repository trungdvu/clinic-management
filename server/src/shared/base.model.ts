import { uuid } from "uuidv4";

export abstract class BaseModel<T> {
  constructor(private readonly props: T) {}

  private _id: string = uuid();
  public createAt: string;
  public updatedAt: string;

  public id() {
    return this._id;
  }
}
