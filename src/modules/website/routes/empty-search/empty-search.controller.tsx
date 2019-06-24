import React from "react";
import { BaseController } from "../base.controller";
import { StaticShelfComponent } from "../shared/components/StaticShelf/StaticShelf";
import "./empty-search.controller.scss";
import { SearchComponent } from "./components/Search/empty-search";

class EmptySearchController extends BaseController {
    constructor() {
        super();
        this.renderComponent(<SearchComponent handleActive={() => { }}  />, "#root-field-search");
        this.renderComponentWithShelf(<StaticShelfComponent />, "#root-shelf");

    }
}

export default new EmptySearchController();