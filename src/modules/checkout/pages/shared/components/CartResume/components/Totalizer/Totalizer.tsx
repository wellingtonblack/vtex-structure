import React from "react";
import s from "./Totalizer.scss";
import { OrderForm } from "../../../../../../../common/models/orderform.model";
import utilsService from "../../../../../../../website/routes/shared/services/utils-service";
import { CupomComponent } from "../Cupom/Cupom";

type Props = {
    orderForm: OrderForm;
};

export function Totalizer(props: Props) {

    const { orderForm } = props;

    const items = orderForm.totalizers.find((_item) => _item.id.toLowerCase() === "items");

    const shippingitem = orderForm.totalizers.find((_item) => _item.id.toLowerCase() === "shipping");

    const discountitem = orderForm.totalizers.find((_item) => _item.id.toLowerCase() === "discounts");

    const subtotal = items && items.value / 100;
    const shipping = shippingitem && shippingitem.value / 100;
    const bullet = utilsService.boletopercentage(subtotal);
    let discount = discountitem && (discountitem.value * -1) / 100;
    discount -= bullet;

    const subtotalFormated = items && utilsService.parseMoney(subtotal);
    const shippingFormated = shippingitem && utilsService.parseMoney(shipping);
    const discountitemFormated = discountitem && discount && utilsService.parseMoney(discount);
    const totalFormated = items && utilsService.parseMoney(subtotal + (shipping || 0));
    const parcelsFormated = items && utilsService.parseMoney(subtotal / 8);
    const bulletFormated = items && utilsService.parseMoney(bullet + (shipping || 0));

    return (
        subtotal && <div>
            <ul className={s.list}>
                <li className={s.fisrtLine}>
                    valor estimado
            </li>
                <li className={s.cupom}>
                    <CupomComponent orderForm={orderForm} />
                </li>
                <li className={s.item}>
                    <div className={s.label}>subtotal:</div>
                    <div className={s.value}>r$ {subtotalFormated}</div>
                </li>
                {discount && discount > 0 ? <li className={s.item}>
                    <div className={s.label}>descontos:</div>
                    <div className={s.value}>r$ -{discountitemFormated}</div>
                </li> : ""}
                {shipping >= 0 && <li className={s.item}>
                    <div className={s.label}>frete:</div>
                    <div className={s.value}> {shipping ? `r$ ${shippingFormated}` : "grátis"}</div>
                </li>}
            </ul>
            <ul className={s.totalList}>
                <li className={s.item}>
                    <div className={s.label}>total:</div>
                    <div className={s.value}><span className={s.total}>r$ {totalFormated}</span></div>
                </li>
                <li className={s.itemParcels}>
                    em até <span>8x</span> sem juros de <span>{parcelsFormated}</span>
                </li>
                <li className={s.discountPrice}>
                    ou a vista: <div className={s.tagDiscount}>
                        <span className={s.priceDiscount}>r$ {bulletFormated}</span>
                        <span className={s.percentage}>- 10% off</span>
                    </div>
                </li>
            </ul>
        </div>
    );
}