import * as React from "react";
import s from "./LoginButton.scss";
import SVGInline from "react-svg-inline";
import arrow from "../../../../../../assets/icons/arrow-bottom-red.svg";
import login from "../../../../../../assets/icons/login.svg";
import dataUser from "../../../../services/data-user";
import { UserModel, User } from "../../../../models/user.model";
import { LoginBoxComponent } from "./components/LoginBox/LoginBox";


export interface LoginButtonProps {
}

export interface LoginButtonState {
    user: UserModel;
    userProfile: User;
    hover: boolean;
    hover2: boolean;
}

export class LoginButtonComponent extends React.Component<LoginButtonProps, LoginButtonState> {

    constructor(props: LoginButtonProps) {
        super(props);
        this.state = {
            user: null,
            userProfile: null,
            hover: false,
            hover2: false,
        };
    }

    public async componentDidMount() {
        const user = await dataUser.getCurrentUser();
        let userProfile = null;
        if (user.IsUserDefined) {
            userProfile = await dataUser.getGetUserByEmail(user.Email);
        }
        this.setState({
            user,
            userProfile,
            // hover: true,
            // hover2: true,
        });
    }

    public render() {
        return (
            <button>
                
            </button>
        );
    }
}
