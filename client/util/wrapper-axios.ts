import axios, { AxiosInstance } from "axios";
import { ClientRequest } from "./util";


export default class WrapperAxios implements ClientRequest{

    private wrap_axios: AxiosInstance;

    constructor(config?:object){
        this.wrap_axios = axios.create(config);
    }

    public request(url:string,method?:string,data?:any,config?:object){
        
        return this.wrap_axios({
            url:url,
            method:method,
            data:data,
            ...config
        });
    }

    addOnRequest(onFulfilled?: (value: any) => any, onRejected?: (error: any) => any){
        this.wrap_axios.interceptors.response.use(onFulfilled,onRejected);
    }

    addOnResponce(onFulfilled?: (value: any) => any, onRejected?: (error: any) => any): void{
        this.wrap_axios.interceptors.response.use(onFulfilled,onRejected);
    }
 

   
}