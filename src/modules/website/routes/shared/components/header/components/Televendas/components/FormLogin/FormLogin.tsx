import * as React from "react";
import s from "./FormLogin.scss";
import { FormValidate } from "../../../../../../../../../common/models/form-validate.model";
import { Store } from "../../models/store";
import dataSellers from "../../services/data-sellers";
import dataStore from "../../services/data-store";
import utilsService from "../../../../../../services/utils-service";
import formValidate from "../../../../../../services/form-validate";
import { Seller } from "../../models/seller";


export interface Props {
    handleSeller(codseller: string, codstore: string): void;
    handleHide(): void;
}

export interface State extends FormValidate {
    codseller: string;
    codstore: string;
    stores: Store[];
    anonymousLogin: boolean;
}

export class FormLoginComponent extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            codseller: null,
            codstore: null,
            formErrors: {},
            formValid: false,
            isSubmit: false,
            disable: false,
            disableAll: false,
            stores: [],
            anonymousLogin: false,
        };
    }

    public async componentDidMount() {
        const stores = await dataStore.getStores();
        this.updateValidate();
        this.setState({
            stores,
        });
    }

    public updateValidate = () => {
        const keys = Object.keys(this.state);
        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            this.validateField(key, this.state[key]);
        }
    }

    public handleInputChange = (event: any, mask: any = null) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: mask ? mask(value) : value,
        }, () => { this.validateField(name, value); });
    }

    public createSession = (codvend: string, codloja: string, nomeloja: string, seller: any) => {
        utilsService.createCookie("codvend", codvend, 7);
        utilsService.createCookie("codloja", codloja, 7);
        utilsService.createCookie("nomeloja", nomeloja, 7);
        utilsService.createEncodeObjectFromCookie("seller", seller, 7);
    }

    public onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (this.state.formValid) {

            try {

                window.loading(true);
                const { codseller, codstore, stores } = this.state;
                const sellers: Seller[] = await dataSellers.getSeller(codseller);
                const store = stores.find((x) => x.codigoLoja === codstore);

                if (sellers.length === 0) {
                    throw Error("vendedor não encontrado!");
                }

                this.createSession(sellers[0].codigovendedora, store.codigoLoja, store.name, sellers[0]);

                this.props.handleSeller(sellers[0].codigovendedora, store.codigoLoja);

            } catch (error) {

                this.setState({
                    anonymousLogin: true,
                });

                console.warn(error);
            }

            window.loading(false);
        } else {
            alert("informações inválidas!");
        }
    }

    public validateForm = () => {

        const {
            codsellerValid,
            codstoreValid,

        } = this.state;

        this.setState({
            formValid: codsellerValid && codstoreValid,
        });
    }

    public validateField = (fieldName: string, value: string) => {
        this.setState(this.validate(fieldName, value), this.validateForm);
    }

    public validate = (fieldName: string, value: string): any => {
        const callback: any = {
            formErrors: {},
        };

        switch (fieldName) {

            case "codseller":
            case "codstore":
                if (formValidate.isEmpty(value)) {
                    callback[`${fieldName}Valid`] = false;
                    callback.formErrors[`${fieldName}Valid`] = "Campo obrigatório!";
                    return callback;
                } else {
                    callback[`${fieldName}Valid`] = true;
                }
            default:
                break;
        }

        return callback;
    }

    public getErrorLabel(field: string) {
        return !this.state[`${field}Valid`] ? <p className={s.errortext}>{this.state.formErrors[`${field}Valid`]}</p> : "";
    }

    public render() {

        const { stores, anonymousLogin } = this.state;

        return (
            <div className={s.modal}>
                <div className={s.wrapper}>
                    {!anonymousLogin && <form className={s.form} onSubmit={this.onSubmit}>
                        <div className={s.fieldset}>
                            <h2>Localizar vendedor(a)</h2>
                        </div>
                        <div className={s.fieldset}>
                            <input name="codseller" value={this.state.codseller} className={s.input} type="text" onChange={this.handleInputChange} placeholder={"Digite o código do vendedor(a)"} />
                            {this.getErrorLabel("codseller")}
                        </div>
                        <div className={s.fieldset}>
                            <select name="codstore" value={this.state.codstore} onChange={this.handleInputChange}>
                                <option value="">SELECIONE UMA LOJA</option>
                                {stores.map((store) => <option value={store.codigoLoja}>{store.name}</option>)}
                            </select>
                            {this.getErrorLabel("codstore")}
                        </div>
                        <div className={s.fieldset}>
                            <button type={"submit"}>Procurar</button>
                        </div>
                    </form>}
                    {anonymousLogin && <div className={s.anonymousLogin}>
                        <h2 className={s.title}>Este código não foi localizado, deseja continuar?</h2>
                        <div className={s.controls}>
                            <button onClick={async () => {
                                try {

                                    window.loading(true);
                                    const data = await dataSellers.setAnonymousSeller(this.state.codseller);
                                    this.createSession(data.codigovendedora, null, null, data);
                                    
                                    this.props.handleSeller(data.codigovendedora, null);

                                } catch (error) {

                                }
                                window.loading(false);
                            }} className={s.yes}>Sim</button>
                            <button onClick={this.props.handleHide} className={s.nope}>Não</button>
                        </div>
                    </div>}
                </div>
                <div className={s.mask}></div>
            </div>
        );
    }
}
