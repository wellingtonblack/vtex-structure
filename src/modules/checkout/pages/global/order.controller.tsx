import * as React from "react";
import { Page } from "../shared/models/page";
import { IController } from "../shared/models/icontroller";
import { TotalizerComponent } from "./components/Totalizer/Totalizer";

class OrderController extends Page implements IController {

    
    public totalizer: TotalizerComponent = null;

    public OnOrderFormChange(order: any): void {
        this.renderCarttotalizer();
        this.totalizer && this.totalizer.update(vtexjs.checkout.orderForm);        
    }

    public OnInit(): void {
        this.renderCarttotalizer();
    }

    public OnChildDestroy(): void {
    }   

    public renderCarttotalizer = () => {
        const render = this.renderComponent(<TotalizerComponent orderForm={vtexjs.checkout.orderForm} />, ".orderform-template .summary-cart-template-holder", "resume-cart-ref", "after", "div");
        if (render) {
            this.totalizer = render;
        }
    }
}


export default new OrderController();