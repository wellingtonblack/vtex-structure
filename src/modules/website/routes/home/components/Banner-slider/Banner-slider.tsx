import * as React from "react";
import { Banner } from "../../../shared/models/banner.model";
import { ImageBackgroundComponent } from "../../../shared/components/ImageBackground/ImageBackground";
import s from "./Banner-slider.scss";
import Slider, { Settings } from "react-slick";
import SVGInline from "react-svg-inline";
import arrowNext from "../../../../assets/icons/arrow-landing-next.svg";
import arrowPrev from "../../../../assets/icons/arrow-landing-prev.svg";


export interface BannerSliderProps {
}

export interface BannerSliderState {
    banners: Banner[];
}

export class BannerSliderComponent extends React.Component<BannerSliderProps, BannerSliderState> {

    constructor(props: BannerSliderProps) {
        super(props);
        this.state = {
            banners: [],
        };
    }

    public setBanner(banners: Banner[]) {
        this.setState({
            banners,
        });
    }

    public render() {
        const settings: Settings = {
            arrows: true,
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            autoplay: true,
            autoplaySpeed: 6000,
            nextArrow: <SVGInline className={s.arrow} svg={arrowNext} />,
            prevArrow: <SVGInline className={s.arrow} svg={arrowPrev} />,
            pauseOnHover: false,
            responsive: [
                {
                    breakpoint: 767,
                    settings: {
                        arrows: false,
                    },
                },
            ],
        };

        return (
            <section className={s.bannerWrapper}>
                <Slider {...settings}>
                    {this.state.banners && this.state.banners.map((banner, index) => (
                        <div key={index} className={[s.bannerItem, s.wrapper].join(" ")}>

                            <ImageBackgroundComponent
                                alt={banner.alt}
                                className={s.banner}
                                heigth={300}
                                src={banner.src}
                                srcMob={banner.srcMob}
                                width={500}
                                href={banner.href}
                            >
                                {/* <div className={s.content} dangerouslySetInnerHTML={{ __html: banner.content }}></div> */}
                            </ImageBackgroundComponent>

                        </div>
                    ))}
                </Slider>
            </section>
        );
    }
}
