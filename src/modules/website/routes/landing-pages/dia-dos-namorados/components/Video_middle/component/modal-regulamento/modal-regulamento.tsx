import * as React from "react";
import SVGInline from "react-svg-inline";
import s from "./modal-regulamento.scss";
import closeModal from "../../../../../../../assets/icons/close-modal-white.svg";



export interface ModalRegulamentoProps {

}

export interface ModalRegulamentoState {
    status: boolean;
}

export class ModalRegulamentoComponent extends React.Component<ModalRegulamentoProps, ModalRegulamentoState> {

    constructor(props: ModalRegulamentoProps) {
        super(props);


        this.state = {
            status: false,
        };
    }

    public componentDidMount() {
        window.addEventListener("regulamento.modal.open", () => {
            this.setState({
                status: true,
            });
        });
    }
    public handleBlock() {
        setTimeout(() => {
            document.querySelector("iframe").style.display = "block";
        }, 1000);
    }

    public render() {
        const iframe = <iframe src="https://aramismenswear.vteximg.com.br/arquivos/Regulamento_Namorados.pdf?embedded=true" frameBorder="0" allow="encrypted-media; gyroscope; picture-in-picture"></iframe>;
        const { status } = this.state;
        return (
            status && <div className={s.modalRegulamento}>
                <div className={s.content}>
                    <div className={s.icon}
                        onClick={() => {
                            this.handleBlock();
                            this.setState({
                                status: false,
                            });
                        }}>
                        <SVGInline className={s.closeModal} svg={closeModal} />
                    </div>
                    <div className={s.containerVideo}>
                        <div className={s.iframeVideo} >
                            {iframe}
                        </div>

                    </div>
                </div>
                <div className={s.mask} onClick={() => {
                    this.setState({
                        status: false,
                    });
                }}></div>
            </div>
        );
    }
}
