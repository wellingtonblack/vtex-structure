import * as React from "react";
import { Banner } from "../../../shared/models/banner.model";
import { ImageBackgroundComponent } from "../../../shared/components/ImageBackground/ImageBackground";
import s from "./SupportingText.scss";

export interface SupportingTextProps {
}

export interface SupportingTextState {
    banner: Banner;
}

export class SupportingTextComponent extends React.Component<SupportingTextProps, SupportingTextState> {

    constructor(props: SupportingTextProps) {
        super(props);
        this.state = {
            banner: null,
        };
    }

    public setBanner(banners: Banner[]) {
        if (!banners) {
            return;
        }

        this.setState({
            banner: banners[0],
        });
    }

    public render() {
        const { banner } = this.state;
        return (
            banner && <section className={s.SupportingText}>
                <div className={s.wrapper}>
                    <div className={s.iconeWrapper}>
                        <ImageBackgroundComponent
                            alt={banner.alt}
                            className={s.icone}
                            heigth={300}
                            src={banner.src}
                            srcMob={banner.srcMob}
                            width={500}
                            href={banner.href} >
                        </ImageBackgroundComponent>
                    </div>
                    <div className={s.textWrapper} dangerouslySetInnerHTML={{ __html: banner.content }}></div>
                </div>
            </section>
        );
    }
}
