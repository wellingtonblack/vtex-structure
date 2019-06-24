import * as React from "react";


export interface RattingProps {
    productId: string;
    className?: string;
}

export interface RattingState {

}

export class RattingComponent extends React.Component<RattingProps, RattingState> {

    public ele: any;

    constructor(props: RattingProps) {
        super(props);
    }

    public componentWillMount() {
        try {
            typeof yv !== "undefined" && yv && yv.quickReview.searchExecuteQuickReview();
        } catch (error) {
            console.warn(error);
        }
    }

    public render() {

        return (
            <div className={this.props.className}>
                <div ref={(ref) => {
                }} className={"yv-review-quickreview"} {...{ value: this.props.productId } as any}></div>
            </div>
        );
    }
}
