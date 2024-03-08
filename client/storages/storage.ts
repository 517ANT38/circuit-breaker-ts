import { CircuitBreakerState } from "../util/util";

export interface CircuitBreakerStorage{
    failReqInc():void;
    successReqInc():void;
    resetfailReq():void;
    resetsuccessReq():void;
    state:CircuitBreakerState;
    failReq:number;
    successReq:number;
    lastFailTime:Date | null;
}

export class CircuitBreakerMemoryStorage implements CircuitBreakerStorage{
    private _lastFailTime:Date|null;
    private _state: CircuitBreakerState;
    private _failReq: number;
    private _successReq: number;
    constructor(){
        this._lastFailTime = null;
        this._state = CircuitBreakerState.CLOSED;
        this._failReq = 0;
        this._successReq = 0;
    }
    resetfailReq(): void {
        this._failReq = 0;
    }
    resetsuccessReq(): void {        
        this._successReq = 0;
    }
    failReqInc(): void {
        this._failReq++;
    }
    successReqInc(): void {
        this._successReq++;
    }
    

    public get state():CircuitBreakerState{
        return this._state;
    }

    public get failReq(): number{
        return this._failReq;
    }

    public get successReq(): number{
        return this._successReq;
    }

    public set lastFailTime(date:Date){
        this._lastFailTime = date;
    }

    public get lastFailTime(): Date|null{
        return this._lastFailTime; 
    }
}