import React from "react";
import SVGInline from "react-svg-inline";
import arrow from "../../../../assets/icons/arrow-prev.svg";
import s from "./BackToTop.scss";
import utilsService from "../../services/utils-service";

export function BackToTop() {
    return (<div className={s.box} onClick={() => {
        utilsService.scrollTop(0);
    }}>
        <SVGInline svg={arrow} className={s.icon} />
    </div>);
}