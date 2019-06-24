import * as React from "react";
import s from "./slider-bottom.scss";
import SVGInline from "react-svg-inline";
import guiadepresentes from "../../../../../assets/icons/guiadepresentes.svg";
import Slider, { Settings } from "react-slick";
import arrowNext from "../../../../../assets/icons/arrow-landing-next.svg";
import arrowPrev from "../../../../../assets/icons/arrow-landing-prev.svg";
import { VideoModalComponent1 } from "./component/video-modal/video-modal-1";
import { VideoModalComponent2 } from "./component/video-modal/video-modal-2";


export interface SliderBottomProps {
}

export interface SliderBottomState {
}

export class SliderBottomComponent extends React.Component<SliderBottomProps, SliderBottomState> {

    constructor(props: SliderBottomProps) {
        super(props);
        this.state = {
        };
    }



    public render() {

        const setting: Settings = {
            arrows: true,
            dots: false,
            infinite: true,
            autoplay: true,
            lazyLoad: "ondemand",
            slidesToScroll: 1,
            slidesToShow: 1,
            nextArrow: <SVGInline className={s.arrow} svg={arrowNext} />,
            prevArrow: <SVGInline className={s.arrow} svg={arrowPrev} />,
            autoplaySpeed: 6000,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        asNavFor: null,
                    },
                },
                {
                    breakpoint: 767,
                    settings: {
                        arrows: false,
                    },
                },
            ],
        };

        return (
            <section className={s.sliderBottom}>
                <VideoModalComponent1 />
                <VideoModalComponent2 />
                <div className={[s.wrapper].join(" ")}>
                    <h2 className={[s.title].join(" ")}>guia de presentes<SVGInline className={[s.icon].join("")} svg={guiadepresentes} /></h2>
                    <div className={s.content}>
                        <Slider
                            className={s.sliderDown}
                            {...setting}>
                            {/* <a href="javascript:void(0);"
                                onClick={() => {
                                    window.dispatchEvent(new Event("slider.modal1.open"));
                                }}> */}
                                <img src=" http://vitrio.com.br/clientes/aramis/1122_750_salmao.gif" alt="" />
                            {/* </a> */}
                            <a href="/inverno-2019">
                                <img src="/arquivos/slider-products-namorados01.png" alt="" />
                            </a>
                            {/* <a href="javascript:void(0);"
                                onClick={() => {
                                    window.dispatchEvent(new Event("slider.modal2.open"));
                                }}> */}
                                <img src="http://vitrio.com.br/clientes/aramis/1122_750_verde.gif" alt="" />
                            {/* </a> */}
                            <a href="/inverno-2019">
                                <img src="/arquivos/slider-products-namorados02.png" alt="" />
                            </a>
                        </Slider>
                    </div>
                </div>
            </section>
        );
    }
}
