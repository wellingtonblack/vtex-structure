import * as React from "react";
import s from "./LazyLoad.scss";

export interface LazyComponentProps {
    className?: string;
    loaded?(): void;
}

export interface LazyComponentState {
    visiable: boolean;
}

export class LazyComponentComponent extends React.Component<LazyComponentProps, LazyComponentState> {

    public element: any;
    constructor(props: any) {
        super(props);
        this.state = {
            visiable: false,
        };
    }

    public componentDidMount() {
        if (typeof IntersectionObserver !== "undefined") {
            const observer = new IntersectionObserver((entries) => {
                const element = entries[0];
                if (element.isIntersecting) {
                    this.setState({
                        visiable: true,
                    }, () => {
                        if (this.props.loaded) {
                            this.props.loaded();
                        }
                    });
                }
            });
            observer.observe(this.element);
        } else {
            this.setState({
                visiable: true,
            }, () => {
                if (this.props.loaded) {
                    this.props.loaded();
                }
            });
        }
    }

    public render() {
        return (
            <div className={[this.props.className, s.fadeInUp].join(" ")} ref={(ref) => { this.element = ref; }}>
                {this.state.visiable ? (
                    this.props.children
                ) : ""}
            </div>
        );
    }
}


