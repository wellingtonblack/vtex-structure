import * as React from "react";
import utilsService from "../../services/utils-service";
import s from "./Image.scss";

export interface ImageProps {
    src: string;
    srcMob: string;
    alt: string;
    className?: string;
    small?: boolean;
    scale?: number;
    loadImage?: boolean;
    onLoad?(img: HTMLImageElement, loadImage: boolean): void;
}

export interface ImageState {
    loading: boolean;
}

export class ImageComponent extends React.Component<ImageProps, ImageState> {

    public image: HTMLImageElement;

    constructor(props: ImageProps) {
        super(props);
        this.state = {
            loading: this.props.small,
        };
    }

    public componentWillReceiveProps(props: ImageProps) {
        // this.props.onLoad && this.props.onLoad(this.image, props.loadImage);
    }

    public render() {

        const { src, srcMob, alt, scale } = this.props;
        const size = utilsService.getWidthAndHeight($(window).width() < 797 ? srcMob : src);

        return (
            <div className={this.props.className}>
                <picture
                    style={{ paddingTop: `${(size.height / size.width) * 100}%` }}
                    className={[s.imageComponent, this.state.loading ? s.blur : ""].join(" ")} >
                    <source media="(max-width: 767px)" srcSet={this.state.loading ? utilsService.resizeImage(scale || 10, srcMob) : srcMob} />
                    <source media="(min-width: 768px)" srcSet={this.state.loading ? utilsService.resizeImage(scale || 10, src) : src} />
                    <img
                        ref={(ref) => { this.image = ref; }}
                        src={`${this.state.loading ? utilsService.resizeImage(scale || 10, src) : src}`}
                        onLoad={(event) => {
                            if (this.props.small) {
                                this.setState({
                                    loading: false,
                                }, () => {
                                    this.props.onLoad && this.props.onLoad(this.image, this.props.loadImage);
                                });
                            }
                        }}
                        alt={alt} />
                    {this.props.children}
                </picture>
            </div>
        );
    }
}
