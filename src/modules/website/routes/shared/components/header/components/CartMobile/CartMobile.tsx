import * as React from "react";
import s from "./CartMobile.scss";
import SVGInline from "react-svg-inline";
import cart from "../../../../../../assets/icons/cart.svg";
import { MiniCartComponent } from "../MiniCart/MiniCart";
import { OrderForm } from "../../../../../../../common/models/orderform.model";

export interface CartMobileProps {
    handle(state: boolean): void;
}

export interface CartMobileState {
    orderForm: OrderForm;
}

export class CartMobileComponent extends React.Component<CartMobileProps, CartMobileState> {

    constructor(props: CartMobileProps) {
        super(props);

        this.state = {
            orderForm: null,
        };
    }

    public render() {
        const { orderForm } = this.state;
        return (
            [<button className={s.cartMobile} onClick={() => {
                window.dispatchEvent(new CustomEvent("active.minicart", { detail: true }));
            }}>
                <SVGInline className={s.cartIcon} svg={cart} />
                {orderForm && <span className={s.number}>{orderForm.items.length < 10 ? `0${orderForm.items.length}` : orderForm.items.length}</span>}
            </button>,
            <MiniCartComponent
                key={2}
                handleIsShow={(state: boolean) => {
                    this.props.handle(state);
                }}
                handleUpdate={(_orderForm) => {
                    this.setState({
                        orderForm: _orderForm,
                    });
                }} />]
        );
    }
}
