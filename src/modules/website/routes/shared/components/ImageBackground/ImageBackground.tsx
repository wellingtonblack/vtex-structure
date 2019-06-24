import * as React from "react";
import s from "./ImageBackground.scss";
import { LazyComponentComponent } from "../LazyLoad/LazyLoad";


export interface ImageBackgroundProps {
    src: string;
    srcMob: string;
    alt: string;
    width: number;
    heigth: number;
    className?: string;
    href?: string;
    index?: number;
    notcolor?: boolean;
}

export interface ImageBackgroundState {
    loading: boolean;
}

export class ImageBackgroundComponent extends React.Component<ImageBackgroundProps, ImageBackgroundState> {

    public imageRef: any;
    constructor(props: ImageBackgroundProps) {
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
            <LazyComponentComponent className={[s.imageBackgroundComponent, "wrapperImage", this.props.index ? `banner-${this.props.index}` : ""].join(" ")}>
                {loadBanner && <img
                    style={{ display: "none" }}
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

                <a
                    href={this.props.href}
                    ref={(imageRef) => { this.imageRef = imageRef; }}
                    className={[this.props.className, this.state.loading && !this.props.notcolor && loadBanner ? s.background : "", s.transition].join(" ")}
                    style={{ backgroundImage: `url(${window.innerWidth < 768 ? !this.state.loading && loadBanner && this.props.srcMob : !this.state.loading && this.props.src})` }}>

                    {(this.state.loading) ? (
                        loadBanner && <div className={s.ldsRoller}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                    ) : ""}
                    {this.props.children}
                </a>
            </LazyComponentComponent>
        );
    }
}

