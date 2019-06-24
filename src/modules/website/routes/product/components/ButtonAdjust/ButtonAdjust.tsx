import s from "./ButtonAdjust.scss";
import React from "react";
import { ModalPointsComponent } from "./component/modal-points/modal-points";
import "./ButtonAdjust.scss";
import { CustomInfos } from "./component/models/infos";

export interface ButtonAdjustsProps {
    items: CustomInfos;
}

export interface ButtonAdjustsState {

}

export class ButtonAdjustsComponent extends React.Component<ButtonAdjustsProps, ButtonAdjustsState> {


    constructor(props: ButtonAdjustsProps) {
        super(props);
    }

    public render() {

        return (
            <div className={s.containerButton}>
                <button className={s.button}
                    onClick={() => {
                        window.dispatchEvent(new Event("modal-points.open"));
                    }}> <img src="/arquivos/icon-button-adjust.png" alt="onde ajustar?" /> onde ajustar?</button>
                <ModalPointsComponent content={this.props.items} />
            </div>
        );
    }
}


