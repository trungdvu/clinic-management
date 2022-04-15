export interface ResponseModel {
  data?: any;
  status?: number;
  errorCode?: number;
}

export enum ErrorCode {
  NoNetWork = -1,
  Unknown = -999,
}
