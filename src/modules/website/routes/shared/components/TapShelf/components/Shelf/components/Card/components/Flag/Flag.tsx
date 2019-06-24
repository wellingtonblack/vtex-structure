import * as React from "react";
import s from "./Flag.scss";
import utilsService from "../../../../../../../../../shared/services/utils-service";

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

    public render() {

        return (
            <div className={[s.flag, this.props.className].join(" ")}>
                {Object.keys(this.props.flags).map((flag, index) => index === 0 && <div key={index} className={`flag ${flag}`}>                    
                    <span>{utilsService.truncate(this.props.flags[flag], 2, "")}</span>
                </div>)}
                {this.props.children}
            </div>
        );
    }
}
