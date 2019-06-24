import * as React from "react";
import s from "./Footer.scss";
import SVGInline from "react-svg-inline";
import { FooterContentComponent } from "./components/FooterContent/FooterContent";
import PoweredBy from "../../../../assets/icons/vtex.svg";
import DevelopmentBy from "../../../../assets/icons/logo_vitrio_footer.svg";
import Clearsale from "../../../../assets/icons/clearsale.svg";
import { NewsletterComponent } from "../../../home/components/Newsletter/Newsletter";


export class FooterComponent extends React.Component<FooterProps, FooterState> {

    constructor(props: FooterProps) {
        super(props);
    }

    public render() {
        return (
            <footer className={s.footer}>
                <div className={s.newsLetter}>
                    <NewsletterComponent />
                </div>
                <div className={s.bgTop}>
                    <section className={s.wrapper}>
                        <FooterContentComponent />
                    </section>
                </div>

                <div className={s.copyright}>
                    <div className={s.wrapper}>
                        <div className={s.boxCopy}>
                            <p>TODOS OS DIREITOS RESERVADOS. A ARAMIS RESERVA-SE NO DIREITO DE CORRIGIR OU ALTERAR PREÇOS, PROMOÇÕES E DISPONIBILIDADE DE ESTOQUE A QUALQUER MOMENTO, SEM PRÉVIO AVISO.
                            VCI VANGUARD CONFECÇÕES IMPORTADAS S/A - CNPJ: 00.311.557/0064-27 - RUA PORTO ALEGRE, 307 - NOVA ZELÂNDIA - 29175-706 - SERRA/ES. </p>
                        </div>
                        <div className={s.boxMaster}>
                            <div className={s.boxClear}>
                                {/* <SVGInline className={s.iconClear} svg={Clearsale} /> */}
                                <a href="https://selo.clearsale.com.br/Loja/ExibirDetalhesLoja/8ed01445-34da-46d6-a69c-9cfd242de142" target="_blank" title="clear sale">
                                    <img src="/arquivos/icon-clear-sale.png" alt="clear sale" />
                                </a>
                            </div>
                            <div className={s.boxPoweredBy}>
                                <a href="https://www.vtex.com/pt-br/" target="_blank" title="vtex">
                                    <SVGInline className={s.iconPoweredBy} svg={PoweredBy} />
                                </a>
                            </div>
                            <div className={s.boxDevelopmentby}>
                                <a href="https://www.vitrio.com.br/" target="_blank" title="vitrio">
                                    <SVGInline className={s.iconDevelopmentBy} svg={DevelopmentBy} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export interface FooterProps { }

export interface FooterState { }