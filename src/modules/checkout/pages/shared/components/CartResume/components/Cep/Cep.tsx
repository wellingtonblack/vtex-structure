import * as React from "react";
import { Frete } from "../../../../../../../website/routes/shared/models/frete.model";
import { OrderForm } from "../../../../../../../common/models/orderform.model";
import s from "./Cep.scss";


type CepProps = {
    handleCep(frete: Frete): void;
};

export interface CepState {
    cep: string;
    disable: boolean;
}

export class CepComponent extends React.Component<CepProps, CepState> {

    public form: any = null;

    constructor(props: any) {
        super(props);
        this.state = {
            cep: "",
            disable: false,
        };
    }

    public componentDidMount() {
        this.update();
    }

    public async update() {
        await this.searchCep();
        this.getFreteValue();
    }

    public getFreteValue = async () => {


        const orderForm: OrderForm = vtexjs.checkout.orderForm;

        const state = orderForm.shippingData && orderForm.shippingData.address && orderForm.shippingData.address.state;
    }

    public searchCep = async () => {
        let orderForm: OrderForm = vtexjs.checkout.orderForm;

        if (!orderForm) {
            orderForm = await vtexjs.checkout.getOrderForm();
        }

        const address = orderForm && orderForm.shippingData && orderForm.shippingData.address;

        if (address && address.postalCode) {
            this.setState({
                cep: address.postalCode,
            });
        }
    }

    public onChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({
            cep: this.mCEP(e.target.value),
        }, () => {
            if (this.state.cep.length >= 9) {
                this.setState({
                    disable: true,
                }, () => {
                    this.form.click();
                });
            }
        });
    }

    public mCEP(cpf: string): string {
        cpf = cpf.replace(/\D/g, "");
        cpf = cpf.replace(/(\d{5})(\d)/, "$1-$2");
        return cpf;
    }

    public sendForm = async (e: any) => {
        e.preventDefault();

        const postalCode = this.state.cep;
        const country = "BRA";
        const address = {
            postalCode,
            country,
        };

        try {

            const ordrForm = await vtexjs.checkout.calculateShipping(address);

            this.setState({
                disable: false,
            });

            this.getFreteValue();

        } catch (error) {
            this.setState({
                disable: false,
            });
        }
    }

    public render() {

        const { cep, disable } = this.state;

        const link = <a
            href={"http://www.buscacep.correios.com.br/sistemas/buscacep/default.cfm"}
            target="_blank"
            className={s.subtitle}>não sei meu cep</a>;

        return (
            <div className={s.form}>
                <div className={s.freteLabel}>
                    cálculo do frete:
                </div>
                <div>
                    <form
                        onSubmit={this.sendForm}
                    >
                        <input
                            type="text"
                            placeholder="seu cep"
                            className={s.input}
                            onChange={this.onChange}
                            disabled={disable}
                            value={cep} />
                        <button
                            ref={(ref) => { this.form = ref; }}
                            style={{ display: "none" }}
                            type="submit"></button>
                        {disable && <i className="loading-text icon-spinner icon-spin">
                            <span data-i18n="cart.wait">Por favor, aguarde...</span>
                        </i>}
                        {link}
                    </form>
                </div>
            </div>
        );
    }
}


