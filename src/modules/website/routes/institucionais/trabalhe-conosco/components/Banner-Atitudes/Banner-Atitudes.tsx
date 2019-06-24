import * as React from "react";
import s from "./Banner-Atitudes.scss";
import { Banner } from "../../../../shared/models/banner.model";
import { ImageBackgroundComponent } from "../../../../shared/components/ImageBackground/ImageBackground";

export interface BannerProps {
}

export interface BannerState {
    banners: Banner[];
}

export class BannerAtitudesComponent extends React.Component<BannerProps, BannerState> {

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
            <div className={s.wrapperWork}>
            <div className={s.wrapper}>
            <h2 className={s.titleBannerLeft}>NOSSAS ATITUDES</h2>
            
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
            </div>
            
        );
    }
}
