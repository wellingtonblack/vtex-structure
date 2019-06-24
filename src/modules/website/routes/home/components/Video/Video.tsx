import * as React from "react";
import { Banner } from "../../../shared/models/banner.model";
import s from "./Video.scss";
import SVGInline from "react-svg-inline";
import colecao from "../../../../assets/icons/nova-colecao.svg";
import {Video } from "./models/video";

export interface VideoProps {
    iframe: Video;
}

export interface VideoState {
    banners: Banner[];
}

export class VideoComponent extends React.Component<VideoProps, VideoState> {

    constructor(props: VideoProps) {
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
            <section className={s.video}>
                <div className={s.wrapper}>
                    <h2 className={s.collection}>
                        Nova coleção
                        <SVGInline className={s.logoCollection} svg={colecao} />
                    </h2>
                    <div className={s.iframeVideo}>
                        <div className={s.videoWrapper}>
                            <iframe className={s.videoContent} onLoad={() => {
                            }} src={this.props.iframe.src} height={`100%`} width={`100%`} frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" ></iframe>
                        </div>
                    </div>

                </div>
            </section>
        );
    }
}
