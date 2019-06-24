import * as React from "react";
import s from "./Modelagens-custom.scss";
import { CustomShelf } from "./models/shelfs";
import { CardComponent } from "./Card-component/card.component";
import SVGInline from "react-svg-inline";
import modelagenscamisas from "../../../../assets/icons/modelagens-camisas.svg";
import Slider, { Settings } from "react-slick";

export interface Modelagem1Props {
    content: CustomShelf;
}

export interface Modelagem1State {

}

export class Modelagem1Component extends React.Component<Modelagem1Props, Modelagem1State> {

    constructor(props: Modelagem1Props) {
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
            <section className={[s.modelagem, s.camisas].join(" ")}>
                <div className={s.wrapper}>
                    <div className={s.content}>
                        <h3 className={s.title}>modelagens camisas
                            <SVGInline className={s.logoCollection} svg={modelagenscamisas} />
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
