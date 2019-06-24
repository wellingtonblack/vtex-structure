import React from "react";
import s from "./PriceRange.scss";
import { InputRange } from "../../../../../shared/components/InputRange/InputRange";
import utilsService from "../../../../../shared/services/utils-service";


export interface Props {
    handlePriceChange(value: any): void;
}

interface PriceRange {
    min: number;
    max: number;
}

export interface State {
    value: PriceRange;
}

export class PriceRangeComponent extends React.Component<Props, State> {
    public node: HTMLDivElement = null;

    constructor(props: Props) {
        super(props);
        this.state = {
            value: { min: 2, max: 500 },
        };
    }

    public render() {
        return (
            <section className={s.priceRange}>
                <h2 className={s.title}>faixa de preço</h2>
                <InputRange
                    formatLabel={(value: any) => `R$ ${utilsService.parseMoney(value)}`}
                    maxValue={1000}
                    minValue={1}
                    value={this.state.value}
                    onChange={(value) => this.setState({ value })} 
                    onChangeComplete={(value) => { this.props.handlePriceChange(value); }}
                    classNames={s.teste}
                    />
            </section>
        );
    }


}