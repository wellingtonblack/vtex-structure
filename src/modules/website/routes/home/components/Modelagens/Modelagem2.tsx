import * as React from "react";
import s from "./Modelagens-custom.scss";
import { CustomShelf } from "./models/shelfs";
import { CardComponent } from "./Card-component/card.component";
import SVGInline from "react-svg-inline";
import modelagenscalcas from "../../../../assets/icons/modelagens-calcas.svg";
import Slider, { Settings } from "react-slick";

export interface Modelagem2Props {
    content: CustomShelf;
}

export interface Modelagem2State {

}

export class Modelagem2Component extends React.Component<Modelagem2Props, Modelagem2State> {

    constructor(props: Modelagem2Props) {
        super(props);

    }

    public render() {

        const settings: Settings = {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            dots: false,
            autoplay: false,
        };
        const { content } = this.props;
        return (
            <section className={[s.modelagem, s.calcas].join(" ")}>
                <div className={s.wrapper}>
                    <div className={s.content}>
                        <h3 className={s.title}>modelagens calças
                            <SVGInline className={s.logoCollection} svg={modelagenscalcas} />
                        </h3>
                    </div>
                    <div className={s.contentDescription}>
                        {$(window).width() < 992 ?
                            <Slider {...settings}>
                                {content.items && content.items.map((item, index) => <CardComponent key={index} index={index} item={item} />)}
                            </Slider> :
                            content.items && content.items.map((item, index) => <CardComponent key={index} index={index} item={item} />)}
                    </div>
                </div>
            </section>
        );
    }
}
