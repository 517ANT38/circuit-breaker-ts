import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { ClientRequest } from "./requests";


export default class WrapperAxios implements ClientRequest<AxiosResponse,InternalAxiosRequestConfig>{

    private wrap_axios: AxiosInstance;

    constructor(config?:object){
        this.wrap_axios = axios.create(config);
    }

    request(url:string,method?:string,data?:any,config?:object){
        
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