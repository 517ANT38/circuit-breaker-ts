import http  from "http"

const DELAY = 10;
const ENDPOINT = "/app";
const ERRS = [500,502,503,504,508]
let errorOrSuccess = Math.random();

const halding = (res:any,s="Success req")=>{
    if (errorOrSuccess < 0.5) {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({msg:s}));
        errorOrSuccess = Math.random();
    } else {
        res.statusCode = ERRS[Math.floor(Math.random()*(ERRS.length))];
        res.setHeader("Content-Type", "application/json");
        res.end(`{"msg":"Error with status code ${res.statusCode}"}`);
        errorOrSuccess = Math.random();
    }
}
const server = http.createServer((req, res) => {
    if (req.url == ENDPOINT) {    
        if (req.method=="GET") {
            halding(res);
        }
        else {
            let resBody:any = [];
            req.on("data",(chunk) =>{
                resBody.push(chunk);
            });
            req.on("end",()=>{
                try {
                    resBody = JSON.parse(Buffer.concat(resBody).toString());
                } catch(e) {
                    console.log(e);
                }
                halding(res,resBody.data);
            });
        }
    }
  
});
export default function startServer(host="localhost",port=9797){
    setTimeout(function change(){
        errorOrSuccess = Math.abs(errorOrSuccess - 1);
        setTimeout(change,Math.random()*DELAY)
    },Math.random()*DELAY);

    server.listen(port,host, () => {
        console.log(`Server is running on http://${host}:${port}${ENDPOINT}`);
    });
}
