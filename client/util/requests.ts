import { haldingErr, haldingErrAny } from "./util";

export interface StatusResponce{
    status:number
}

export interface ErrorRequest{
    responce:StatusResponce,
    request:never
}

export interface RequestObj<Res extends StatusResponce,Data,Conf>{
    request(url:string,method?:string,data?:Data,config?:Conf):Promise<Res>
}

export interface InterceptorForRequest<Res,Req>{
    addOnRequest(onFulfilled?: (value: Req) => Req, onRejected?: haldingErrAny): void;
    addOnResponce(onFulfilled?: (value: Res) => Res, onRejected?: haldingErr): void;
}

export interface ClientRequest<Res extends StatusResponce,C = object,D = any,Req = any> extends RequestObj<Res,D,C>,
    InterceptorForRequest<Res,Req>{}