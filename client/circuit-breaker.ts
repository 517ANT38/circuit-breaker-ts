import StateMashin from "./util/state-mashin";
import { ClientRequest, RequestObj } from "./util/util";

export default class CircuitBreaker implements RequestObj{ 
    
    private stateMashin:StateMashin;
    private client:ClientRequest;
    constructor(client:ClientRequest,interval=1000, maxCountFail=3){
        this.client = client;
        this.stateMashin = new StateMashin(interval,maxCountFail);
        this.client.addOnResponce((v)=>{},(e)=>{this.stateMashin.incrementCountFail()})
    }
    request(url: string, method?: string, data?: any, config?: object): Promise<any> {
        return this.client.request(url,method,data,config);
    }

   

}