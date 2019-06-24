import React from "react";
import { BaseController } from "../base.controller";
import { BannerComponent } from "./components/Banner-single/Banner-single";
import "./home.scss";
import { BannerBoxComponent } from "./components/BannerBox/BannerBox";
import { VideoComponent } from "./components/Video/Video";
import { CustomShelf } from "./components/Modelagens/models/shelfs";
import { Modelagem1Component } from "./components/Modelagens/Modelagem1";
import { Modelagem2Component } from "./components/Modelagens/Modelagem2";
import { InstagramComponent } from "./components/Instagram/instagram.component";
import { Video } from "./components/Video/models/video";
import { BannerSliderComponent } from "./components/Banner-slider/Banner-slider";

declare const modelagemInformation1: CustomShelf;
declare const modelagemInformation2: CustomShelf;
declare const iframeHome: Video;
class HomeController extends BaseController {
    constructor() {
        super();
        
        this.renderBanner(<BannerSliderComponent />, "#root-banner-slider");
        this.renderBanner(<BannerComponent />, "#root-banner");
        this.renderBanner(<BannerBoxComponent />, "#root-banner-box");
        this.renderComponent(<VideoComponent iframe={iframeHome} />, "#root-video");
        this.renderComponent(<Modelagem1Component content={modelagemInformation1} />, "#root-shelf1");
        this.renderComponent(<Modelagem2Component content={modelagemInformation2} />, "#root-shelf2");
        this.renderComponent(<InstagramComponent />, "#root-InstagramComponent");
    }
}

export default new HomeController();