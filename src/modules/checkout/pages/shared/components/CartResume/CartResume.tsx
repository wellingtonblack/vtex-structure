import * as React from "react";
import s from "./CartResume.scss";
import { OrderForm } from "../../../../../common/models/orderform.model";
import { CepComponent } from "./components/Cep/Cep";
import { Totalizer } from "./components/Totalizer/Totalizer";
import { Frete } from "../../../../../website/routes/shared/models/frete.model";
import { FreteBarComponent } from "../../../../../common/components/FreteBar/FreteBar";
import utilsService from "../../../../../website/routes/shared/services/utils-service";


type CartResumeProps = {

};

interface CartResumeState {
    orderForm: OrderForm;
    frete: Frete;
    showResume: boolean;
}


export class CartResumeComponent extends React.Component<CartResumeProps, CartResumeState> {

    constructor(props: any) {
        super(props);

        this.state = {
            orderForm: null,
            frete: null,
            showResume: false,
        };
    }

    public componentDidMount() {
        this.update();
    }

    public update() {
        this.setState({
            orderForm: vtexjs.checkout.orderForm,
        });
    }

    public render() {
        const { orderForm, frete, showResume } = this.state;

        let itemsTotal: any =
            orderForm &&
            orderForm.totalizers &&
            orderForm.totalizers.length > 0 &&
            orderForm.totalizers.find((total) => total.id === "Items");

        const shippingTotal: any =
            orderForm &&
            orderForm.totalizers &&
            orderForm.totalizers.length > 0 &&
            orderForm.totalizers.find((total) => total.id === "Shipping");

        itemsTotal = itemsTotal && itemsTotal.value / 100;

        const itemsShippningTotal = shippingTotal && (itemsTotal + (shippingTotal.value / 100)) || itemsTotal;
        const itemsShippningTotalFormated = itemsShippningTotal && utilsService.parseMoney(itemsShippningTotal);
        
        return (
            [
                orderForm && <div className={[s.cartResume, showResume ? s.show : s.hide].join(" ")}>
                    <div>
                        <CepComponent handleCep={(_frete: Frete) => {
                            window.dispatchEvent(new Event("update.cep"));
                            this.setState({
                                frete: _frete,
                            });
                        }} />

                        {frete && <FreteBarComponent
                            className={s.freteBar}
                            freteValue={frete.Frete}
                            buyValue={itemsTotal}
                            state={frete.State} />}
                        <Totalizer orderForm={orderForm} />
                    </div>
                    <div className={s.target}>
                        <a className={s.link} href="#/orderForm">continuar compra</a>
                    </div>
                    <button onClick={() => {
                        this.setState({
                            showResume: false,
                        });
                    }} className={s.targetResume}>exibir produtos<span>.</span></button>
                </div>,
                <div className={s.resume}>
                    <div className={s.totalizer}>
                        <div className={s.label}>total: </div>
                        <div className={s.value}>r$ {itemsShippningTotalFormated}</div>
                    </div>
                    <div className={s.target}>
                        <a className={s.link} href="#/orderForm">continuar compra</a>
                    </div>
                    <button onClick={() => {
                        this.setState({
                            showResume: true,
                        });
                    }} className={s.targetResume}>exibir valores estimado<span>.</span></button>
                </div>,
            ]
        );
    }
}


