import { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { ErrorRequest } from "./requests";

export type objOpts = { interval: number; maxCountFail: number; };
export type haldingReq = (value: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
export type haldingRes =  (value: AxiosResponse) => AxiosResponse;
export type haldingErr = (error: ErrorRequest) => Promise<never>;
export type haldingErrAny = (error: any) => any;