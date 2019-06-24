import * as React from "react";
import { IController } from "../shared/models/icontroller";
import { Page } from "../shared/models/page";
import { CartResumeComponent } from "../shared/components/CartResume/CartResume";
const style = require("./cart.lazy.scss");


class CartController extends Page implements IController {

    public resume: CartResumeComponent = null;

    public OnOrderFormChange(order: any): void {
        this.renderCartResume();
        this.resume && this.resume.update();
        this.clearRows();
    }

    public OnInit(): void {
        style.use();
        this.renderCartResume();
        this.clearRows();
    }

    public OnChildDestroy(): void {
        style.unuse();
    }

    public clearRows() {
        
        const rows = document.querySelectorAll(".item-component.hide");
        
        if (!rows) {
            return;
        }
        
        for (let index = 0; index < rows.length; index++) {
            const row = rows[index];
            row.remove();
        }
    }

    public renderCartResume = () => {
        const render = this.renderComponent(<CartResumeComponent />, ".cart-template.active .summary-template-holder", "cart-resume-ref", "after", "div");
        if (render) {
            this.resume = render;
        }
    }
}

export default new CartController();