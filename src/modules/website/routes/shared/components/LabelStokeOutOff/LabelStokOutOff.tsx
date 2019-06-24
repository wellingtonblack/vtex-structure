import React from "react";
import s from "./LabelStokOutOff.scss";

interface Props  {
    className?: string;
}
export function LabelStokOutOff(props: Props) {
    return <em className={[s.unavaible, props.className].join(" ")}>esgotado</em>;
}