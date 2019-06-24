import React from "react";
import s from "./FlagsAttr.scss";
import { Product } from "../../../../../common/models/product.model";

type Props = {
    product: Product,
    withoutspace?: boolean,
    className?: string,
};

export function FlagsAttr(props: Props) {
    const { product } = props;

    const isGift = product.items[0].sellers[0].commertialOffer.GiftSkuIds.length > 0;
    return <div className={[s.flagsWrapper, props.withoutspace ? s.withoutspace : "", props.className].join(" ")}>
    </div>;
}