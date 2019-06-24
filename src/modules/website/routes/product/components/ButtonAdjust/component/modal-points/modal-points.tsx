import * as React from "react";
import SVGInline from "react-svg-inline";
import s from "./modal-points.scss";
import closeModal from "../../../../../../assets/icons/close-modal-white.svg";
import { CustomInfos } from "../models/infos";



export interface ModalPointsProps {
    content: CustomInfos;
}

export interface ModalPointsState {
    status: boolean;

}

export class ModalPointsComponent extends React.Component<ModalPointsProps, ModalPointsState> {

    constructor(props: ModalPointsProps) {
        super(props);


        this.state = {
            status: false,
        };
    }

    public componentDidMount() {
        window.addEventListener("modal-points.open", () => {
            this.setState({
                status: true,
            });
        });
    }

    public render() {
        const { status } = this.state;
        const { content } = this.props;
        return (
            status && <div className={s.modal}>
                <div className={s.content}>
                    <div className={s.icon}
                        onClick={() => {
                            this.setState({
                                status: false,
                            });
                        }}>
                        <SVGInline className={s.closeModal} svg={closeModal} />
                    </div>
                    <div className={s.container}>
                        {content.items && content.items.map((item, index) =>
                            <div className={s.points}>
                                <h2 className={s.title}>{item.loja}</h2>
                                <div className={s.adress}>
                                    <p>{item.endereco}</p>
                                    <p>{item.estado} - {item.telefone}</p>
                                </div>
                                {item.funcionamento && item.funcionamento.length > 0 && <h3 className={s.time}>Horário de Funcionamento</h3>}
                                <p>{item.funcionamento}</p>
                            </div>)}
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
