import * as React from "react";
import s from "./Payments.scss";
import SVGInline from "react-svg-inline";
import AmericanExpress from "../../../../../../assets/icons/american-express.svg";
import Discovery from "../../../../../../assets/icons/discover.svg";
import Boleto from "../../../../../../assets/icons/boletao.svg";
import Visa from "../../../../../../assets/icons/visa.svg";
import MasterCard from "../../../../../../assets/icons/master.svg";
import Dinners from "../../../../../../assets/icons/diners-club.svg";
import Elo from "../../../../../../assets/icons/elo.svg";


export interface PaymentsProps { }

export interface PaymentsState { }

export class PaymentsFooterComponent extends React.Component<PaymentsState, PaymentsProps> {

    constructor(props: PaymentsProps) {
        super(props);
    }

    public render() {
        return (
            <div className={s.paymentsContent}>
                <div className={s.boxPayments}>
                    <span className={s.boxTitle}>como pagar</span>
                    <div className={s.boxItem}>
                        <SVGInline className={s.iconVisa} svg={Visa} />
                        <SVGInline className={s.iconMasterCard} svg={MasterCard} />
                        <SVGInline className={s.iconAmericanExpress} svg={AmericanExpress} />
                        <SVGInline className={s.iconElo} svg={Elo} />
                        <SVGInline className={s.iconDinner} svg={Dinners} />
                        <SVGInline className={s.iconDiscovery} svg={Discovery} />
                        <SVGInline className={s.iconBoleto} svg={Boleto} />
                    </div>
                </div>
            </div>
        );
    }
}