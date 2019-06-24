import React from "react";
import { BaseController } from "../../base.controller";
import "./dia-dos-namorados.controller.scss";
import { BannerComponent } from "./components/Banner/Banner";
import { SectionCallComponent } from "./components/Section-call/section-call";
import { EpisodesComponent } from "./components/Episodes/episodes";
import { VideoMiddleComponent } from "./components/Video_middle/video-middle";
import { TutorialComponent } from "./components/tutorial/tutorial";
import { SliderBottomComponent } from "./components/slider-bottom/slider-bottom";

class NamoradosController extends BaseController {
    constructor() {
        super();
        this.renderBanner(<BannerComponent />, "#root-banner");
        this.renderComponent(<SectionCallComponent />, "#root-section-call");
        this.renderComponent(<EpisodesComponent />, "#root-episodes");
        this.renderComponent(<VideoMiddleComponent />, "#root-video-middle");
        this.renderComponent(<TutorialComponent />, "#root-tutorial");
        this.renderComponent(<SliderBottomComponent />, "#root-slider");
    }
}

export default new NamoradosController();