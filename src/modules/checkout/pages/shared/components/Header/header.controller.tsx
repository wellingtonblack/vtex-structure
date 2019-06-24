import * as React from "react";
import { Page } from "../../models/page";
import { IController } from "../../models/icontroller";
import { HeaderComponent } from "./Header";

class HeaderController extends Page implements IController {
    
    public header: HeaderComponent;
    public step: string = null;

    public OnOrderFormChange(order: any): void {  
    }

    public OnInit(): void {
       this.header = this.renderStaticComponent(<HeaderComponent step={this.step} />, "#root-header") as any;
    }

    public OnHashChange(hash: string): void {
        this.step = hash;
        this.header && this.header.setStep(hash);
    }

    public OnChildDestroy(): void {
    }   

    public OnDestroy(): void {
        
    }
}


export default new HeaderController();