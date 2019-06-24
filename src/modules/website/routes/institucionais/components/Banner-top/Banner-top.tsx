import * as React from "react";
import s from "./Banner-top.scss";
import { Banner } from "../../../shared/models/banner.model";
import { ImageBackgroundComponent } from "../../../shared/components/ImageBackground/ImageBackground";

export interface BannerTopProps {
}

export interface BannerTopState {
    banners: Banner[];
}

export class BannerTopComponent extends React.Component<BannerTopProps, BannerTopState> {

    constructor(props: BannerTopProps) {
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
            <div className={s.bannerTop}>
                <section className={s.bannerWrapper}>
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
                </section>
            </div>
        );
    }
}
