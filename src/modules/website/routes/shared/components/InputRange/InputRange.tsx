import React from "react";
import * as valueTransformer from "./value-transformer";
import DEFAULT_CLASS_NAMES from "./default-class-names";
import { Label } from "./label";
import rangePropType from "./range-prop-type";
import valuePropType from "./value-prop-type";
import Slider from "./slider";
import Track from "./track";
import { captialize, distanceTo, isDefined, isObject, length } from "./utils/index";
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from "./key-codes";
import "./InputRange.scss";


type Props = {
    ariaLabelledby?: string;
    ariaControls?: string;
    draggableTrack?: boolean;
    value?: any;
    name?: string;
    step?: number;
    onChange?(value: any): void;
    formatLabel?(value: any): void;
    onChangeStart?(value: any): void;
    onChangeComplete?(value: any): void;
} & Partial<DefaultProps>;

type DefaultProps = Readonly<typeof defaultProps>;

const defaultProps = {
    allowSameValues: false,
    classNames: DEFAULT_CLASS_NAMES,
    disabled: false,
    maxValue: 10,
    minValue: 0,
    step: 1,
};

/**
 * A React component that allows users to input numeric values within a range
 * by dragging its sliders.
 */
export class InputRange extends React.Component<Props> {

    /**
     * @ignore
     * @override
     * @return {Object}
     */

    public static defaultProps = defaultProps;


    public startValue: number = null;

    public node: HTMLDivElement = null;

    public trackNode: Track = null;

    public isSliderDragging = false;

    public lastKeyMoved: string = null;

    /**
     * @param {Object} props
     * @param {boolean} [props.allowSameValues]
     * @param {string} [props.ariaLabelledby]
     * @param {string} [props.ariaControls]
     * @param {InputRangeClassNames} [props.classNames]
     * @param {boolean} [props.disabled = false]
     * @param {Function} [props.formatLabel]
     * @param {number|Range} [props.maxValue = 10]
     * @param {number|Range} [props.minValue = 0]
     * @param {string} [props.name]
     * @param {string} props.onChange
     * @param {Function} [props.onChangeComplete]
     * @param {Function} [props.onChangeStart]
     * @param {number} [props.step = 1]
     * @param {number|Range} props.value
     */
    constructor(props: Props) {
        super(props);

        /**
         * @private
         * @type {?number}
         */
        this.startValue = null;

        /**
         * @private
         * @type {?Component}
         */
        this.node = null;

        /**
         * @private
         * @type {?Component}
         */
        this.trackNode = null;

        /**
         * @private
         * @type {bool}
         */
        this.isSliderDragging = false;

        /**
         * @private
         * @type {?string}
         */
        this.lastKeyMoved = null;
    }

    /**
     * @ignore
     * @override
     * @return {void}
     */
    public componentWillUnmount() {
        this.removeDocumentMouseUpListener();
        this.removeDocumentTouchEndListener();
    }

    /**
     * Return the CSS class name of the component
     * @private
     * @return {string}
     */
    public getComponentClassName = () => {
        if (!this.props.disabled) {
            return this.props.classNames.inputRange;
        }

        return this.props.classNames.disabledInputRange;
    }

    /**
     * Return the bounding rect of the track
     * @private
     * @return {ClientRect}
     */
    public getTrackClientRect = () => {
        return this.trackNode.getClientRect();
    }

    /**
     * Return the slider key closest to a point
     * @private
     * @param {Point} position
     * @return {string}
     */
    public getKeyByPosition = (position: any) => {
        const values = valueTransformer.getValueFromProps(this.props, this.isMultiValue());
        const positions = valueTransformer.getPositionsFromValues(values, this.props.minValue, this.props.maxValue, this.getTrackClientRect());

        if (this.isMultiValue()) {
            const distanceToMin = distanceTo(position, positions.min);
            const distanceToMax = distanceTo(position, positions.max);

            if (distanceToMin < distanceToMax) {
                return "min";
            }
        }

        return "max";
    }

    /**
     * Return all the slider keys
     * @private
     * @return {string[]}
     */
    public getKeys = () => {
        if (this.isMultiValue()) {
            return ["min", "max"];
        }

        return ["max"];
    }

    /**
     * Return true if the difference between the new and the current value is
     * greater or equal to the step amount of the component
     * @private
     * @param {Range} values
     * @return {boolean}
     */
    public hasStepDifference = (values: any) => {
        const currentValues = valueTransformer.getValueFromProps(this.props, this.isMultiValue());

        return length(values.min, currentValues.min) >= this.props.step ||
            length(values.max, currentValues.max) >= this.props.step;
    }

    /**
     * Return true if the component accepts a min and max value
     * @private
     * @return {boolean}
     */
    public isMultiValue = () => {
        return isObject(this.props.value);
    }

    /**
     * Return true if the range is within the max and min value of the component
     * @private
     * @param {Range} values
     * @return {boolean}
     */
    public isWithinRange = (values: any) => {
        if (this.isMultiValue()) {
            return values.min >= this.props.minValue &&
                values.max <= this.props.maxValue &&
                this.props.allowSameValues
                ? values.min <= values.max
                : values.min < values.max;
        }

        return values.max >= this.props.minValue && values.max <= this.props.maxValue;
    }

    /**
     * Return true if the new value should trigger a render
     * @private
     * @param {Range} values
     * @return {boolean}
     */
    public shouldUpdate = (values: any) => {
        return this.isWithinRange(values) && this.hasStepDifference(values);
    }

    /**
     * Update the position of a slider
     * @private
     * @param {string} key
     * @param {Point} position
     * @return {void}
     */
    public updatePosition = (key: any, position: any) => {
        const values = valueTransformer.getValueFromProps(this.props, this.isMultiValue());
        const positions: any = valueTransformer.getPositionsFromValues(values, this.props.minValue, this.props.maxValue, this.getTrackClientRect());

        positions[key] = position;
        this.lastKeyMoved = key;

        this.updatePositions(positions);
    }

    /**
     * Update the positions of multiple sliders
     * @private
     * @param {Object} positions
     * @param {Point} positions.min
     * @param {Point} positions.max
     * @return {void}
     */
    public updatePositions = (positions: any) => {
        const values = {
            min: valueTransformer.getValueFromPosition(positions.min, this.props.minValue, this.props.maxValue, this.getTrackClientRect()),
            max: valueTransformer.getValueFromPosition(positions.max, this.props.minValue, this.props.maxValue, this.getTrackClientRect()),
        };

        const transformedValues = {
            min: valueTransformer.getStepValueFromValue(values.min, this.props.step),
            max: valueTransformer.getStepValueFromValue(values.max, this.props.step),
        };

        this.updateValues(transformedValues);
    }

    /**
     * Update the value of a slider
     * @private
     * @param {string} key
     * @param {number} value
     * @return {void}
     */
    public updateValue = (key: any, value: any) => {
        const values = valueTransformer.getValueFromProps(this.props, this.isMultiValue());

        values[key] = value;

        this.updateValues(values);
    }

    /**
     * Update the values of multiple sliders
     * @private
     * @param {Range|number} values
     * @return {void}
     */
    public updateValues = (values: any) => {
        if (!this.shouldUpdate(values)) {
            return;
        }

        this.props.onChange(this.isMultiValue() ? values : values.max);
    }

    /**
     * Increment the value of a slider by key name
     * @private
     * @param {string} key
     * @return {void}
     */
    public incrementValue = (key: any) => {
        const values = valueTransformer.getValueFromProps(this.props, this.isMultiValue());
        const value = values[key] + this.props.step;

        this.updateValue(key, value);
    }

    /**
     * Decrement the value of a slider by key name
     * @private
     * @param {string} key
     * @return {void}
     */
    public decrementValue = (key: any) => {
        const values = valueTransformer.getValueFromProps(this.props, this.isMultiValue());
        const value = values[key] - this.props.step;

        this.updateValue(key, value);
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
     * Listen to touchend event
     * @private
     * @return {void}
     */
    public addDocumentTouchEndListener = () => {
        this.removeDocumentTouchEndListener();
        this.node.ownerDocument.addEventListener("touchend", this.handleTouchEnd);
    }

    /**
     * Stop listening to mouseup event
     * @private
     * @return {void}
     */
    public removeDocumentMouseUpListener = () => {
        this.node.ownerDocument.removeEventListener("mouseup", this.handleMouseUp);
    }

    /**
     * Stop listening to touchend event
     * @private
     * @return {void}
     */
    public removeDocumentTouchEndListener = () => {
        this.node.ownerDocument.removeEventListener("touchend", this.handleTouchEnd);
    }

    /**
     * Handle any "mousemove" event received by the slider
     * @private
     * @param {SyntheticEvent} event
     * @param {string} key
     * @return {void}
     */
    public handleSliderDrag = (event: any, key: any) => {
        if (this.props.disabled) {
            return;
        }

        const position = valueTransformer.getPositionFromEvent(event, this.getTrackClientRect());
        this.isSliderDragging = true;
        requestAnimationFrame(() => this.updatePosition(key, position));
    }

    /**
     * Handle any "mousemove" event received by the track
     * @private
     * @param {SyntheticEvent} event
     * @return {void}
     */
    public handleTrackDrag = (event: any, prevEvent: any) => {
        if (this.props.disabled || !this.props.draggableTrack || this.isSliderDragging) {
            return;
        }

        const {
            maxValue,
            minValue,
            value: { max, min },
        } = this.props;

        const position = valueTransformer.getPositionFromEvent(event, this.getTrackClientRect());
        const value = valueTransformer.getValueFromPosition(position, minValue, maxValue, this.getTrackClientRect());
        const stepValue = valueTransformer.getStepValueFromValue(value, this.props.step);

        const prevPosition = valueTransformer.getPositionFromEvent(prevEvent, this.getTrackClientRect());
        const prevValue = valueTransformer.getValueFromPosition(prevPosition, minValue, maxValue, this.getTrackClientRect());
        const prevStepValue = valueTransformer.getStepValueFromValue(prevValue, this.props.step);

        const offset = prevStepValue - stepValue;

        const transformedValues = {
            min: min - offset,
            max: max - offset,
        };

        this.updateValues(transformedValues);
    }

    /**
     * Handle any "keydown" event received by the slider
     * @private
     * @param {SyntheticEvent} event
     * @param {string} key
     * @return {void}
     */
    public handleSliderKeyDown = (event: any, key: any) => {
        if (this.props.disabled) {
            return;
        }

        switch (event.keyCode) {
            case LEFT_ARROW:
            case DOWN_ARROW:
                event.preventDefault();
                this.decrementValue(key);
                break;

            case RIGHT_ARROW:
            case UP_ARROW:
                event.preventDefault();
                this.incrementValue(key);
                break;

            default:
                break;
        }
    }

    /**
     * Handle any "mousedown" event received by the track
     * @private
     * @param {SyntheticEvent} event
     * @param {Point} position
     * @return {void}
     */
    public handleTrackMouseDown = (event: any, position: any) => {
        if (this.props.disabled) {
            return;
        }

        const {
            maxValue,
            minValue,
            value: { max, min },
        } = this.props;

        event.preventDefault();

        const value = valueTransformer.getValueFromPosition(position, minValue, maxValue, this.getTrackClientRect());
        const stepValue = valueTransformer.getStepValueFromValue(value, this.props.step);

        if (!this.props.draggableTrack || stepValue > max || stepValue < min) {
            this.updatePosition(this.getKeyByPosition(position), position);
        }
    }

    /**
     * Handle the start of any mouse/touch event
     * @private
     * @return {void}
     */
    public handleInteractionStart = (event: any) => {
        if (this.props.onChangeStart) {
            this.props.onChangeStart(this.props.value);
        }

        if (this.props.onChangeComplete && !isDefined(this.startValue)) {
            this.startValue = this.props.value;
        }
    }

    /**
     * Handle the end of any mouse/touch event
     * @private
     * @return {void}
     */
    public handleInteractionEnd = (event: any) => {
        if (this.isSliderDragging) {
            this.isSliderDragging = false;
        }

        if (!this.props.onChangeComplete || !isDefined(this.startValue)) {
            return;
        }

        if (this.startValue !== this.props.value) {
            this.props.onChangeComplete(this.props.value);
        }

        this.startValue = null;
    }

    /**
     * Handle any "keydown" event received by the component
     * @private
     * @param {SyntheticEvent} event
     * @return {void}
     */
    public handleKeyDown = (event: any) => {
        this.handleInteractionStart(event);
    }

    /**
     * Handle any "keyup" event received by the component
     * @private
     * @param {SyntheticEvent} event
     * @return {void}
     */
    public handleKeyUp = (event: any) => {
        this.handleInteractionEnd(event);
    }

    /**
     * Handle any "mousedown" event received by the component
     * @private
     * @param {SyntheticEvent} event
     * @return {void}
     */
    public handleMouseDown = (event: any) => {
        this.handleInteractionStart(event);
        this.addDocumentMouseUpListener();
    }

    /**
     * Handle any "mouseup" event received by the component
     * @private
     * @param {SyntheticEvent} event
     */
    public handleMouseUp = (event: any) => {
        this.handleInteractionEnd(event);
        this.removeDocumentMouseUpListener();
    }

    /**
     * Handle any "touchstart" event received by the component
     * @private
     * @param {SyntheticEvent} event
     * @return {void}
     */
    public handleTouchStart = (event: any) => {
        this.handleInteractionStart(event);
        this.addDocumentTouchEndListener();
    }

    /**
     * Handle any "touchend" event received by the component
     * @private
     * @param {SyntheticEvent} event
     */
    public handleTouchEnd = (event: any) => {
        this.handleInteractionEnd(event);
        this.removeDocumentTouchEndListener();
    }

    /**
     * Return JSX of sliders
     * @private
     * @return {JSX.Element}
     */
    public renderSliders = () => {
        const values = valueTransformer.getValueFromProps(this.props, this.isMultiValue());
        const percentages: any = valueTransformer.getPercentagesFromValues(values, this.props.minValue, this.props.maxValue);
        const keys = this.props.allowSameValues &&
            this.lastKeyMoved === "min"
            ? this.getKeys().reverse()
            : this.getKeys();

        return keys.map((key) => {
            const value = values[key];
            const percentage = percentages[key];

            let { maxValue, minValue } = this.props;

            if (key === "min") {
                maxValue = values.max;
            } else {
                minValue = values.min;
            }

            const slider = (
                <Slider
                    ariaLabelledby={this.props.ariaLabelledby}
                    ariaControls={this.props.ariaControls}
                    classNames={this.props.classNames}
                    formatLabel={this.props.formatLabel}
                    key={key}
                    maxValue={maxValue}
                    minValue={minValue}
                    onSliderDrag={this.handleSliderDrag}
                    onSliderKeyDown={this.handleSliderKeyDown}
                    percentage={percentage}
                    type={key}
                    value={value} />
            );

            return slider;
        });
    }

    /**
     * Return JSX of hidden inputs
     * @private
     * @return {JSX.Element}
     */
    public renderHiddenInputs = () => {
        if (!this.props.name) {
            return [];
        }

        const isMultiValue = this.isMultiValue();
        const values = valueTransformer.getValueFromProps(this.props, isMultiValue);

        return this.getKeys().map((key) => {
            const value = values[key];
            const name = isMultiValue ? `${this.props.name}${captialize(key)}` : this.props.name;

            return (
                <input key={key} type="hidden" name={name} value={value} />
            );
        });
    }

    /**
     * @ignore
     * @override
     * @return {JSX.Element}
     */
    public render() {
        const componentClassName = this.getComponentClassName();
        const values = valueTransformer.getValueFromProps(this.props, this.isMultiValue());
        const percentages = valueTransformer.getPercentagesFromValues(values, this.props.minValue, this.props.maxValue);

        return (
            <div
                aria-disabled={this.props.disabled}
                ref={(node) => { this.node = node; }}
                className={componentClassName}
                onKeyDown={this.handleKeyDown}
                onKeyUp={this.handleKeyUp}
                onMouseDown={this.handleMouseDown}
                onTouchStart={this.handleTouchStart}>
                <Label
                    classLabel={this.props.classNames.labelDefaultPrice}
                    classNames={this.props.classNames}
                    formatLabel={this.props.formatLabel}
                    type="min">
                    {this.props.minValue}
                </Label>

                <Track
                    classNames={this.props.classNames}
                    draggableTrack={this.props.draggableTrack}
                    ref={(trackNode) => { this.trackNode = trackNode; }}
                    percentages={percentages}
                    onTrackDrag={this.handleTrackDrag}
                    onTrackMouseDown={this.handleTrackMouseDown}>

                    {this.renderSliders()}
                </Track>

                <Label
                    classLabel={this.props.classNames.labelDefaultPrice}
                    classNames={this.props.classNames}
                    formatLabel={this.props.formatLabel}
                    type="max">
                    {this.props.maxValue}
                </Label>

                {this.renderHiddenInputs()}
            </div>
        );
    }
}