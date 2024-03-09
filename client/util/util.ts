import { AxiosResponse } from "axios";

export type objOpts = { interval: number; maxCountFail: number; };

export interface RequestObj<T>{
    request(url:string,method?:string,data?:any,config?:object):Promise<T>
}

export interface InterceptorForRequest<T,D>{
    addOnRequest(onFulfilled?: (value: D) => D, onRejected?: (error: any) => any): void;
    addOnResponce(onFulfilled?: (value: T) => T, onRejected?: (error: any) => any): void;
}

export interface ClientRequest<T,D> extends RequestObj<T>,InterceptorForRequest<T,D>{}