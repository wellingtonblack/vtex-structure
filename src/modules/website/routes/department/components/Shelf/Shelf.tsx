import * as React from "react";
import { CardComponent } from "./components/Card/Card";
import Slider, { Settings } from "react-slick";
import SVGInline from "react-svg-inline";
import s from "./Shelf.scss";

import prev from "../../../../assets/icons/prev-arrow.svg";
import next from "../../../../assets/icons/next-arrow.svg";
import { Shelf } from "../../../shared/models/shelf.model";

export interface ShelfProps {
    shelf: Shelf;
    className?: string;
    full: boolean;
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
            dots: true,
            infinite: false,
            lazyLoad: "ondemand",
            slidesToScroll: 1,
            slidesToShow: 1,
            speed: 500,
            prevArrow: <div key={1}><SVGInline className={s.prevArrow} svg={prev} /></div>,
            nextArrow: <div key={2}><SVGInline className={s.nextArrow} svg={next} /></div>,

        };

        return (
            <div className={[s.prateleira, this.props.full ? s.full : ""].join(" ")}>
                <section className={[s.wrapperShelf, this.props.className].join(" ")}>
                    <h2 className={s.title}>{title}<span>.</span></h2>
                    <Slider
                        className={s.slider}
                        {...settings}>
                        {
                            products &&
                            products.map((product, index) => (
                                <div key={index} className={s.cardItem}>
                                    <CardComponent 
                                        full={this.props.full}
                                        key={index} 
                                        index={index} 
                                        product={product} />
                                </div>
                            ))}
                    </Slider>
                </section>
            </div>
        );
    }
}
