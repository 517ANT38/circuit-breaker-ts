import axios, { AxiosInstance, AxiosRequestConfig} from "axios";

class HelperRequest{
    private instance: AxiosInstance;

    constructor(defaultConfig: AxiosRequestConfig){
        this.instance = axios.create(defaultConfig);
    }

    addRequestInterceptor(onFulfilled?: (value: any) => any, onRejected?: (error: any) => any): void{
        this.instance.interceptors.request.use(onFulfilled,onRejected);
    }

    addResponceInterceptor(onFulfilled?: (value: any) => any, onRejected?: (error: any) => any): void{
        this.instance.interceptors.response.use(onFulfilled,onRejected);
    }

    request(url : string, opts: AxiosRequestConfig<any>){
        return this.instance({
            url:url,
            ...opts
        });
    }
}
export default HelperRequest;