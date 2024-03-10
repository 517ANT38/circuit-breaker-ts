import StateMashin from "./util/state-mashin";
import { ClientRequest, RequestObj, StatusResponce } from "./util/requests";

export default class CircuitBreaker<Res extends StatusResponce,Data = any,Conf = object> 
    implements RequestObj<Res,Data,Conf>{ 
    
    private stateMashin:StateMashin;
    private client:ClientRequest<Res,Conf,Data>;

    constructor(client:ClientRequest<Res,Conf,Data>,interval=1000, maxCountFail=3){
        this.client = client;
        this.stateMashin = new StateMashin(interval,maxCountFail);
        this.client.addOnResponce((ans)=>{
            if(ans.status >= 500){
                this.stateMashin.incrementCountFail()
            }
            return ans;
        },(e)=>{
            this.stateMashin.incrementCountFail()
            return e;
        });
    }

    request(url: string, method?: string, data?: Data, config?: Conf): Promise<Res> {
        if(this.stateMashin.isCallPermitted()){
            return this.client.request(url,method,data,config);
        }
        return Promise.reject(new Error("Circuit breaker is open"));
    }

   

}