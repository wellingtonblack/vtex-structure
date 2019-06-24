import * as React from "react";
import { Shelf } from "../../../../../shared/models/shelf.model";
import { CardComponent } from "./components/Card/Card";
import Slider, { Settings } from "react-slick";
import SVGInline from "react-svg-inline";
import s from "./Shelf.scss";
import arrowNext from "../../../../../../assets/icons/arrow-shelf-next.svg";
import arrowPrev from "../../../../../../assets/icons/arrow-shelf-prev.svg";

export interface ShelfProps {
    shelf: Shelf;
    className: string;
}

export interface ShelfState {

}

export class ShelfComponent extends React.Component<ShelfProps, ShelfState> {

    constructor(props: ShelfProps) {
        super(props);
    }

    public render() {

        if (!this.props.shelf) {
            return null;
        }

        const { products, title } = this.props.shelf;

        const settings: Settings = {
            arrows: true,
            dots: false,
            infinite: false,
            lazyLoad: "ondemand",
            slidesToScroll: 2,
            slidesToShow: 2,
            speed: 500,
            nextArrow: <SVGInline className={s.arrow} svg={arrowNext} />,
            prevArrow: <SVGInline className={s.arrow} svg={arrowPrev} />,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    },
                },
                {
                    breakpoint: 875,
                    settings: {
                        slidesToShow: 1.5,
                        slidesToScroll: 1,
                    },
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    },
                },
            ],
        };

        return (
            <section className={[s.wrapperShelf, this.props.className].join(" ")}>
                <h2 className={s.title}>{title}<span>.</span></h2>
                <Slider
                    className={s.slider}
                    {...settings}>
                    {
                        products &&
                        products.map((product, index) => (
                            <div className={s.cardItem}>
                                <CardComponent key={index} index={index} product={product} />
                            </div>
                        ))}
                </Slider>
            </section>
        );
    }
}
