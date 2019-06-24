import * as React from "react";
import { ShelfItem } from "../models/shelfs";
import s from "./card.component.scss";

export interface CardProps {
    item: ShelfItem;
    index: number;
}

export interface CardState {

}


export class CardComponent extends React.Component<CardProps, CardState> {

    constructor(props: CardProps) {
        super(props);
    }

    public render() {
        return (
            <div className={s.CardBoxes}>
                <a className={[s.ancora, this.props.item.classname].join(" ")} href={this.props.item.link} >
                    <div className={[s.boxImg, "custom"].join(" ")}>
                        <img src={`/arquivos/${this.props.item.img}`} alt={this.props.item.title} title={this.props.item.title} />
                    </div>
                    <h3 className={s.title}>{this.props.item.title}</h3>

                    <p className={s.text}>
                        <span className={[s.description, "desc"].join(" ")}>{this.props.item.description}</span>
                        <span className={s.cta} title={`ver mais ${this.props.item.title}`}>{this.props.item.cta}</span>
                    </p>
                </a>
            </div>
        );
    }
}
