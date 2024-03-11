import StateMashin from "../util/state-mashin";
import { ClientRequest, ErrorRequest, RequestObj} from "../util/requests";

class CircuitBreaker<Res = any,Data = any,Conf = object>  implements RequestObj<Res,Data,Conf>{ 
    
    private stateMashin:StateMashin;
    private client:ClientRequest<Res,Conf,Data>;

    constructor(client:ClientRequest<Res,Conf,Data>,interval:number, maxCountFail:number){
        this.client = client;
        this.stateMashin = new StateMashin(interval,maxCountFail);
        this.client.addOnResponce(ans => ans,this.haldingError);
    }


    private haldingError = (e:ErrorRequest)=>{
        if(!e.responce){
            this.stateMashin.incrementCountFail();
        }
        else if(e.responce.status >= 500){
            this.stateMashin.incrementCountFail();
        }
        return Promise.reject(e);
    }

    request(url: string, method?: string, data?: Data, config?: Conf): Promise<Res> {
        if(this.stateMashin.isCallPermitted()){
            return this.client.request(url,method,data,config);
        }
        return Promise.reject(new Error("Circuit breaker is open"));
    }

   

}

export default CircuitBreaker;