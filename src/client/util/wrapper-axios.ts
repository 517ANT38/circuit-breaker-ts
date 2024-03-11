import axios, { CreateAxiosDefaults, InternalAxiosRequestConfig } from "axios";
import {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios"
import { ClientRequest } from "./requests";
import { haldingErr, haldingErrAny, haldingReq, haldingRes } from "./util";

interface WrapInterfaceAxios 
    extends ClientRequest<AxiosResponse,AxiosRequestConfig,unknown,InternalAxiosRequestConfig>{}

class WrapperAxios implements WrapInterfaceAxios{

    private wrap_axios: AxiosInstance;

    constructor(config?:CreateAxiosDefaults){
        this.wrap_axios = axios.create({validateStatus: (s:number)=> s < 500,...config});
    }

    request(url:string,method?:string,data?:unknown,config?:AxiosRequestConfig){
        
        return this.wrap_axios({
            url:url,
            method:method,
            data:data,
            ...config
        });
    }

    addOnRequest(onFulfilled?: haldingReq, onRejected?: haldingErrAny){
        this.wrap_axios.interceptors.request.use(onFulfilled,onRejected);
    }

    addOnResponce(onFulfilled?: haldingRes, onRejected?: haldingErr): void{
        this.wrap_axios.interceptors.response.use(onFulfilled,onRejected);
    }
 

   
}
export default WrapperAxios;