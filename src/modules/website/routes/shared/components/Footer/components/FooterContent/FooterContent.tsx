import * as React from "react";
import s from "./FooterContent.scss";
import { PaymentsFooterComponent } from "../Payments/Payments";
import { SocialNetworksComponent } from "../SocialNetworks/SocialNetworks";

export interface FooterContentProps { 
    
}

export interface FooterContentState {
    
}

export class FooterContentComponent extends React.Component<FooterContentProps, FooterContentState> {

    constructor(props: FooterContentProps) {
        super(props);

    }

    public render() {
        return (
            <div className={s.content}>
                <div className={s.boxLink}>
                    <div className={s.link}>
                        <ul>
                            <li>
                                <a href="/institucional/sobre-a-marca/">
                                    a marca
                                </a>
                            </li>
                            <li>
                                <a href="/institucional/politica-entrega">
                                    política de entrega
                                </a>
                            </li>
                            <li>
                                <a href="/institucional/politica-pagamento/">
                                    política de pagamento
                                </a>
                            </li>
                            <li>
                                <a href="/institucional/politica-privacidade">
                                    política de privacidade
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className={s.link}>
                        <ul>
                            <li>
                                <a href="/institucional/trocas-e-devolucoes">
                                    trocas e devoluções
                                </a>
                            </li>
                            <li>
                                <a href="/account/orders">
                                    meus pedidos
                                </a>
                            </li>
                            <li>
                                <a href="/contato">
                                    atendimento ao cliente
                                </a>
                            </li>
                        </ul>
                    </div>


                    <div className={s.link}>
                        <ul>
                            <li>
                                <a href="/loja">
                                    nossas lojas
                                </a>
                            </li>
                            <li>
                                <a href="/institucional/seja-franqueado/">
                                    seja franqueado
                                </a>
                            </li>
                            <li>
                                <a href="/institucional/seja-revendedor/">
                                    seja revendedor
                                </a>
                            </li>
                            <li>
                                <a href="/institucional/trabalhe-conosco/">
                                    trabalhe conosco
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>
                <div className={s.boxRight}>
                    <div className={s.socialNet}>
                        <SocialNetworksComponent />
                    </div>
                    <div className={s.paymentSession}>
                        <PaymentsFooterComponent />
                    </div>
                </div>
            </div>
        );
    }
}