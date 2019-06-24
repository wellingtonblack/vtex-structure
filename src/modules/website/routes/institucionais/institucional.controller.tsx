import "./institucional.scss";
import "./revendedor/revendedor.scss";
import "./central-de-atendimento/central-de-atendimento.scss";
import "./lojas/lojas.scss";
import React from "react";
import { BaseController } from "../base.controller";
import { BannerTopComponent } from "./components/Banner-top/Banner-top";


export class InstitucionalController extends BaseController {
    constructor() {
        super();

        this.renderBanner(<BannerTopComponent />, "#root-banner");
       
    }
}

export default new InstitucionalController();
