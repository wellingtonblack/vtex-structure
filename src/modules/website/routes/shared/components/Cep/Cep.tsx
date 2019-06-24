import * as React from "react";
import s from "./Cep.scss";
import { OrderForm } from "../../../../../common/models/orderform.model";
import { Frete } from "../../models/frete.model";

export enum CepStyle {
    STYLE1 = 1,
    STYLE2 = 2,
}

type CepProps = {
    handleCep(frete: Frete): void;
} & Partial<DefaultProps>;

export interface CepState {
    cep: string;
    disable: boolean;
}

type DefaultProps = Readonly<typeof defaultProps>;

const defaultProps = {
    style: CepStyle.STYLE1,
};

export class CepComponent extends React.Component<CepProps, CepState> {

    public static defaultProps = defaultProps;

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

        window.dispatchEvent(new CustomEvent("update.minicart"));
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

    public getStyle = () => {
        switch (this.props.style) {
            case CepStyle.STYLE1:
                return s.style1;
            case CepStyle.STYLE2:
                return s.style2;
            default:
                break;
        }
    }

    public render() {
        const { cep } = this.state;
        const link = <a
            href={"http://www.buscacep.correios.com.br/sistemas/buscacep/default.cfm"}
            target="_blank"
            className={s.subtitle}>não sei meu cep</a>;

        return (
            <div className={[s.cep, this.getStyle()].join(" ")}>
                <div className={s.wrapperCep}>
                    <div className={s.boxtext}>
                        <h2 className={s.title}>calcular frete</h2>
                        {this.props.style === CepStyle.STYLE1 && link}
                    </div>
                    <div className={s.form}>
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();

                                const postalCode = this.state.cep;
                                const country = "BRA";
                                const address = {
                                    postalCode,
                                    country,
                                };

                                try {
                                    window.loading(true);
                                    const ordrForm = await vtexjs.checkout.calculateShipping(address);
                                    window.loading(false);
                                    this.setState({
                                        disable: false,
                                    });

                                    this.getFreteValue();

                                } catch (error) {
                                    this.setState({
                                        disable: false,
                                    });
                                    window.loading(false);
                                }

                            }}
                        >
                            <input
                                type="text"
                                placeholder="seu cep"
                                className={s.input}
                                onChange={this.onChange}
                                disabled={this.state.disable}
                                value={cep} />
                            <button
                                ref={(ref) => { this.form = ref; }}
                                style={{ display: "none" }}
                                type="submit"></button>
                        </form>
                    </div>
                    {this.props.style === CepStyle.STYLE2 && <div className={s.boxtext}>
                        {link}
                    </div>}
                </div>
            </div>
        );
    }
}


