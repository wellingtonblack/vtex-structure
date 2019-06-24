import React from "react";

export interface TrackProps {
    children: any;
    classNames: any;
    draggableTrack: boolean;
    percentages: any;
    onTrackDrag(event: any, trackDragEvent: any): void;
    onTrackMouseDown(event: any, position: any): void;
}

export interface TrackState {

}

/**
 * @ignore
 */
export default class Track extends React.Component<TrackProps, TrackState> {

    public node: HTMLDivElement = null;
    public trackDragEvent: any = null;

    /**
     * @override
     * @return {Object}
     * @property {Function} children
     * @property {Function} classNames
     * @property {Boolean} draggableTrack
     * @property {Function} onTrackDrag
     * @property {Function} onTrackMouseDown
     * @property {Function} percentages
     */


    /**
     * @param {Object} props
     * @param {InputRangeClassNames} props.classNames
     * @param {Boolean} props.draggableTrack
     * @param {Function} props.onTrackDrag
     * @param {Function} props.onTrackMouseDown
     * @param {number} props.percentages
     */
    constructor(props: TrackProps) {
        super(props);

        /**
         * @private
         * @type {?Component}
         */

        this.trackDragEvent = null;
    }

    /**
     * @private
     * @return {ClientRect}
     */
    public getClientRect() {
        return this.node.getBoundingClientRect();
    }

    /**
     * @private
     * @return {Object} CSS styles
     */
    public getActiveTrackStyle() {
        const width = `${(this.props.percentages.max - this.props.percentages.min) * 100}%`;
        const left = `${this.props.percentages.min * 100}%`;

        return { left, width };
    }

    /**
     * Listen to mousemove event
     * @private
     * @return {void}
     */
    public addDocumentMouseMoveListener() {
        this.removeDocumentMouseMoveListener();
        this.node.ownerDocument.addEventListener("mousemove", this.handleMouseMove);
    }

    /**
     * Listen to mouseup event
     * @private
     * @return {void}
     */
    public addDocumentMouseUpListener() {
        this.removeDocumentMouseUpListener();
        this.node.ownerDocument.addEventListener("mouseup", this.handleMouseUp);
    }

    /**
     * @private
     * @return {void}
     */
    public removeDocumentMouseMoveListener() {
        this.node.ownerDocument.removeEventListener("mousemove", this.handleMouseMove);
    }

    /**
     * @private
     * @return {void}
     */
    public removeDocumentMouseUpListener() {
        this.node.ownerDocument.removeEventListener("mouseup", this.handleMouseUp);
    }

    /**
     * @private
     * @param {SyntheticEvent} event
     * @return {void}
     */
    public handleMouseMove(event: any) {
        if (!this.props.draggableTrack) {
            return;
        }

        if (this.trackDragEvent !== null) {
            this.props.onTrackDrag(event, this.trackDragEvent);
        }

        this.trackDragEvent = event;
    }

    /**
     * @private
     * @return {void}
     */
    public handleMouseUp() {
        if (!this.props.draggableTrack) {
            return;
        }

        this.removeDocumentMouseMoveListener();
        this.removeDocumentMouseUpListener();
        this.trackDragEvent = null;
    }

    /**
     * @private
     * @param {SyntheticEvent} event - User event
     */
    public handleMouseDown(event: any) {
        const clientX = event.touches ? event.touches[0].clientX : event.clientX;
        const trackClientRect = this.getClientRect();
        const position = {
            x: clientX - trackClientRect.left,
            y: 0,
        };

        this.props.onTrackMouseDown(event, position);

        if (this.props.draggableTrack) {
            this.addDocumentMouseMoveListener();
            this.addDocumentMouseUpListener();
        }
    }

    /**
     * @private
     * @param {SyntheticEvent} event - User event
     */
    public handleTouchStart(event: any) {
        event.preventDefault();
        this.handleMouseDown(event);
    }

    /**
     * @override
     * @return {JSX.Element}
     */
    public render() {
        const activeTrackStyle = this.getActiveTrackStyle();

        return (
            <div
                className={this.props.classNames.track}
                onMouseDown={this.handleMouseDown}
                onTouchStart={this.handleTouchStart}
                ref={(node) => { this.node = node; }}>
                <div
                    style={activeTrackStyle}
                    className={this.props.classNames.activeTrack} />
                {this.props.children}
            </div>
        );
    }
}