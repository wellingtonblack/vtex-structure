import * as React from "react";
import { Banner } from "../../../shared/models/banner.model";
import { ImageBackgroundComponent } from "../../../shared/components/ImageBackground/ImageBackground";
import s from "./Banner-double.scss";

export interface BannerDoubleProps {
}

export interface BannerDoubleState {
    banners: Banner[];
}

export class BannerDoubleComponent extends React.Component<BannerDoubleProps, BannerDoubleState> {

    constructor(props: BannerDoubleProps) {
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
                            <div className={s.content} dangerouslySetInnerHTML={{ __html: banner.content }}></div>
                        </ImageBackgroundComponent>
                    </div>
                ))}
            </section>
        );
    }
}
