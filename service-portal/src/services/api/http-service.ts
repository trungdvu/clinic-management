import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { env } from 'configs';
import { ErrorCode, ResponseModel } from 'interfaces';
import { authLocalStorage } from 'shared';

type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH';

const BASE_HEADERS: any = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export class HttpService {
  private static extraHeaders: any = {};

  private static endPoint(api: string): string {
    return `${env.host}:${env.port}${api}`;
  }

  private static handleHttpResponseError(error: AxiosError): ResponseModel {
    if (error.response) {
      const { data, status, config } = error.response || {};
      const { method, url } = config;
      const errorCode = data.errorCode || ErrorCode.Unknown;
      const response: ResponseModel = {
        status,
        errorCode,
        data: {
          message: data.message,
        },
      };
      console.error(`ERROR ${errorCode} ${method} ${url}: ${data.message}`);
      return response;
    } else {
      const response: ResponseModel = {
        status: error.request?.status || undefined,
        errorCode: +(error.code || '') || ErrorCode.Unknown,
        data: {
          message: 'Unknown error',
        },
      };
      return response;
    }
  }

  private static async send(
    method: Method,
    api: string,
    body?: any,
    fullUrl?: string,
  ): Promise<ResponseModel> {
    const url = fullUrl || this.endPoint(api);

    try {
      const requestConfig: AxiosRequestConfig = {
        method,
        url,
        data: body,
        headers: {
          ...BASE_HEADERS,
          ...this.extraHeaders,
          Authorization: `Bearer ${authLocalStorage.accessToken}`,
        },
      };

      const response = await axios(requestConfig);
      const { data, status } = response;

      return {
        status,
        data: data || {},
      };
    } catch (error: any) {
      return this.handleHttpResponseError(error);
    }
  }

  static async post(api: string, body?: any): Promise<ResponseModel> {
    return this.send('POST', api, body);
  }

  static async put(api: string, body?: any): Promise<ResponseModel> {
    return this.send('PUT', api, body);
  }

  static async delete(api: string): Promise<ResponseModel> {
    return this.send('DELETE', api);
  }

  static async get(api: string, body?: any): Promise<ResponseModel> {
    return this.send('GET', api, body);
  }
}
