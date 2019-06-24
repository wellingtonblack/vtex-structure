import * as React from "react";
import s from "./Flag.scss";
import utilsService from "../../services/utils-service";

export interface FlagProps {
    flags: any;
    className?: string;
}

export interface FlagState {

}

export class FlagComponent extends React.Component<FlagProps, FlagState> {

    constructor(props: FlagProps) {
        super(props);
    }

    public getFlag(flag: string, index: number) {

        switch (this.props.flags[flag].toLowerCase()) {
            case "todos":
                return false;
                break;
            case "eletronicos":
                return false;
                break;
            default:
                return <div key={index} className={`flag ${flag}`}>
                    <span>{utilsService.truncate(this.props.flags[flag], 2, "")}</span>
                </div>;
                break;
        }
    }

    public render() {

        return (
            <div className={[s.flag, this.props.className].join(" ")}>
                {Object.keys(this.props.flags).map((flag, index) => index === 0 && this.getFlag(flag, index))}
                {this.props.children}
            </div>
        );
    }
}
