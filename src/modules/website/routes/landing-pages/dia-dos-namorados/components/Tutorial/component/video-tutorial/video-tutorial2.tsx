import * as React from "react";
import SVGInline from "react-svg-inline";
import s from "./video-tutorial.scss";
import closeModal from "../../../../../../../assets/icons/close-modal-white.svg";



export interface VideoTutorial2Props {

}

export interface VideoTutorial2State {
    status: boolean;
}

export class VideoTutorial2Component extends React.Component<VideoTutorial2Props, VideoTutorial2State> {

    constructor(props: VideoTutorial2Props) {
        super(props);


        this.state = {
            status: false,
        };
    }

    public componentDidMount() {
        window.addEventListener("tutorial.modal2.open", () => {
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
                                src="https://www.youtube.com/embed/V9WwxDrdNdQ?rel=0&autoplay=1&mute=1&enablejsapi=1&origin=https://Fwww.aramis.com.br"
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
