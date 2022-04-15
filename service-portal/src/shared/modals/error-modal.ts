export class ErrorModel {
  data?: {
    message: string;
  };
  errorCode?: number;
  status?: number;

  constructor(data?: { message: string }, errorCode?: number, status?: number) {
    this.data = data;
    this.errorCode = errorCode;
    this.status = status;
  }
}
