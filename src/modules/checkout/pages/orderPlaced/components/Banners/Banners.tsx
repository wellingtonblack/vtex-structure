import React from "react";
import s from "./Banners.scss";

export function Banners() {
    return (
        <div className={s.banners}>
            <a id="bannerCupom" className={s.banner} href="#"><img  src={"/arquivos/banner-cupon.jpg"} alt="banner cupon" /></a>
            <a id="bannerEbitNovo" className={s.banner} href="#"><img  src={"/arquivos/banner-ebit.jpg"} alt="banner cupon" /></a>
        </div>
    );
}