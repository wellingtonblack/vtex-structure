import * as React from "react";
import s from "./LoginBox.scss";
import SVGInline from "react-svg-inline";
import { UserModel, User } from "../../../../../../models/user.model";
import entrar from "../../../../../../../../assets/icons/entrar.svg";
import cadastrar from "../../../../../../../../assets/icons/cadastrar.svg";

import meucadastro from "../../../../../../../../assets/icons/meu-cadastro.svg";
import meuendereco from "../../../../../../../../assets/icons/meu-endereco.svg";
import meuspedidos from "../../../../../../../../assets/icons/meus-pedidos.svg";
import meuclube from "../../../../../../../../assets/icons/meu-clube.svg";

export interface LoginBoxProps {
    user: UserModel;
    userProfile: User;
    className?: string;
    onMouseEnter(): void;
    onMouseLeave(): void;
}

export interface LoginBoxState {

}

export class LoginBoxComponent extends React.Component<LoginBoxProps, LoginBoxState> {

    constructor(props: LoginBoxProps) {
        super(props);

    }

    public login = () => {
        vtexid.start({
            returnUrl: "/",
            userEmail: "",
            locale: "pt-BR",
            forceReload: false,
        });
    }

    public prevent = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const { user } = this.props;
        if (!user || !user.IsUserDefined) {
            this.login();
            e.preventDefault();
            e.stopPropagation();
            return;
        }
    }

    public render() {
        const { user, userProfile } = this.props;
        return (
            [<div
                key={1}
                onMouseEnter={this.props.onMouseEnter}
                // onMouseLeave={this.props.onMouseLeave}
                className={[s.boxLogin, this.props.className, user && user.IsUserDefined ? s.logged : ""].join(" ")}>
                {!user.IsUserDefined && <ul className={[s.list, s.first].join(" ")}>
                    <li onClick={this.login}>
                        <a className={s.link}><SVGInline className={s.icon} svg={entrar} /><span>entrar</span></a>
                    </li>
                    <li>
                        <a className={s.link} href={"/account"}><SVGInline className={s.icon} svg={cadastrar} /><span>cadastrar</span></a>
                        <div className={s.label}>não tem cadastro em nossa
                        loja? qual tal se juntar e
                        ganhar descontos?</div>
                    </li>
                </ul>}

                {user.IsUserDefined && <div className={s.imageWrapper}>
                    <div
                        className={s.image}
                        style={{ backgroundImage: `url(/api/dataentities/CL/documents/${userProfile.id}/profileImage/attachments/${userProfile.profileImage}` }}>
                    </div>
                    <h2 className={s.title}><span>olá,</span><span className={s.name}>{userProfile.firstName}</span><span>o que deseja fazer?</span></h2>
                </div>}

                <ul className={[s.list, s.second].join(" ")}>
                    <li>
                        <a onClick={this.prevent} href={"/account#about"} className={s.link}><SVGInline className={[s.icon, s.meucadastro].join(" ")} svg={meucadastro} /><span>meu cadastro</span></a>
                    </li>
                    <li>
                        <a onClick={this.prevent} className={s.link} href={"/account#address"}><SVGInline className={[s.icon, s.meuendereco].join(" ")} svg={meuendereco} /><span>meu endereço</span></a>

                    </li>
                    <li>
                        <a onClick={this.prevent} href={"/account#orders"} className={s.link}><SVGInline className={[s.icon, s.meuspedidos].join(" ")} svg={meuspedidos} /><span>meus pedidos</span></a>

                    </li>
                    <li>
                        <a onClick={this.prevent} className={s.link} href={"/_secure/account"}><SVGInline className={[s.icon, s.meuclube].join(" ")} svg={meuclube} /><span>meu clube</span></a>
                        <div className={s.label}>veja aqui seus pontos.
                        quanto você pode ter de
                        descontos, e muito mais.</div>
                    </li>
                </ul>

                {user.IsUserDefined && <ul className={[s.list, s.logged].join(" ")}>
                    <li onClick={this.login}>
                        <a href={"/logout"} className={s.link}><SVGInline className={s.icon} svg={entrar} /><span>sair</span></a>
                    </li>
                </ul>}

            </div>,
            <div
                key={2} 
                onClick={() => {
                    this.props.onMouseLeave();
                }} className={s.mask}></div>]
        );
    }
}
