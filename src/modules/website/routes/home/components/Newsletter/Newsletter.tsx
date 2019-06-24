import * as React from "react";
import s from "./Newsletter.scss";
import { FormValidate } from "../../../../../common/models/form-validate.model";
import dataUser from "../../../shared/services/data-user";
import formValidate from "../../../shared/services/form-validate";

export interface NewsletterProps {
}

export interface NewsletterState extends FormValidate {
    email: string;
    emailValid?: boolean;
}

export class NewsletterComponent extends React.Component<NewsletterProps, NewsletterState> {

    constructor(props: NewsletterProps) {
        super(props);
        this.state = {
            email: "",
            formErrors: {},
            formValid: false,
            isSubmit: false,
        };
    }


    public componentDidMount() {
        this.callValidate();
    }

    public callValidate = () => {
        const keys = Object.keys(this.state);
        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            this.validateField(key, this.state[key]);
        }
    }

    // tslint:disable-next-line:no-shadowed-variable
    public handleInputChange = (event: any, mask: any = null) => {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: mask ? mask(value) : value,
        }, () => { this.validateField(name, value); });
    }

    public validateForm = () => {
        const {
            emailValid,
        } = this.state;

        const formValid = emailValid;
        this.setState({
            formValid,
        });
    }

    public validateField = (fieldName: string, value: string) => {
        this.setState(this.validate(fieldName, value), this.validateForm);
    }

    public validate = (fieldName: string, value: string): any => {
        const callback: any = {
            formErrors: this.state.formErrors,
        };

        switch (fieldName) {
            case "email":
                if (formValidate.isEmpty(value)) {
                    callback[`${fieldName}Valid`] = false;
                    callback.formErrors[`${fieldName}Valid`] = "preencha com seu email!";
                    return callback;
                } else {
                    callback[`${fieldName}Valid`] = true;
                }
            default:
                break;
        }
        switch (fieldName) {
            case "email":
                if (!formValidate.emailIsValid(value)) {
                    callback[`${fieldName}Valid`] = false;
                    callback.formErrors[`${fieldName}Valid`] = "email inválido!";
                    return callback;
                } else {
                    callback[`${fieldName}Valid`] = true;
                }
            default:
                break;
        }

        callback.formErrors[`${fieldName}Valid`] = "";
        return callback;
    }

    public getErrorLabel(field: string) {
        return this.state.isSubmit && this.state[`${field}Valid`] === false ? <p className={s.errortext}>{this.state.formErrors[`${field}Valid`]}</p> : "";
    }


    public onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        this.setState({
            isSubmit: true,
        }, async () => {
            if (this.state.formValid) {
                const {
                    email,
                } = this.state;

                const data = {
                    newsletterClientName: "",
                    newsletterClientEmail: email,
                    newsInternalPage: "_",
                    newsInternalPart: "newsletter",
                    newsInternalCampaign: "newsletter%3Aopt-in",
                };

                try {
                    window.loading(true);
                    await dataUser.subscribeNews(data);
                } catch (error) {
                    alert("ops :( deu algum erro!");
                }
                window.loading(false);
            }
        });
    }


    public render() {
        return (
            <section className={s.newsletter}>
                <div className={s.wrapper}>
                    <div className={s.wrapperForm}>
                        <h2 className={s.title}>newsletter</h2>
                        <h3 className={s.subtitle}>Cadastre seu e-mail e fique por dentro das
                        novidades e tendências Aramis.
                        </h3>
                        <form className={s.formNews} action="" onSubmit={this.onSubmit}>
                            <div className={s.inputField}>
                                <input className={s.styleInput} placeholder={"Cadastre seu email"} type="text" name="email" onChange={this.handleInputChange} />
                                {this.getErrorLabel("email")}
                                {(this.state.isSubmit) ? <div className={s.success}> Obrigado, em breve entraremos em contato</div> : ""}
                            </div>
                            <button className={s.send}>cadastrar</button>
                        </form>

                    </div>
                </div>
            </section>
        );
    }
}
