import React from "react";
import s from "./List.scss";
import { OrderPlaced } from "../../../../../common/models/orderplaced.model";
import { Card } from "./Card";

type Prop = {
    order: OrderPlaced;
};

export function List(props: Prop) {

    const { items, shippingData } = props.order;

    const getDate = (day: string) => {
        const date = parseInt(day.replace("bd", ""));
        if (date === 1) {
            return `${date} dia útil`;
        } else {
            return `${date} dias úteis`;
        }
    };
    const logisticsInfo = shippingData.logisticsInfo[0];

    return (
        <div className={s.container}>

            <div className={s.logisticInfo}>
                <h2>Pacote</h2>
                <p>entrega estimada para {getDate(logisticsInfo.slas[0].shippingEstimate)}</p>
            </div>


            <div className={s.wrapper}>
                {items.map((item) => <Card item={item} />)}
            </div>
        </div>
    );
}