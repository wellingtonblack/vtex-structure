import * as React from "react";
import s from "./Steps.scss";
import SVGInline from "react-svg-inline";
import lets from "../../../../../../assets/icons/lets-encrypt.svg";
import back from "../../../../../../assets/icons/arrow-back-checkout.svg";

type StepsProps = {
    step: string;
};



export function Steps(props: StepsProps) {

    return (
        <div className={s.container}>

            <ul className={s.list}>
                <li>
                    <button 
                        onClick={() => {
                            window.history.back();
                        }}
                        className={s.backMobile}>
                        <SVGInline className={s.backIcon} svg={back} />
                    </button>
                </li>
                <li className={[s.item, props.step === "#/cart" ? s.active : ""].join(" ")}>
                    <small>meu</small>
                    <span>carrinho<span className={s.dot}>.</span></span>
                </li>
                <li className={[s.item, props.step === "#/payment" || props.step === "#/shipping" || props.step === "#/profile" ? s.active : ""].join(" ")}>
                    <small>finalizar</small>
                    <span>pedido<span className={s.dot}>.</span></span>
                </li>
                <li className={[s.item, props.step === "" ? s.active : ""].join(" ")}>
                    <small>pedido</small>
                    <span>realizado<span className={s.dot}>.</span></span>
                </li>
            </ul>
            <div className={s.selo}>
                <span className={s.label}>ambiente<br />seguro</span>
                <SVGInline className={s.icon} svg={lets} />
            </div>
        </div>
    );

}


