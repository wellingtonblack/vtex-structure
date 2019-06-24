import React from "react";
import s from "./OrderDetail.scss";
import { OrderPlaced, Payment } from "../../../../../common/models/orderplaced.model";
import utilsService from "../../../../../website/routes/shared/services/utils-service";
import SVGInline from "react-svg-inline";
import boleto from "../../../../assets/icons/boleto.svg";
import credito from "../../../../assets/icons/cartao-de-credito.svg";

type Prop = {
    order: OrderPlaced;
};


export function OrderDetail(props: Prop) {
    const { clientProfileData, value, orderId, shippingData, paymentData, totals } = props.order;

    const getPayment = (payment: Payment) => {
        switch (payment.group) {
            case "bankInvoice":
                return <div className={s.boletoWrapper}>
                    <span className={s.labelPayment}><SVGInline className={s.icon} svg={boleto} />boleto bancário</span>
                    <div className={s.value}><span className={s.labelPrice}>R$ {utilsService.parseMoney(payment.value / 100)}</span> à vista.</div>
                </div>;
                break;
            case "creditCard":
                return <div className={s.creditWrapper}>
                    <span className={s.labelPayment}><SVGInline className={s.icon} svg={credito} />cartão de crédito</span>
                    <div className={s.creditCardNumber}>{payment.firstDigits}{payment.lastDigits}</div>
                    <div className={s.value}><span className={s.labelParcels}>{payment.installments}X de</span> <span className={s.labelPrice}>R$ {utilsService.parseMoney((payment.value / 100) / payment.installments)}</span> {payment.installments === 1 && "à vista."}</div>
                </div>;
                break;
            default:
                break;
        }
    };

    const getLabel = (label: string) => {
        switch (label) {
            case "Items":
                return "subtotal:";
                break;
            case "Discounts":
                return "desconto:";
                break;
            case "Shipping":
                return "frete:";
                break;
            case "Tax":
                return "taxa:";
                break;
            default:
                break;
        }
    };

    return (
        <div className={s.wrapper}>
            <h2>
                <small>pedido</small>
                {orderId}
            </h2>
            <div className={s.content}>
                <div className={[s.box, s.addressBox].join(" ")}>
                    <label className={s.label}>endereço</label>
                    <ul className={s.address}>
                        <li>{shippingData.address.receiverName}</li>
                        <li>{shippingData.address.street}</li>
                        <li>{shippingData.address.neighborhood} - {shippingData.address.city} - {shippingData.address.state}</li>
                        <li>{shippingData.address.postalCode}</li>
                        <li>{shippingData.address.country}</li>
                        <li>{clientProfileData.phone}</li>
                    </ul>
                </div>
                <div className={[s.box, s.paymentBox].join(" ")}>
                    <label className={s.label}>forma de pagamento</label>
                    {paymentData.transactions.map((transaction) => (
                        <div className={s.transaction}>
                            {transaction.payments.map((payment) => (
                                getPayment(payment)
                            ))}
                        </div>
                    ))}
                </div>
                <div className={[s.box, s.totalBox].join(" ")}>
                    <label className={s.label}>resumo</label>
                    <ul className={s.listSubtotals}>
                        {totals.map((total) => (
                            <li className={s.itemTotal}>
                                <span className={s.labelTotal}>
                                    {getLabel(total.id)}
                                </span>
                                <span className={s.valueTotal}>
                                    {total.value > 0 || total.value * -1 > 0 ? `R$ ${utilsService.parseMoney(total.value / 100)}` : total.id !== "Discounts" && total.id !== "Tax" ? "grátis" : "0,00"}
                                </span>
                            </li>
                        ))}
                        <li className={[s.itemTotal, s.total].join(" ")}>
                            <span className={s.labelTotal}>
                                total:
                            </span>
                            <span className={s.valueTotal}>
                                R$ {utilsService.parseMoney(value / 100)}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}