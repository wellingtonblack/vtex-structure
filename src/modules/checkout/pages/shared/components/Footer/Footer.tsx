import * as React from "react";
import s from "./Footer.scss";
import SVGInline from "react-svg-inline";
import visa from "../../../../assets/icons/Visa.svg";
import mastercard from "../../../../assets/icons/mastercard.svg";
import american from "../../../../assets/icons/american.svg";
import hipercard from "../../../../assets/icons/hipercard.svg";
import elo from "../../../../assets/icons/elo.svg";
import boleto from "../../../../assets/icons/boleto.svg";
import transferencia from "../../../../assets/icons/transferencia.svg";


import selopci from "../../../../assets/icons/selo-pci.svg";
import selolojaconfiavel from "../../../../assets/icons/selo-loja-confiavel.svg";
import seloablec from "../../../../assets/icons/selo_ablec.svg";
import telephone from "../../../../assets/icons/telephone.svg";
import paperplane from "../../../../assets/icons/paper-plane.svg"; 
type FooterProps = {
};

interface FooterState {
}


export class FooterComponent extends React.Component<FooterProps, FooterState> {

    constructor(props: any) {
        super(props);

    }

    public componentDidMount() {
    }

    public render() {
        return (
            <div className={s.container}>
                <div className={s.wrapper}>
                    <div className={s.first}>
                        <div className={s.parcels}><span className={s.featured}>8x</span> sem juros nos cartões:</div>
                        <div className={s.iconsCard}>
                            <ul className={s.listOfPayments}>
                                <li className={[s.visa, s.item].join(" ")}><SVGInline className={[s.icon].join("")} svg={visa} /></li>
                                <li className={[s.mastercard, s.item].join(" ")}><SVGInline className={[s.icon].join("")} svg={mastercard} /></li>
                                <li className={[s.american, s.item].join(" ")}><SVGInline className={[s.icon].join("")} svg={american} /></li>
                                <li className={[s.hipercard, s.item].join(" ")}><SVGInline className={[s.icon].join("")} svg={hipercard} /></li>
                                <li className={[s.elo, s.item].join(" ")}><SVGInline className={[s.icon].join("")} svg={elo} /></li>
                            </ul>
                        </div>
                        <div className={s.percentage}>
                            <span className={s.featured}>ganhe 10% off</span> no boleto ou debito a vísta
                        </div>
                        <div className={s.othersPayment}>
                            <ul className={s.listOfPayments}>
                                <li className={[s.boleto, s.item].join(" ")}><SVGInline className={[s.icon].join("")} svg={boleto} /></li>
                                <li className={[s.transferencia, s.item].join(" ")}><SVGInline className={[s.icon].join("")} svg={transferencia} /></li>
                            </ul>
                        </div>
                    </div>
                    <div className={s.second}>
                        <div className={s.contacts}>
                            <div className={s.contactWrapper}>
                                <div className={s.iconWrapper}>
                                    <SVGInline className={[s.iconPhone].join("")} svg={telephone} />
                                </div>
                                <div className={s.phone}>
                                    <div className={s.label}>televendas ou se precisar de ajuda:</div>
                                    <div className={s.phoneNumber}><a href="phone:+551129249054">11 2924-9054</a></div>
                                </div>
                            </div>

                            <div className={s.contactWrapper}>
                                <div className={s.iconWrapper}>
                                    <SVGInline className={[s.iconAddress].join("")} svg={paperplane} />
                                </div>
                                <div className={s.email}>
                                    <div className={s.label}>ou se preferir,  manda um emaiaal  😁:</div>
                                    <div className={s.address}><a href="email:atendimento@lojaprojetoverao.com.br">atendimento@lojaprojetoverao.com.br</a></div>
                                </div>
                            </div>
                        </div>
                        <div className={s.certificates}>
                            <div className={s.label}>melhores certicados de segurança:</div>
                            <ul className={s.lisOfCertificates}>
                                <li className={[s.item, s.seloablec].join(" ")}><SVGInline className={[s.icon].join("")} svg={seloablec} /></li>
                                <li className={[s.item, s.selolojaconfiavel].join(" ")}><SVGInline className={[s.icon].join("")} svg={selolojaconfiavel} /></li>
                                <li className={[s.item, s.selopci].join(" ")}><SVGInline className={[s.icon].join("")} svg={selopci} /></li>
                                <li className={s.certificateText}>certificado <strong>dado por você</strong>,
                                <br />nosso cliente.
                                <br />muito obrigado!</li>
                            </ul>
                        </div>
                    </div>
                    <div className={s.third}>
                        <div className={s.copyright}>© 20xx - 2019 projeto verão produtos saudáveis. todos os direitos reservados.</div>
                        <div className={s.links}><a href="#">politicas de frete</a>  <span className={s.bar}>/</span> <a href="#">trocas</a><span className={s.bar}>/</span><a href="#">privacidade</a><span className={s.bar}>/</span>  <a href="#">termos de uso</a></div>
                    </div>
                </div>
            </div>
        );
    }
}


