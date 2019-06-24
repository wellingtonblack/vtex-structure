import * as React from "react";
import s from "./Cupom.scss";
import SVGInline from "react-svg-inline";
import arrow from "../../../../../../assets/icons/checkout-bottom-arrow.svg";
import { OrderForm } from "../../../../../../../common/models/orderform.model";
import dataCheckout from "../../../../../../../common/services/data-checkout";

type CupomProps = {
    orderForm: OrderForm;
};

interface CupomState {
    showForm: boolean;
    cupom: string;
    disable: boolean;
}

export class CupomComponent extends React.Component<CupomProps, CupomState> {

    constructor(props: any) {
        super(props);
        this.state = {
            showForm: false,
            cupom: "",
            disable: false,
        };
    }

    public componentDidMount() {

    }

    public onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            cupom: e.target.value,
        });
    }

    public sendForm = async (e: any) => {
        e.preventDefault();
        this.setState({
            disable: true,
        }, async () => {
            const orderForm = await dataCheckout.setCupom(this.state.cupom);
            this.setState({
                disable: false,
            });
            window.checkout.update();
        });
    }

    public render() {
        const { showForm, disable, cupom } = this.state;
        return (
            !showForm ? <div onClick={() => {
                this.setState({
                    showForm: true,
                });
            }} className={s.label}> adicionar cupom de desconto <SVGInline className={s.icon} svg={arrow} /></div> :
                <div className={s.wrapperForm}>
                    <form
                        className={s.form}
                        onSubmit={this.sendForm}>
                        <input
                            type="text"
                            placeholder="seu cupom"
                            className={s.input}
                            onChange={this.onChange}
                            disabled={disable}
                            value={cupom} />
                        {disable && <i className="loading-text icon-spinner icon-spin">
                            <span data-i18n="cart.wait">Por favor, aguarde...</span>
                        </i>}
                        <button type="submit">aplicar</button>
                    </form>
                    <span onClick={() => {
                        this.setState({
                            showForm: false,
                        });
                    }} className={s.close}>X</span>
                </div>
        );
    }
}


