import * as React from "react";
import s from "./LoginButtonMobile.scss";
import SVGInline from "react-svg-inline";
import login from "../../../../../../assets/icons/login.svg";
import dataUser from "../../../../services/data-user";
import { UserModel } from "../../../../models/user.model";

export interface LoginButtonMobileProps {
}

export interface LoginButtonMobileState {
    user: UserModel;
}

export class LoginButtonMobileComponent extends React.Component<LoginButtonMobileProps, LoginButtonMobileState> {

    constructor(props: LoginButtonMobileProps) {
        super(props);
        this.state = {
            user: null,
        };
    }

    public async componentDidMount() {
        const user = await dataUser.getCurrentUser();
        this.setState({
            user,
        });
    }

    public render() {
        return (
            <a
                onClick={(event) => {
                    if (!this.state.user || !this.state.user.IsUserDefined) {
                        event.preventDefault();
                        vtexid.start();
                    }
                }}
                href={"/account"} className={s.loginButton}>
                <SVGInline className={s.login} svg={login} />
            </a>
        );
    }
}
