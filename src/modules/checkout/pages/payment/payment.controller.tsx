import * as React from "react";
import { Page } from "../shared/models/page";
import { IController } from "../shared/models/icontroller";
const style = require("./payment.lazy.scss");

class PaymentController extends Page implements IController {

    
    constructor() {
        super();
    }

    public OnInit(): void {
        style.use();        
    }

    public OnChildDestroy(): void {
        style.unuse();
    }

    public OnOrderFormChange(order: any): void {
       
    }

}


export default new PaymentController();