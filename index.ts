import CircuitBreaker from "./client/circuit-breaker";
import WrapperAxios from "./client/util/wrapper-axios";
import startServer from "./server/server";
const URL = "http://localhost:9797/app";
startServer();

const axios = new WrapperAxios();
const cb = new CircuitBreaker(axios);
(async ()=>{
    for (let index = 0; index < 100; index++) {
        try{
            let res = await cb.request(URL);
            console.log(res)
        }catch(e){
            console.log(e)
        }
    }
})();

