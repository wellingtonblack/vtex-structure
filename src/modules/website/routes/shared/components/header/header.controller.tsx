import React from "react";
import { BaseController } from "../../../base.controller";
import { HeaderComponent } from "./Header";
import { BackToTop } from "../BackToTop/BackToTop";


export class HeaderController extends BaseController {
    constructor() {
        super();
        this.renderComponent(<HeaderComponent />, "#root-header");
        this.renderComponent(<BackToTop />, "#root-back-to-top");
    }
}

export default new HeaderController();