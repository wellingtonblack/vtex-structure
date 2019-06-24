import React from "react";

interface LabelProps {
    children: any;
    classNames: any;
    classLabel?: string;
    type: string;
    formatLabel(children: any, type: string): void;
}

/**
 * @ignore
 * @param {Object} props
 * @param {InputRangeClassNames} props.classNames
 * @param {Function} props.formatLabel
 * @param {string} props.type
 */
export function Label(props: LabelProps) {
    const labelValue = props.formatLabel ? props.formatLabel(props.children, props.type) : props.children;

    return (
        <span className={props.classNames[`${props.type}Label`]}>
            <span className={[props.classNames.labelContainer, props.classLabel].join(" ")}>
                {labelValue}
            </span>
        </span>
    );
}

