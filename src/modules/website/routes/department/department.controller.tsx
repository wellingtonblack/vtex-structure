import React from "react";
import { BaseController } from "../base.controller";
import { BannerDepartmentComponent } from "./components/Banner/Banner";
import { DepartmentComponent } from "./Department";
import "./department.controller.scss";

export class DepartmentController extends BaseController {
    constructor() {
        super();
        this.renderBanner(<BannerDepartmentComponent />, "#root-banner");
        this.renderComponent(<DepartmentComponent />, "#root-department");

    }
}

export default new DepartmentController();