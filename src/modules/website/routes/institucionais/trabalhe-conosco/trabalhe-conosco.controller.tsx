import React from "react";
import { BannerComponent } from "./components/Banner/Banner";
import { BannerAtitudesComponent } from "./components/Banner-Atitudes/Banner-Atitudes";
import { VideoComponent } from "./components/Video/Video";
import "./trabalhe-conosco.scss";                                   
import { ButtonComponent } from "./components/Button/Button";
import { BaseController } from "../../base.controller";

export class TrabalheConoscoController extends BaseController {
    constructor() {
        super();

        this.renderBanner(<BannerComponent />, "#root-banner");
        this.renderComponent(<VideoComponent  />, "#root-video");
        this.renderComponent(<ButtonComponent />, "#root-button");
        this.renderBanner(<BannerAtitudesComponent />, "#root-banner-atitudes");
       
    }
}

export default new TrabalheConoscoController();