import * as React from "react";
import SVGInline from "react-svg-inline";
import s from "./modal-section.scss";
import closeModal from "../../../../../../../assets/icons/close-modal-white.svg";



export interface ModalSection3Props {

}

export interface ModalSection3State {
    status: boolean;
}

export class ModalSection3Component extends React.Component<ModalSection3Props, ModalSection3State> {

    constructor(props: ModalSection3Props) {
        super(props);


        this.state = {
            status: false,
        };
    }

    public componentDidMount() {
        window.addEventListener("bio.modal3.open", () => {
            this.setState({
                status: true,
            });
        });
    }

    public render() {
        const { status } = this.state;
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
                    <div className={s.containerVideo}>
                        <div className={s.iframeVideo}>
                            <iframe className={s.videoContent} width="440" height="290"
                                src="https://www.youtube.com/embed/eRSdeNJW-u4?rel=0&autoplay=1&mute=1&enablejsapi=1&origin=https://Fwww.aramis.com.br"
                                frameBorder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" ></iframe>
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
