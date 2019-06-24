import * as React from "react";
import s from "./tutorial.scss";
import SVGInline from "react-svg-inline";
import comemorar from "../../../../../assets/icons/paracomemorar.svg";
import { VideoTutorial1Component } from "./component/video-tutorial/video-tutorial1";
import { VideoTutorial2Component } from "./component/video-tutorial/video-tutorial2";
import { VideoTutorial3Component } from "./component/video-tutorial/video-tutorial3";


export interface TutorialProps {
}

export interface TutorialState {
}

export class TutorialComponent extends React.Component<TutorialProps, TutorialState> {

    constructor(props: TutorialProps) {
        super(props);
        this.state = {
        };
    }



    public render() {
        return (
            <section className={s.tutorial}>
                <VideoTutorial1Component />
                <VideoTutorial2Component />
                <VideoTutorial3Component />
                <h2 className={[s.title, s.wrapper].join(" ")}>para comemorar<SVGInline className={[s.icon].join("")} svg={comemorar} /></h2>
                <div className={[s.wrapper, s.boxTutorials].join(" ")}>
                    <div className={[s.tutorial1, s.poster].join(" ")}
                        onClick={() => {
                            window.dispatchEvent(new Event("tutorial.modal1.open"));
                        }}>
                        <img src="/arquivos/Jantar.png" alt="Pensando em jantar fora?" />
                        {/* <h2 className={s.description}>Jantar Fora</h2> */}
                        <div className={[s.box1, s.boxCta].join(" ")} >
                            <span className={s.cta}>Pensando em jantar fora?</span>
                        </div>
                    </div>
                    <div className={[s.tutorial2, s.poster].join(" ")}
                        onClick={() => {
                            window.dispatchEvent(new Event("tutorial.modal2.open"));
                        }}>
                        <img src="/arquivos/Cinema.png" alt="Que tal um cinema?" />
                        {/* <h2 className={s.description}>Ir Ao Cinema</h2> */}
                        <div className={[s.box2, s.boxCta].join(" ")}>
                            <span className={s.cta}>Que tal um cinema?</span>
                        </div>
                    </div>
                    <div className={[s.tutorial3, s.poster].join(" ")}
                        onClick={() => {
                            window.dispatchEvent(new Event("tutorial.modal3.open"));
                        }}>
                        <img src="/arquivos/Casa.png" alt="Vai comemorar em casa?" />
                        {/* <h2 className={s.description}>Celebrar em Casa</h2> */}
                        <div className={[s.box3, s.boxCta].join(" ")} >
                            <span className={s.cta}>Vai comemorar em casa?</span>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
