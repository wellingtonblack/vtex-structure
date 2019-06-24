import * as React from "react";
import { IController } from "../shared/models/icontroller";
import { Page } from "../shared/models/page";

// import style
const style = require("./profile.lazy.scss");

class ProfileController extends Page implements IController {  
    

    public OnOrderFormChange(order: any): void {
        
    }

    public OnChildDestroy(): void {
        style.unuse();
    }

    public OnInit(): void {
        style.use();       
    }
}

export default new ProfileController();