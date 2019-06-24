import * as React from "react";
import s from "./CartButton.scss";
import SVGInline from "react-svg-inline";
import bag from "../../../../../../assets/icons/bag.svg";
import { MiniCartComponent } from "../MiniCart/MiniCart";
import { OrderForm } from "../../../../../../../common/models/orderform.model";

export interface CartButtonProps {
}

export interface CartButtonState {
    orderForm: OrderForm;
}

export class CartButtonComponent extends React.Component<CartButtonProps, CartButtonState> {

    constructor(props: CartButtonProps) {
        super(props);
        this.state = {
            orderForm: null,
        };
    }

    public render() {
        const { orderForm } = this.state;
        return (
            [<button
                key={1}
                className={s.cartButton} onClick={() => {
                    window.dispatchEvent(new CustomEvent("active.minicart", { detail: true }));
                }}>
                <SVGInline className={s.cartIcon} svg={bag} />
                {orderForm && <span className={[s.number, `${(orderForm.items.length <= 0 ? " " : "customNumber")}`].join(" ")}>{orderForm.items.length <= 0  ? " " : orderForm.items.length} </span>}

            </button>,
            <MiniCartComponent key={2} handleUpdate={(_orderForm) => {
                this.setState({
                    orderForm: _orderForm,
                });
            }} />]
        );
    }
}
