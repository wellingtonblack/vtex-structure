import React from "react";
import { BaseController } from "../base.controller";
import { BrandsComponent } from "./Brands";

export class BrandsController extends BaseController {
    constructor() {
        super();

        this.renderComponent(<BrandsComponent />, "#root-brands");
        
    }
}

export default new BrandsController();