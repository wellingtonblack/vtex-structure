import * as React from "react";
import s from "./WarnMe.scss";
import formValidate from "../../services/form-validate";
import dataProduct from "../../services/data-product";
import { Item } from "../../../../../common/models/product.model";

export interface WarnMeProps {
    item: Item;
}

export interface WarnMeState {
    email: string;
    emailValid: boolean;
    emailChange: boolean;
    name: string;
    nameValid: boolean;
    nameChange: boolean;
    formSubmit: boolean;
    success: boolean;
    messageSuccess: any;
}

export class WarnMeComponent extends React.Component<WarnMeProps, WarnMeState> {

    constructor(props: WarnMeProps) {
        super(props);
        this.state = {
            email: null,
            emailValid: false,
            emailChange: false,
            name: null,
            nameValid: false,
            nameChange: false,
            formSubmit: false,
            success: false,
            messageSuccess: <div>
                <h2 className={s.title}>Avise-me</h2>
                <p className={s.subtitle}>para ser avisado da disponibilidade deste produto basta preencher os campos abaixo:</p>
            </div>,
        };
    }

    public render() {

        const { item } = this.props;
        const { email, emailValid, emailChange, name, nameValid, nameChange, success, formSubmit, messageSuccess } = this.state;

        return (
            <div className={s.WarnMe}>

                {messageSuccess}

                <form action="" className={s.form} onSubmit={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    if (emailValid && nameValid) {
                        try {
                            window.loading(true);

                            const data = await dataProduct.setAviseMe(item.itemId.toString(), email, name);

                            if (data) {
                                this.setState({
                                    email: "",
                                    name: "",
                                    success: true,
                                    messageSuccess: <div>
                                        <h2 className={s.title}>Avise-me</h2>
                                        <h3 className={s.sucess}>Cadastro com sucesso!</h3>
                                        <p className={s.subtitle}>assim que o produto for disponibilizado você receberá um email avisando</p>
                                    </div>,
                                });
                            }
                            window.loading(false);
                        } catch (error) {
                            alert("houve algum erro :(, tente novamente!");
                            window.loading(false);
                        }
                    } else {
                        this.setState({
                            formSubmit: true,
                            messageSuccess: <div className={s.sucess}>
                                <h2 className={s.title}>Avise-me</h2>
                                <p className={s.subtitle}>informações inválidas.</p>
                            </div>,
                        });
                    }
                }}>
                    {(!success) ? <div>
                        <div className={s.box}>
                            <div className={[s.nome].join(" ")}>
                                <input placeholder={"nome"} className={[s.field, !nameValid && formSubmit && s.inavalid].join(" ")} type="text" value={name} onChange={(e) => {
                                    const _name = e.target.value;
                                    this.setState({
                                        name: _name,
                                        nameChange: true,
                                        nameValid: !formValidate.isEmpty(_name),
                                    });
                                }} />
                                {!nameValid && formSubmit && <label className={s.error}>nome inválido!</label>}
                            </div>
                            <div className={[s.email, !emailValid && formSubmit && s.inavalid].join(" ")}>
                                <input placeholder={"email"} className={[s.field, !emailValid && formSubmit && s.inavalid].join(" ")} type="email" value={email} onChange={(e) => {
                                    const _email = e.target.value;
                                    this.setState({
                                        email: _email,
                                        emailChange: true,
                                        emailValid: formValidate.emailIsValid(_email),
                                    });
                                }} />
                                {!emailValid && formSubmit && <label className={s.error}>email inválido!</label>}
                            </div>

                        </div>
                        <button className={s.button} type={"submit"}>Avise-me</button>
                    </div> : " "}
                </form>
            </div>
        );
    }
}
