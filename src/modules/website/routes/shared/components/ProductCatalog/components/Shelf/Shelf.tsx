import React from "react";
import s from "./Shelf.scss";
import { Shelf } from "../../../../../shared/services/shelf.service";
import SVGInline from "react-svg-inline";
import arrowNext from "../../../../../../assets/icons/arrow-shelf-next.svg";
import arrowPrev from "../../../../../../assets/icons/arrow-shelf-prev.svg";
import Slider, { Settings } from "react-slick";
import { CardComponent } from "../Card/Card";

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
            slidesToScroll: 3,
            slidesToShow: 3,
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
                <h2 className={s.title}>{title}</h2>
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
