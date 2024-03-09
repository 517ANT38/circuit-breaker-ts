import StateMashin from "./util/state-mashin";
import { ClientRequest, RequestObj } from "./util/util";

export default class CircuitBreaker<T,D> implements RequestObj<T>{ 
    
    private stateMashin:StateMashin;
    private client:ClientRequest<T,D>;
    constructor(client:ClientRequest<T,D>,interval=1000, maxCountFail=3){
        this.client = client;
        this.stateMashin = new StateMashin(interval,maxCountFail);
        this.client.addOnResponce((v)=>v,(e)=>{
            this.stateMashin.incrementCountFail()
            return e;
        });
    }
    request(url: string, method?: string, data?: any, config?: object): Promise<T> {
        return this.client.request(url,method,data,config);
    }

   

}