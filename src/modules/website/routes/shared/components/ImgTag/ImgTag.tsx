import * as React from "react";
import s from "./ImgTag.scss";
import { LazyComponentComponent } from "../LazyLoad/LazyLoad";


export interface ImgTagProps {
    src: string;
    srcMob: string;
    alt: string;
    width: number;
    heigth: number;
    className?: string;
    href?: string;
    index?: number;
    notcolor?: boolean;
    title?: string;
}

export interface ImgTagState {
    loading: boolean;
}

export class ImgTagComponent extends React.Component<ImgTagProps, ImgTagState> {

    public imageRef: any;
    constructor(props: ImgTagProps) {
        super(props);
        this.state = {
            loading: true,
        };

        window.addEventListener("resize", () => {
            this.forceUpdate();
        });
    }

    public render() {

        const loadBanner = (window.innerWidth < 768 && this.props.srcMob || window.innerWidth > 768 && this.props.src);

        return (
            <LazyComponentComponent className={[s.ImgTag, "wrapperImage", this.props.index ? `banner-${this.props.index}` : ""].join(" ")}>
                {loadBanner && <img
                    onLoad={() => {
                        setTimeout(() => {
                            this.setState({
                                loading: false,
                            });
                        }, 200);
                    }}
                    onError={() => {
                        this.setState({
                            loading: false,
                        });
                    }}
                    onAbort={() => {
                        this.setState({
                            loading: false,
                        });
                    }}
                    width={this.props.width}
                    height={this.props.heigth}
                    src={window.innerWidth < 768 ? this.props.srcMob : this.props.src}
                    alt={this.props.alt} />}
            </LazyComponentComponent>
        );
    }
}

