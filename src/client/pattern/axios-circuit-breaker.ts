import { AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from "axios";
import CircuitBreaker from "./circuit-breaker";
import { RequestObj } from "../util/requests";
import WrapperAxios from "../util/wrapper-axios";

class AxiosCircuitBreaker implements RequestObj<AxiosResponse,unknown,AxiosRequestConfig> {
    
    
    private cb: CircuitBreaker<AxiosResponse,unknown,AxiosRequestConfig>;
    
    constructor(interval=1000, maxCountFail=3, config?:CreateAxiosDefaults){
        let wrapAxios = new WrapperAxios(config)
        this.cb = new CircuitBreaker(wrapAxios,interval,maxCountFail);
    }

    request(url: string, method?: string, data?: unknown, config?: AxiosRequestConfig ) {
        return this.cb.request(url,method,data,config);
    }
    
}

export default AxiosCircuitBreaker;