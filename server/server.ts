import express, { Response }  from "express"
const app = express();
const DELAY = 10;
const ENDPOINT = "/app";
const ERRS = [500,502,503,504,508]
let errorOrSuccess = Math.random();


const halding = (res:Response<any, any>,s="Success req")=>{
    if (errorOrSuccess < 0.5) {
        res.status(200).json({msg:s});
    } else {
        let index = Math.floor(Math.random()*(ERRS.length));
        res.status(ERRS[index]);        
        res.json({msg:`Error with status code ${res.statusCode}`});
        errorOrSuccess = Math.random();
    }
}

app.get(ENDPOINT,(req,res)=>{
    halding(res);
});
app.post(ENDPOINT,(req,res)=>{
    halding(res,req.body)
})
export default function startServer(host="localhost",port=9797){
    setTimeout(function change(){
        errorOrSuccess = Math.abs(errorOrSuccess - 1);
        setTimeout(change,Math.random()*DELAY)
    },Math.random()*DELAY);

    app.listen(port,host, () => {
        console.log(`Server is running on http://${host}:${port}${ENDPOINT}`);
    });
}
