import * as React from "react";
import s from "./episodes.scss";
import { ModalSection1Component } from "./component/modal-section/modal-section1";
import { ModalSection2Component } from "./component/modal-section/modal-section2";
import { ModalSection3Component } from "./component/modal-section/modal-section3";


export interface EpisodesProps {
    isActive?: boolean;
}

export interface EpisodesState {
    session1: boolean;
    session2: boolean;
    session3: boolean;
}

export class EpisodesComponent extends React.Component<EpisodesProps, EpisodesState> {

    constructor(props: EpisodesProps) {
        super(props);
        this.state = {
            session1: false,
            session2: false,
            session3: false,
        };
    }

    public componentDidMount() {
        this.setState({
            session1: true,
        });

        this.state.session2 === false;
        this.state.session3 === false;
    }
    public handleScrollTo() {
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#biograph").offset().top,
        }, 2000);

    }


    public render() {
        return (
            [<section className={s.episodes}>
                <div className={[s.wrapper, s.boxEpisodes].join(" ")}>
                    <ModalSection1Component />
                    <ModalSection2Component />
                    <ModalSection3Component />
                    <div className={[s.epidode1, s.photo].join(" ")}
                        onClick={() => {
                            this.setState({
                                session1: true,
                                session2: false,
                                session3: false,
                            });
                            this.handleScrollTo();

                        }}>
                        <img src="/arquivos/LP_namorados-lucao.jpg?v=1" alt="o maior poder é sentir tudo - Lucão" />
                        <div className={[s.box1, s.boxCta].join(" ")}>
                            <span className={[s.cta, this.state.session1 ? "actived" : " "].join(" ")} >saiba mais</span>
                        </div>
                    </div>
                    <div className={[s.epidode2, s.photo].join(" ")}
                        onClick={() => {
                            this.handleScrollTo();
                            this.setState({
                                session2: true,
                                session1: false,
                                session3: false,
                            });
                        }}>
                        <img src="/arquivos/LP_namorados-emmanuel.jpg?v=1" alt="relacionamento não se discute, se escuta - Emanuel" />
                        <div className={[s.box2, s.boxCta].join(" ")}>
                            <span className={[s.cta, this.state.session2 ? "actived" : " "].join(" ")}>saiba mais</span>
                        </div>
                    </div>
                    <div className={[s.epidode3, s.photo].join(" ")}
                        onClick={() => {
                            this.handleScrollTo();
                            this.setState({
                                session3: true,
                                session2: false,
                                session1: false,
                            });
                        }}>
                        <img src="/arquivos/LP_namorados-fabio.jpg?v=1" alt="declarações são convites - Fabio Maca" />
                        <div className={[s.box3, s.boxCta].join(" ")}>
                            <span className={[s.cta, this.state.session3 ? "actived" : " "].join(" ")}>saiba mais</span>
                        </div>
                    </div>
                </div>
            </section>,
            (this.state.session1) ? <section id="biograph" className={[s.bio, s.lucao].join(" ")}>
                <div className={s.boxLeft}>
                    <img src="/arquivos/lucao.jpg" alt="Lucão" />
                </div>
                <div className={s.boxRight}>
                    <img className={s.name} src="/arquivos/lucao-signature.png" alt="Lucão" />
                    <div className={s.text}>
                        <p>“Ser humano sem amor é não ser”, diz um de seus versos
                            curtos publicados diariamente no Instagram. O goiano
                            Lucas Cândido Brandão começou a escrever aos 19 anos,
                            antes de existirem as redes sociais que conhecemos hoje.
                        </p>
                        <p>Migrou dos blogs para o Facebook, depois para o
                            Instagram e, mais de uma década depois, acumula quase
                            500 mil seguidores.
                         </p>
                        <div className={s.button}
                            onClick={() => {
                                window.dispatchEvent(new Event("bio.modal1.open"));
                            }}>
                            <span className={s.cta} >
                                <a href="javascript:void(0);">assista ao vídeo</a>
                            </span>
                        </div>
                        <div className={s.signature}>
                            <img src="/arquivos/signature-lucao.png" alt="o homem aprende a não falar" />
                        </div>
                    </div>
                </div>
            </section> : " ",
            this.state.session2 ? <section id="biograph" className={[s.bio, s.emanunel].join(" ")}>
                <div className={s.boxLeft}>
                    <img src="/arquivos/emanuel-aragao.jpg" alt="Emanuel" />
                </div>
                <div className={s.boxRight}>
                    <img className={s.name} src="/arquivos/emanuel_aragao-signature.png" alt="Emanuel" />
                    <div className={s.text}>
                        <p>Emanuel é ator, escritor e dramaturgo.
                            Casado com a atriz Maria Flor, divide com ela
                            um canal no YouTube há pouco mais de um ano.
                    </p>
                        <p>Às vezes sozinho, às vezes ao lado de Flor,
                            Emanuel fala sobre amor, sexo, medos, vergonhas,
                             culpa e todos os sentimentos que permeiam a vida
                             (de um casal também).
                    </p>
                        <div className={s.button}
                            onClick={() => {
                                window.dispatchEvent(new Event("bio.modal2.open"));
                            }}>
                            <span className={s.cta}>
                                <a href="javascript:void(0);">assista ao vídeo</a>
                            </span>
                        </div>
                        <div className={s.signature}>
                            <img src="/arquivos/signature-emanuel.png" alt="estar seguro é poder sentir" />
                        </div>
                    </div>
                </div>
            </section> : " ",
            this.state.session3 ? <section id="biograph" className={[s.bio, s.fabio].join(" ")}>
                <div className={s.boxLeft}>
                    <img src="/arquivos/fabio-maca.jpg" alt="Fabio" />
                </div>
                <div className={s.boxRight}>
                    <img className={s.name} src="/arquivos/fabio_maca-signature.png" alt="Fabio" />
                    <div className={s.text}>
                        <p>Ele largou uma carreira de sucesso na publicidade porque
                            se apaixonou pelas letras. Fabio Maca não sabe dizer se é
                            calígrafo ou poeta - mas é feliz em ser um pouco dos dois.
                        </p>
                        <p>Cria letras a partir de histórias e sentimentos. Além de
                            fazerem sucesso no Instagram, elas se transformam em
                            convites de casamento, paredes, quadros e até tatuagens.
                            No ano passado, lançou ao lado de Lucão o livro Dois
                            Avessos.
                        </p>
                        <div className={s.button}
                            onClick={() => {
                                window.dispatchEvent(new Event("bio.modal3.open"));
                            }}>
                            <span className={s.cta}>
                                <a href="javascript:void(0);">assista ao vídeo</a>
                            </span>
                        </div>
                        <div className={s.signature}>
                            <img src="/arquivos/signature-maca.png" alt="para se reconstruir você precisa destruir certezas" />
                        </div>
                    </div>
                </div>
            </section> : " "]
        );
    }
}
