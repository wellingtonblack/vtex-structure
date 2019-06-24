import { OrderForm } from "../../../../../common/models/orderform.model";
import React from "react";
import s from "./List.scss";
import utilsService from "../../../../../website/routes/shared/services/utils-service";
import { ImageComponent } from "../../../../../website/routes/shared/components/Image/Image";

type Props = {
    orderForm: OrderForm;
};

export function List(props: Props) {
    const { items } = props.orderForm;
    return (
        <ul className={s.list}>
            {items.map((item, index) => <li key={index} className={s.item}>
                <div className={s.imagebox}>
                    <div className={s.image} style={{ backgroundImage: `url('${utilsService.cropImage(80, 80, item.imageUrl).replace(/http:\/\//, "//")}')` }} >

                    </div>
                </div>
                <div className={s.info}>
                    <div className={s.name}>{utilsService.truncate(item.name, 3, "...")}</div>
                    <div className={s.quantity}>{item.quantity} und</div>
                </div>
                <div className={s.total}>{utilsService.parseMoney((item.price * item.quantity) / 100)}</div>
            </li>)}
        </ul>
    );
}