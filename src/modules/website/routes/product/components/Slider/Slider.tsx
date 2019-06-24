import * as React from "react";
import Slider, { Settings } from "react-slick";
import { SkuImage, Product } from "../../../../../common/models/product.model";
import { ImageComponent } from "../../../shared/components/Image/Image";
import utilsService from "../../../shared/services/utils-service";
import zoomPlusIcon from "../../../../assets/icons/zoom-in.svg";
import SVGInline from "react-svg-inline";
import s from "./Slider.scss";
import arrow from "../../../../assets/icons/arrow.svg";


export interface SliderProps {
    product: Product;
    images: SkuImage[][];
}

export interface SliderState {
    main: Slider;
    zoom: boolean;
}

export class SliderComponent extends React.Component<SliderProps, SliderState> {

    public main: Slider;
    public display: HTMLElement;
    public images: any[] = [];

    constructor(props: SliderProps) {
        super(props);

        this.state = {
            main: null,
            zoom: false,
        };
    }

    public componentDidMount() {
        const { main } = this.state;

        this.setState({
            main,
        });
    }

    public imageZoom = (img: HTMLImageElement, result: HTMLElement) => {

        // let lens: any;
        let cx: any;
        let cy: any;

        /* Create lens: */
        /* Calculate the ratio between result DIV and lens: */
        cx = 2;
        cy = 2;

        /* Set background properties for the result DIV */
        result.style.backgroundImage = "url('" + utilsService.cropImage(img.width * cx, img.height * cy, img.src) + "')";
        result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
        result.style.backgroundRepeat = "no-repeat";

        /* Execute a function when someone moves the cursor over the image, or the lens: */
        result.addEventListener("mousemove", moveLens);

        /* And also for touch screens: */
        result.addEventListener("touchmove", moveLens);

        img.setAttribute("style", `opacity:0`);

        function moveLens(e: any) {

            let pos: any;
            let x: any;
            let y: any;

            /* Prevent any other actions that may occur when moving over the image */
            e.preventDefault();

            /* Get the cursor's x and y positions: */
            pos = getCursorPos(e);

            /* Calculate the position of the lens: */
            x = Math.max(Math.min(pos.x, img.offsetWidth), 0);
            y = Math.max(Math.min(pos.y, img.offsetHeight), 0);

            const xRatio = ((img.width * cx) - img.offsetWidth) / img.offsetWidth;
            const yRatio = ((img.height * cx) - img.offsetHeight) / img.offsetHeight;

            // /* Display what the lens "sees": */
            result.style.backgroundPosition = `-${x * xRatio}px -${y * yRatio}px`;
        }

        function getCursorPos(e: any) {
            let a: any;
            let x: any = 0;
            let y: any = 0;

            e = e || window.event;

            /* Get the x and y positions of the image: */
            a = img.getBoundingClientRect();

            /* Calculate the cursor's x and y coordinates, relative to the image: */
            x = e.pageX - a.left;
            y = e.pageY - a.top;

            /* Consider any page scrolling: */
            x = x - window.pageXOffset;
            y = y - window.pageYOffset;

            return { x, y };
        }
    }

    public render() {

        const { images, product } = this.props;

        const settingsmain: Settings = {
            arrows: true,
            dots: false,
            infinite: false,
            lazyLoad: "ondemand",
            slidesToScroll: 1,
            slidesToShow: 1,
            nextArrow: <SVGInline className={s.arrow} svg={arrow} />,
            prevArrow: <SVGInline className={s.arrow} svg={arrow} />,
            speed: 500,
            beforeChange: () => {
                this.display && this.display.removeAttribute("style");
                $(this.display).off();
            },
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        asNavFor: null,
                    },
                },
            ],
        };

        let filter = null;

        if ($(window).width() > 991) {
            filter = images && images.filter((x) => !/mobile/.test(x[0].Path.toLowerCase()));
        } else {
            filter = images && images.filter((x) => !/desk/.test(x[0].Path.toLowerCase()));
        }

        return (
            <div className={s.wrapperSlider}>
                <section
                    ref={(display) => { this.display = display; }}
                    className={s.sliderMain}>
                    <Slider
                        ref={(ref) => { this.main = ref; }}
                        className={s.slider}
                        {...settingsmain}>
                        {filter && filter.map((image, index) => {
                            const _image: ImageComponent = <ImageComponent
                                key={index}
                                alt={product.productName}
                                className={s.image}
                                onLoad={(img) => {
                                    this.images.indexOf(img) === -1 && this.images.push(img);
                                }}
                                small={true}
                                loadImage={this.state.zoom}
                                srcMob={utilsService.cropImage(375, 495, image[0].Path)}
                                src={utilsService.cropImage(1000, 925, image[0].Path)}>
                                <button className={s.buttonZoom} onClick={() => {
                                    this.setState({
                                        zoom: !this.state.zoom,
                                    }, () => {
                                        if (this.state.zoom) {
                                            this.imageZoom(this.images[index], this.display);
                                        } else {
                                            this.images[index].style.opacity = "1";
                                            this.display.removeAttribute("style");
                                            $(this.display).off();
                                        }
                                    });
                                }}><SVGInline className={s.icon} svg={zoomPlusIcon} /></button>
                            </ImageComponent> as any;

                            return (
                                <li
                                    key={index}
                                    className={s.productImage}>
                                    {_image}
                                </li>
                            );
                        })}
                    </Slider>
                </section>
            </div>
        );
    }
}
