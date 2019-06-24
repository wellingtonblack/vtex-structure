import * as React from "react";
import { Page } from "../../models/page";
import { IController } from "../../models/icontroller";
import { FooterComponent } from "./Footer";

class HeaderController extends Page implements IController {
    
    
    public OnOrderFormChange(order: any): void {  
    }

    public OnInit(): void {
       this.renderStaticComponent(<FooterComponent  />, "#root-footer") as any;
    }

    public OnHashChange(hash: string): void {
    }

    public OnChildDestroy(): void {
    }   

    public OnDestroy(): void {
        
    }
}


export default new HeaderController();