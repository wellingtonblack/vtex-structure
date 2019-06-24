import * as React from "react";
import s from "./video-middle.scss";
import { ModalRegulamentoComponent } from "./component/modal-regulamento/modal-regulamento";
import SVGInline from "react-svg-inline";
import manta from "../../../../../assets/icons/ganheumamanta.svg";



export interface VideoMiddleProps {
}

export interface VideoMiddleState {
}

export class VideoMiddleComponent extends React.Component<VideoMiddleProps, VideoMiddleState> {

    constructor(props: VideoMiddleProps) {
        super(props);
        this.state = {
        };
    }



    public render() {
        return (
            <section className={s.videoMiddle}>
                <ModalRegulamentoComponent />
                <div className={[s.wrapper].join(" ")}>
                    <div className={s.content}>
                        <div className={s.boxLeft}>
                            <h2 className={s.title}>
                                Dia dos namorados
                            </h2>
                            <SVGInline className={[s.icon].join("")} svg={manta} />
                            <h3 className={s.subtitle}>
                                Nas compras acima de R$ 900,00
                            </h3>

                            <span className={s.link}
                            // onClick={() => {
                            //     window.dispatchEvent(new Event("regulamento.modal.open"));
                            // }}
                            >
                                <a href="https://aramismenswear.vteximg.com.br/arquivos/Regulamento_Namorados.pdf" target="_blank">
                                    Conheça o regulamento completo da <br />
                                    campanha.
                                </a>
                            </span>
                        </div>
                        <div className={s.boxRight}>
                            <div className={s.poster}>
                                {($(window).width() > 992 ?
                                    <img src="/arquivos/manta-v2.png" alt="manta" />
                                    : <img src="/arquivos/manta-v2.png" alt="manta" />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
