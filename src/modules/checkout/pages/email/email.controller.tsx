import * as React from "react";
import { Page } from "../shared/models/page";
import { IController } from "../shared/models/icontroller";
const style = require("./email.lazy.scss");

class EmailController extends Page implements IController {
    
    public OnOrderFormChange(order: any): void {           
    }

    public OnInit(): void {
        style.use();
    }

    public OnChildDestroy(): void {
    }   

    public OnDestroy(): void {
        style.unuse();
    }
}


export default new EmailController();