export interface ResponseModel {
  data?: any;
  status?: number;
  errorCode?: number;
}

export interface ErrorModel {
  errorCode: number | string;
  data?: any;
}

export enum ErrorCode {
  NoNetWork = -1,
  Unknown = -999,
}
