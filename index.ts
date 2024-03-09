import CircuitBreaker from "./client/circuit-breaker";
import WrapperAxios from "./client/util/wrapper-axios";
import startServer from "./server/server";
const URL = "http://localhost:9797/app";
const DELAY = 3000;
startServer();

const axios = new WrapperAxios({
    validateStatus: (status:number) =>true 
});
const cb = new CircuitBreaker(axios);
(async ()=>{
    for (let index = 0; index < 100; index++) {
        try{
            let res = await cb.request(URL);
            console.log("Server responce",res.status)
        }catch(e){
            console.log(e)
        }
    }
    await new Promise(resolve => setTimeout(resolve, DELAY));
})();

