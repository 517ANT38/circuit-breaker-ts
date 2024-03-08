export type objOpts = { interval: number; maxCountFail: number; };

export interface RequestObj{
    request(url:string,method?:string,data?:any,config?:object):Promise<any>
}

export interface InterceptorForRequest{
    addOnRequest(onFulfilled?: (value: any) => any, onRejected?: (error: any) => any): void;
    addOnResponce(onFulfilled?: (value: any) => any, onRejected?: (error: any) => any): void;
}

export interface ClientRequest extends RequestObj,InterceptorForRequest{}