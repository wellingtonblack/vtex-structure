import * as React from "react";
import s from "./Header.scss";
import SVGInline from "react-svg-inline";
import logo from "../../../../assets/icons/checkout-logo.svg";
import { Steps } from "./components/Steps/Steps";

type HeaderProps = {
    step: string;
};

interface HeaderState {
    step: string;
}


export class HeaderComponent extends React.Component<HeaderProps, HeaderState> {

    constructor(props: any) {
        super(props);

        this.state = {
            step: this.props.step,
        };
    }

    public componentDidMount() {
    }

    public setStep(step: string) {
        this.setState({
            step,
        });
    }

    public render() {
        return (
            <div className={s.container}>
                <div className={s.wrapper}>
                    <SVGInline className={s.logoIcon} svg={logo} />
                    <Steps step={this.state.step} />
                </div>
            </div>
        );
    }
}


