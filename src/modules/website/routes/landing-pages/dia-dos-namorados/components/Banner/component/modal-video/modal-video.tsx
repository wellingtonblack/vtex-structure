import * as React from "react";
import SVGInline from "react-svg-inline";
import s from "./modal-video.scss";
import { ImageBackgroundComponent } from "../../../../../../shared/components/ImageBackground/ImageBackground";
import { Banner } from "../../../../../../shared/models/banner.model";
import bannerService from "../../../../../../shared/services/banner.service";
import closeModal from "../../../../../../../assets/icons/close-modal-white.svg";



export interface ModalVideoProps {

}

export interface ModalVideoState {
    status: boolean;
}

export class ModalVideoComponent extends React.Component<ModalVideoProps, ModalVideoState> {

    constructor(props: ModalVideoProps) {
        super(props);


        this.state = {
            status: false,
        };
    }

    public componentDidMount() {
        window.addEventListener("video.modal.open", () => {
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
                                src="https://www.youtube.com/embed/Am5AG7dX02E?autoplay=1&rel=0&enablejsapi=1&origin=https%3A%2F%2Fwww.aramis.com.br"
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
