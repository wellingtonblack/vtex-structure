import React from "react";
import s from "./Checkbox.scss";


export interface CheckboxButtonProps {
    value: any;
    status: boolean;
    filterName: string;
    specificationName: string;
    color?: string;
    handleCheck?(value: string, status: boolean): void;
}

export interface CheckboxButtonState {
    status: boolean;
}

export class CheckboxButton extends React.Component<CheckboxButtonProps, CheckboxButtonState> {

    constructor(props: CheckboxButtonProps) {
        super(props);
        this.handleCheck = this.handleCheck.bind(this);
    }

    public handleCheck() {
        this.props.handleCheck(this.props.value, this.props.status);
    }

    public render() {
        return (
            <div className={[s.checkboxButton, this.props.filterName].join(" ")}>
                <span
                    style={{backgroundColor: this.props.color && this.props.color}}
                    className={[(this.props.status) ? s.active : s.inactive, this.props.filterName, this.props.specificationName, s.checkbox].join(" ")}
                    onClick={this.handleCheck}>
                </span>
                <span  className={[s.chilldren, (this.props.status) ? s.active : s.inactive].join(" ")} onClick={this.handleCheck}>
                    {this.props.children}
                </span>
            </div>
        );
    }
}