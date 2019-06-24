import * as React from "react";
import s from "./SubTotals.scss";
import { OrderForm } from "../../../../../../../../../common/models/orderform.model";
import utilsService from "../../../../../../services/utils-service";

export interface SubTotalsProps {
    orderForm: OrderForm;
    handleCalcWithDiscount(active: boolean): void;
}

export interface SubTotalsState {
    calcWithDiscount: boolean;
}

export class SubTotalsComponent extends React.Component<SubTotalsProps, SubTotalsState> {

    constructor(props: any) {
        super(props);
        this.state = {
            calcWithDiscount: false,
        };
    }


    public render() {
        const { orderForm } = this.props;
        const { calcWithDiscount } = this.state;

        let shipping: any = orderForm.totalizers.find((totalizer) => totalizer.id === "Shipping");
        shipping = shipping && shipping.value / 100;

        let items: any = orderForm.totalizers.find((totalizer) => totalizer.id === "Items");
        items = items && items.value / 100;

        let discount: any = orderForm.totalizers.find((totalizer) => totalizer.id === "Discounts");
        discount = discount && discount.value / 100;

        if (calcWithDiscount) {
            items -= (items * 10) / 100;
        }

        return (
            items ? <div className={s.subtotals}>
                <ul className={s.subtotal}>
                    {items &&
                        <li className={s.item}>
                            <span className={s.label}>subtotal:</span>
                            <span className={s.price}>R$ {utilsService.parseMoney(items)}</span>
                        </li>}
                    {discount &&
                        <li className={s.item}>
                            <span className={s.label}>desconto:</span>
                            <span className={s.price}>{`R$ ${utilsService.parseMoney(discount)}`}</span>
                        </li>
                    }
                    {shipping >= 0 ?
                        <li className={s.item}>
                            <span className={s.label}>frete:</span>
                            <span className={s.price}>{shipping > 0 ? `R$ ${utilsService.parseMoney(shipping)}` : "grátis"}</span>
                        </li> : ""}
                    <li
                        className={s.item}>
                        <span className={[s.label, s.total].join(" ")}>total:</span>
                        <span className={s.price}>R$ {utilsService.parseMoney((items + shipping + discount) || (items + discount) || items + shipping || items)}</span>
                    </li>
                </ul>
                {/* <div className={s.paymentAction}>
                    <span className={s.title}>calcular preço a vista?</span>
                    <button className={s.button}>
                        <span onClick={() => {this.setState({calcWithDiscount: true}, () => { 
                            this.props.handleCalcWithDiscount(true);
                        }); }} className={s.label}>sim</span>
                        <span onClick={() => {this.setState({calcWithDiscount: false},  () => {
                            this.props.handleCalcWithDiscount(false);
                        }); }} className={s.label}>não</span>
                        <span className={[s.buttonCalc, calcWithDiscount ? s.active : s.inactive].join(" ")}>{calcWithDiscount ? "sim" : "não"}</span>
                    </button>
                </div> */}
            </div> : null
        );
    }
}


