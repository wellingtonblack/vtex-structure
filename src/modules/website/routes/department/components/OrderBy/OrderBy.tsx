import * as React from "react";
import s from "./OrderBy.scss";
import SVGInline from "react-svg-inline";
import arrow from "../../../../assets/icons/angle-arrow-down.svg";
export interface OrderByProps {
    orderBy: string;
    handleChange(value: string): void;
}

export interface OrderByState {

}

export class OrderByComponent extends React.Component<OrderByProps, OrderByState> {

    public ref: any;

    constructor(props: OrderByProps) {
        super(props);
    }

    public render() {
        return (
            <div className={s.orderby}>
                <label 
                    className={s.arrow} 
                    htmlFor="orderBy">
                    <SVGInline
                        className={s.icon} 
                        svg={arrow} />
                </label>
                <select
                    id="orderBy"
                    ref={(ref) => { this.ref = ref; }}
                    onChange={(e) => {
                        this.props.handleChange(e.target.value);
                    }}
                    className={s.btn} value={this.props.orderBy}>
                    <option value="">ordernar por</option>
                    <option value="OrderByPriceASC">menor preço</option>
                    <option value="OrderByReleaseDateDESC">data de lançamento</option>
                    <option value="OrderByPriceDESC">maior preço</option>
                    <option value="OrderByTopSaleDESC">mais vendidos</option>
                    <option value="OrderByReviewRateDESC">mais avaliados</option>
                    <option value="OrderByNameASC">a-z</option>
                    <option value="OrderByNameDESC">z-a</option>
                    <option value="OrderByBestDiscountDESC">melhores descontos</option>
                </select>
            </div>
        );
    }
}
