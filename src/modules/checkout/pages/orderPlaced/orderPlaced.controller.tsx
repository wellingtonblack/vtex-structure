import * as React from "react";
import { Page } from "../shared/models/page";
import { IController } from "../shared/models/icontroller";
import { OrderPlacedComponent } from "./OrderPlaced";
const style = require("./orderPlaced.lazy.scss");

class OrderPlacedController extends Page implements IController {

    public OnInit(): void {
        style.use();
        this.renderStaticComponent(<OrderPlacedComponent />, "#root-app");     
    }

    public OnChildDestroy(): void {
        style.unuse();
    }

    public OnOrderFormChange(order: any): void {
       
    }

}


export default new OrderPlacedController();