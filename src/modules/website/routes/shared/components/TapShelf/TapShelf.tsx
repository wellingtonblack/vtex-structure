import * as React from "react";
import { Shelf } from "../../models/shelf.model";
import s from "./TapShelf.scss";

import { ShelfComponent } from "./components/Shelf/Shelf";

export interface TapShelfProps {
    shelf?: Shelf;
    className?: string;
}

export interface TapShelfState {
    shelf: Shelf;
    show: boolean;
}

export class TapShelfComponent extends React.Component<TapShelfProps, TapShelfState> {

    constructor(props: TapShelfProps) {
        super(props);

        this.state = {
            show: false,
            shelf: this.props.shelf,
        };
    }

    public handle = () => { this.setState({ show: !this.state.show }); };

    public render() {

        const ele =
            <div className={[s.container, this.state.show ? s.active : ""].join(" ")}>
                <div className={[s.mask, this.state.show ? s.active : ""].join(" ")}></div>
                <div className={[s.wrapper, this.state.show ? s.active : ""].join(" ")}>
                    <div onClick={this.handle} className={s.close}></div>
                    <ShelfComponent handle={this.handle} className={s.shelf} shelf={this.state.shelf} />
                </div>
            </div>;

        return (
            ele
        );
    }
}
