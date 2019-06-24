import React from "react";
import s from "./Card.scss";
import { OrderPlaced, Item } from "../../../../../common/models/orderplaced.model";
import utilsService from "../../../../../website/routes/shared/services/utils-service";

type Prop = {
    item: Item;
};

export function Card(props: Prop) {
    const { price, imageUrl, name, quantity } = props.item;

    return (
        <div className={s.card}>
            <div className={s.image}>
                <img src={imageUrl} alt={name} />
            </div>
            <div className={s.informations}>
                <span className={s.name}>
                    <small>produto</small>
                    {utilsService.truncate(name, 3, "...")}
                </span>
                <span className={s.quantity}>
                    <span>{quantity} und</span>
                    <span>R$ {utilsService.parseMoney(price / 100)}</span>
                </span>
            </div>
        </div>
    );
}