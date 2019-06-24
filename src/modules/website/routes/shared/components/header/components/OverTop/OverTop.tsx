import * as React from "react";
import s from "./OverTop.scss";
import SVGInline from "react-svg-inline";
import loop from "../../../../../../assets/icons/looping-arrows.svg";

export interface OverTopProps {
    className?: string;
}


export interface OverTopState {
}

export class OverTopComponent extends React.Component<OverTopProps, OverTopState> {

    constructor(props: OverTopProps) {
        super(props);
    }

    public render() {
        return (
            <section className={[s.overTopWrapper, this.props.className].join(" ")}>
                <div className={s.wrapper}>
                    
                </div>
            </section>
        );
    }
}
