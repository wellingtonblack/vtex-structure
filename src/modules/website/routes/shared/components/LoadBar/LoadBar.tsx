import * as React from "react";
import s from "./LoadBar.scss";

export interface LoadBarState {
    active: boolean;
}

export interface LoadBarProps {
    
}

export class LoadbarComponent extends React.Component<LoadBarProps, LoadBarState> {

    constructor(props: any) {
        super(props);

        this.state = {
            active: false,
        };

        window.addEventListener("load.bar", (event: CustomEvent) => {
            this.setState({
                active: event.detail as boolean,
            });
        }, false);

        window.loading = (state: boolean) => {
            window.dispatchEvent(new CustomEvent("load.bar", { detail: state }));
        };
    }


    public render() {
        return (
            this.state.active ? (
                <div className={s["load-bar-component"]}>
                    <div className={s["progress-materializecss"]}>
                        <div className={s.indeterminate}></div>
                    </div>
                </div>
            ) : ""
        );
    }
}


