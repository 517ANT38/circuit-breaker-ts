import axios, { AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from "axios";


export default class WrapperAxios{

    private wrap_axios: AxiosInstance;

    constructor(config?:CreateAxiosDefaults){
        this.wrap_axios = axios.create(config);
    }

    public request(url:string,method?:string,data?:any,config?:AxiosRequestConfig){
        
        return this.wrap_axios({
            url:url,
            method:method,
            data:data,
            ...config
        });
    }

 

   
}