import * as React from "react";
import s from "./Percentage.scss";
import utilsService from "../../services/utils-service";

export interface PercentageProps {
    oldPrice: number;
    newPrice: number;
}

export interface PercentageState {

}

export class PercentageComponent extends React.Component<PercentageProps, PercentageState> {

    constructor(props: any) {
        super(props);
    }

    public render() {

        if (this.props.newPrice >= this.props.oldPrice) {
            return null;
        }

        const price = utilsService.percentage(this.props.oldPrice, this.props.newPrice);

        if (price < 1) {
            return null;
        }

        return (
            <div className={[s.percentage, "flag"].join(" ")}>
                <em>{price}% off</em>
            </div>
        );
    }
}


