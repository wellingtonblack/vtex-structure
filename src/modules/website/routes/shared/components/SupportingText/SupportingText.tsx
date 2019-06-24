import * as React from "react";
import s from "./SupportingText.scss";
import SVGInline from "react-svg-inline";
import utilsService from "../../services/utils-service";

import arrow from "../../../../assets/icons/arrow-down-red.svg";

export interface SupportingTextProps {

}

export interface SupportingTextState {
    content: any;
    open: boolean;
}

declare const textsupoorting: any;
export class SupportingTextComponent extends React.Component<SupportingTextProps, SupportingTextState> {

    constructor(props: SupportingTextProps) {
        super(props);
        this.state = {
            content: textsupoorting,
            open: false,
        };
    }

    public render() {
        const { content, open } = this.state;
        return (
            <section className={s.supportingText}>
                <div className={s.wrapper}>
                    <h2 className={s.title}>{content.title}</h2>
                    <div className={s.truncateWrapper}>
                        <p className={s.text} dangerouslySetInnerHTML={{ __html: !open ? utilsService.truncate(content.text, 97, "...") : content.text }}></p>
                        <span className={s.wrapperIcon} onClick={() => {
                            this.setState({
                                open: !open,
                            });
                        }}><SVGInline className={[s.arrow, open ? s.active : s.inactive].join(" ")} svg={arrow}  /></span>
                    </div>
                </div>
            </section>
        );
    }
}
