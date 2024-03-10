import axios, { CreateAxiosDefaults, InternalAxiosRequestConfig } from "axios";
import {AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios"
import { ClientRequest } from "./requests";


export default class WrapperAxios 
    implements ClientRequest<AxiosResponse,AxiosRequestConfig,unknown,InternalAxiosRequestConfig>{

    private wrap_axios: AxiosInstance;

    constructor(config?:CreateAxiosDefaults){
        this.wrap_axios = axios.create({validateStatus: (s:number)=> true,...config});
    }

    request(url:string,method?:string,data?:unknown,config?:AxiosRequestConfig){
        
        return this.wrap_axios({
            url:url,
            method:method,
            data:data,
            ...config
        });
    }

    addOnRequest(onFulfilled?: (value: InternalAxiosRequestConfig) => InternalAxiosRequestConfig, onRejected?: (error: any) => any){
        this.wrap_axios.interceptors.request.use(onFulfilled,onRejected);
    }

    addOnResponce(onFulfilled?: (value: AxiosResponse) => AxiosResponse, onRejected?: (error: any) => any): void{
        this.wrap_axios.interceptors.response.use(onFulfilled,onRejected);
    }
 

   
}