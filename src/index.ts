
import AxiosCircuitBreaker from "./client/pattern/axios-circuit-breaker";
import startServer from "./server/server";
const URL = "http://localhost:9797/app";
const DELAY = 3000;
startServer();
const cb = new AxiosCircuitBreaker(5000);
(async ()=>{
    for (let index = 0; index < 100; index++) {
        try{
            let res = await cb.request(URL);
            console.log("Server responce",res.status)
        }catch(e){
                           
            console.log((e as Error).message)
            
        }
        await new Promise(resolve => setTimeout(resolve, DELAY));
    }
    
})();

