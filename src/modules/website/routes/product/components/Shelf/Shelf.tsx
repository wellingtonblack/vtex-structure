
import s from "./Shelf.scss";
import React from "react";
import { Product } from "../../../../../common/models/product.model";
import Slider, { Settings } from "react-slick";
import { CardComponent } from "./components/Card/Card";
import SVGInline from "react-svg-inline";
import arrow from "../../../../assets/icons/arrow.svg";

export interface ShelfProps {

}

export interface ShelfState {
    loading: boolean;
    products: Product[];
}

export class ShelfComponent extends React.Component<ShelfProps, ShelfState> {

    constructor(props: ShelfProps) {
        super(props);
        this.state = {
            loading: true,
            products: [{}, {}, {}, {}, {}] as any,
        };
    }

    public loadProducts = (products: Product[]) => {
        this.setState({
            products,
            loading: false,
        });
    }

    public render() {

        const { products, loading } = this.state;

        const settings: Settings = {
            arrows: true,
            dots: true,
            infinite: false,
            lazyLoad: "ondemand",
            slidesToScroll: 3,
            nextArrow: <SVGInline svg={arrow} />,
            prevArrow: <SVGInline svg={arrow} />,
            slidesToShow: 3,
            speed: 500,
            responsive: [
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
            <div className={s.content}>
                <div className={s.wrapper}>
                    <div className={s.wrapperTitle}>
                        {this.props.children}
                    </div>
                    <Slider
                        className={s.slider}
                        {...settings}>
                        {
                            products &&
                            products.map((product, index) => <div className={s.cardItem} key={index}>
                                <CardComponent loading={loading} index={index} product={product} />
                            </div>)}
                    </Slider>
                </div>
            </div>
        );
    }
}


