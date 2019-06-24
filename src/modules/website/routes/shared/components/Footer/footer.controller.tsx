import React from "react";
import { BaseController } from "../../../base.controller";
import { FooterComponent } from "./Footer";


export class FooterController extends BaseController {
    constructor() {
        super();
        this.renderComponent(<FooterComponent />, "#root-footer");
    }
}

export default new FooterController();