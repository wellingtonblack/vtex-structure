import * as React from "react";
import s from "./FreteBar.scss";
import utilsService from "../../../website/routes/shared/services/utils-service";

export interface FreteBarProps {
    buyValue: number;
    freteValue: number;
    state: string;
    className?: string;
}

export interface FreteBarState {
}

export class FreteBarComponent extends React.Component<FreteBarProps, FreteBarState> {

    public form: any = null;

    constructor(props: any) {
        super(props);
        this.state = {
            FreteBar: null,
            disable: false,
        };
    }


    public render() {

        const { state, freteValue, buyValue, className } = this.props;

        const percentage = Math.round((buyValue * 100) / freteValue);

        return (
            <div className={[s.freteBar, className].join(" ")}>
                <div style={{ width: `${percentage}%` }} className={s.progress}></div>
                <div className={s.text}>
                    {percentage < 100 && <div className={s.textFrete}>
                        <span className={s.label}>grátis para {state}</span> faltam <span>r$ {utilsService.parseMoney(freteValue - buyValue)} / r$ {utilsService.parseMoney(freteValue)}</span>
                    </div>}
                    {percentage >= 100 && <div className={s.winfrete}>
                        <span>frete grátis.</span>
                    </div>} 
                </div>
            </div>
        );
    }
}


