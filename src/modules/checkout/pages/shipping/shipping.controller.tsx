import React from "react";
import { Page } from "../shared/models/page";
import { IController } from "../shared/models/icontroller";

const style = require("./shipping.lazy.scss");

class ShippingController extends Page  implements IController {

    public OnInit(): void {
        style.use();
    }

    // tslint:disable-next-line:no-empty
    public OnOrderFormChange(order: any): void {
        
    }

    public OnChildDestroy(): void {
        
    }
    
    public OnDestroy(): void {
        style.unuse();
    }
}

export default new ShippingController();