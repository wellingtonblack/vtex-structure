import * as React from "react";
import { Banner } from "../../../../shared/models/banner.model";
import { ImageBackgroundComponent } from "../../../../shared/components/ImageBackground/ImageBackground";
import s from "./Banner.scss";
import { ModalVideoComponent } from "./component/modal-video/modal-video";

export interface BannerProps {
}

export interface BannerState {
    banners: Banner[];
}

export class BannerComponent extends React.Component<BannerProps, BannerState> {

    constructor(props: BannerProps) {
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
        return (
            <div className={s.namorados}>
                <div className={s.wrapper}>
                    <section className={s.bannerWrapper}>
                        {this.state.banners && this.state.banners.map((banner, index) => (
                            <div
                                onClick={() => {
                                    window.dispatchEvent(new Event("video.modal.open"));
                                }}
                                key={index} className={[s.bannerItem, s.wrapper].join(" ")}>
                                <ImageBackgroundComponent
                                    alt={banner.alt}
                                    className={s.banner}
                                    heigth={300}
                                    src={banner.src}
                                    srcMob={banner.srcMob}
                                    width={500}
                                    href={banner.href}
                                >
                                </ImageBackgroundComponent>
                            </div>
                        ))}
                    </section>
                    <ModalVideoComponent />
                </div>
            </div>
        );
    }
}
