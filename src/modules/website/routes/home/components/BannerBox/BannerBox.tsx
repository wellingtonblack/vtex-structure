import * as React from "react";
import { Banner } from "../../../shared/models/banner.model";
import s from "./BannerBox.scss";
import { ImgTagComponent } from "../../../shared/components/ImgTag/ImgTag";
import Slider, { Settings } from "react-slick";
import { ImageBackgroundComponent } from "../../../shared/components/ImageBackground/ImageBackground";
import { LazyComponentComponent } from "../../../shared/components/LazyLoad/LazyLoad";

export interface BannerBoxProps {
}

export interface BannerBoxState {
    banners: Banner[];
}

export class BannerBoxComponent extends React.Component<BannerBoxProps, BannerBoxState> {

    constructor(props: BannerBoxProps) {
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
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
            autoplay: true,
        };

        return (
            <section className={s.sectionBoxes}>
                <div className={s.boxMiddle}>
                    {$(window).width() > 768 ? this.state.banners && this.state.banners.map((banner, index) => (
                        <div key={index} className={[s.bannerItem, s.wrapper, s.padBox, `bannerBox-${index}`].join(" ")}>
                            <LazyComponentComponent>
                                <h2 className={s.labelText}>{banner.alt}</h2>
                                <a href={banner.href} title={banner.alt}>
                                    <ImgTagComponent
                                        alt={banner.alt}
                                        className={s.banner}
                                        heigth={300}
                                        src={banner.src}
                                        srcMob={banner.srcMob}
                                        width={500}
                                        href={banner.href}>
                                    </ImgTagComponent>
                                </a>
                            </LazyComponentComponent>
                        </div>)) :
                        <Slider {...settings}>
                            {this.state.banners && this.state.banners.map((banner, index2) => (
                                <div key={index2} className={[s.bannerItem, s.wrapper, s.padBox, `bannerBox-${index2}`].join(" ")}>
                                    <h2 className={s.labelText}>{banner.alt}</h2>
                                    <ImageBackgroundComponent
                                        alt={banner.alt}
                                        className={s.banner}
                                        heigth={685}
                                        src={banner.src}
                                        srcMob={banner.srcMob}
                                        width={375}
                                        href={banner.href}>
                                    </ImageBackgroundComponent>
                                </div>

                            ))}
                        </Slider>

                    }
                </div>
            </section>);
    }
}
