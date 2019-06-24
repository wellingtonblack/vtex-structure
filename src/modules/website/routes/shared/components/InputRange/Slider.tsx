import React from "react";
import { Label } from "./label";
import utilsService from "../../services/utils-service";

interface SliderProps {
    ariaLabelledby: string;
    ariaControls: string;
    classNames: any;
    maxValue: number;
    minValue: number;
    percentage: number;
    type: string;
    value: number;
    formatLabel(value: any): void;
    onSliderDrag(event: any, type: string): void;
    onSliderKeyDown(event: any, type: string): void;
}

interface SliderState {

}

/**
 * @ignore
 */
export default class Slider extends React.Component<SliderProps, SliderState> {

    public node: HTMLSpanElement = null;

    /**
     * @param {Object} props
     * @param {string} [props.ariaLabelledby]
     * @param {string} [props.ariaControls]
     * @param {InputRangeClassNames} props.classNames
     * @param {Function} [props.formatLabel]
     * @param {number} [props.maxValue]
     * @param {number} [props.minValue]
     * @param {Function} props.onSliderKeyDown
     * @param {Function} props.onSliderDrag
     * @param {number} props.percentage
     * @param {number} props.type
     * @param {number} props.value
     */
    constructor(props: SliderProps) {
        super(props);

        /**
         * @private
         * @type {?Component}
         */
    }


    /**
     * @ignore
     * @override
     * @return {void}
     */
    public componentWillUnmount() {
        this.removeDocumentMouseMoveListener();
        this.removeDocumentMouseUpListener();
        this.removeDocumentTouchEndListener();
        this.removeDocumentTouchMoveListener();
    }

    /**
     * @private
     * @return {Object}
     */
    public getStyle() {
        const perc = (this.props.percentage || 0) * 100;
        const style = {
            position: "absolute",
            left: `${perc}%`,
        };

        return style;
    }

    /**
     * Listen to mousemove event
     * @private
     * @return {void}
     */
    public addDocumentMouseMoveListener = () => {
        this.removeDocumentMouseMoveListener();
        this.node.ownerDocument.addEventListener("mousemove", this.handleMouseMove);
    }

    /**
     * Listen to mouseup event
     * @private
     * @return {void}
     */
    public addDocumentMouseUpListener = () => {
        this.removeDocumentMouseUpListener();
        this.node.ownerDocument.addEventListener("mouseup", this.handleMouseUp);
    }

    /**
     * Listen to touchmove event
     * @private
     * @return {void}
     */
    public addDocumentTouchMoveListener = () => {
        this.removeDocumentTouchMoveListener();
        this.node.ownerDocument.addEventListener("touchmove", this.handleTouchMove);
    }

    /**
     * Listen to touchend event
     * @private
     * @return {void}
     */
    public addDocumentTouchEndListener = () => {
        this.removeDocumentTouchEndListener();
        this.node.ownerDocument.addEventListener("touchend", this.handleTouchEnd);
    }

    /**
     * @private
     * @return {void}
     */
    public removeDocumentMouseMoveListener = () => {
        this.node.ownerDocument.removeEventListener("mousemove", this.handleMouseMove);
    }

    /**
     * @private
     * @return {void}
     */
    public removeDocumentMouseUpListener = () => {
        this.node.ownerDocument.removeEventListener("mouseup", this.handleMouseUp);
    }

    /**
     * @private
     * @return {void}
     */
    public removeDocumentTouchMoveListener = () => {
        this.node.ownerDocument.removeEventListener("touchmove", this.handleTouchMove);
    }

    /**
     * @private
     * @return {void}
     */
    public removeDocumentTouchEndListener = () => {
        this.node.ownerDocument.removeEventListener("touchend", this.handleTouchEnd);
    }

    /**
     * @private
     * @return {void}
     */
    public handleMouseDown = () => {
        this.addDocumentMouseMoveListener();
        this.addDocumentMouseUpListener();
    }

    /**
     * @private
     * @return {void}
     */
    public handleMouseUp = () => {
        this.removeDocumentMouseMoveListener();
        this.removeDocumentMouseUpListener();
    }

    /**
     * @private
     * @param {SyntheticEvent} event
     * @return {void}
     */
    public handleMouseMove = (event: any) => {
        this.props.onSliderDrag(event, this.props.type);
    }

    /**
     * @private
     * @return {void}
     */
    public handleTouchStart = () => {
        this.addDocumentTouchEndListener();
        this.addDocumentTouchMoveListener();
    }

    /**
     * @private
     * @param {SyntheticEvent} event
     * @return {void}
     */
    public handleTouchMove = (event: any) => {
        this.props.onSliderDrag(event, this.props.type);
    }

    /**
     * @private
     * @return {void}
     */
    public handleTouchEnd = () => {
        this.removeDocumentTouchMoveListener();
        this.removeDocumentTouchEndListener();
    }

    /**
     * @private
     * @param {SyntheticEvent} event
     * @return {void}
     */
    public handleKeyDown = (event: any) => {
        this.props.onSliderKeyDown(event, this.props.type);
    }

    /**
     * @override
     * @return {JSX.Element}
     */
    public render() {
        const style = this.getStyle();

        return (
            <span
                className={this.props.classNames.sliderContainer}
                ref={(node) => { this.node = node; }}
                style={style as any}>
                <Label
                    classLabel={this.props.classNames.labelCurrentPrice}
                    classNames={this.props.classNames}
                    formatLabel={this.props.formatLabel}
                    type="value">
                   {this.props.value}
                </Label>
                <div
                    aria-labelledby={this.props.ariaLabelledby}
                    aria-controls={this.props.ariaControls}
                    aria-valuemax={this.props.maxValue}
                    aria-valuemin={this.props.minValue}
                    aria-valuenow={this.props.value}
                    className={this.props.classNames.slider}
                    draggable={false}
                    onKeyDown={this.handleKeyDown}
                    onMouseDown={this.handleMouseDown}
                    onTouchStart={this.handleTouchStart}
                    role="slider"
                    tabIndex={0} />
            </span>
        );
    }
}