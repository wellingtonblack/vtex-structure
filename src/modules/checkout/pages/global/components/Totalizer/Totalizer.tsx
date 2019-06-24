import React from "react";
import s from "./Totalizer.scss";
import { OrderForm } from "../../../../../common/models/orderform.model";
import utilsService from "../../../../../website/routes/shared/services/utils-service";
import { List } from "../List/List";
import SVGInline from "react-svg-inline";
import warning from "../../../../assets/icons/warning.svg";

type Props = {
    orderForm: OrderForm;
};

type State = {
    orderForm: OrderForm;
};

export class TotalizerComponent extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {
            orderForm: this.props.orderForm,
        };
    }

    public update(orderForm: OrderForm) {
        this.setState({
            orderForm,
        });
    }

    public componentDidMount() {

    }

    public render() {

        const { orderForm } = this.state;

        const items = orderForm.totalizers.find((_item) => _item.id.toLowerCase() === "items");

        const shippingitem = orderForm.totalizers.find((_item) => _item.id.toLowerCase() === "shipping");

        const discountitem = orderForm.totalizers.find((_item) => _item.id.toLowerCase() === "discounts");

        const subtotal = items && items.value / 100;
        const shipping = shippingitem && shippingitem.value / 100;

        const discount = discountitem && (discountitem.value * -1) / 100;

        const subtotalFormated = items && utilsService.parseMoney(subtotal);
        const shippingFormated = shippingitem && utilsService.parseMoney(shipping);
        const discountitemFormated = discountitem && discount && utilsService.parseMoney(discount);
        const totalFormated = items && utilsService.parseMoney((subtotal + (shipping || 0)) - (discount || 0));
        const parcelsFormated = items && utilsService.parseMoney(subtotal / 8);

        return (
            [
                <header key={1} className={s.header}>
                    <h3 className={s.title}>resumo<br />
                        <span className={s.bold}>do seu pedido</span><span className={s.featured}>.</span></h3>
                    <span className={s.quantity}>
                        <span className={s.number}>{orderForm.items.length < 10 ? `0${orderForm.items.length}` : orderForm.items.length}</span>
                        <span className={s.label}>{orderForm.items.length > 1 ? "itens" : "item"}</span>
                    </span>
                </header>,
                <List key={2} orderForm={orderForm} />,
                subtotal && <div className={s.wrapperTotalizers} key={3}>
                    <ul className={s.list}>
                        <li className={s.fisrtLine}>
                            valor estimado
                    </li>
                        <li className={s.item}>
                            <div className={s.label}>subtotal:</div>
                            <div className={s.value}>r$ {subtotalFormated}</div>
                        </li>
                        {shipping >= 0 && <li className={s.item}>
                            <div className={s.label}>frete:</div>
                            <div className={s.value}> {shipping ? `r$ ${shippingFormated}` : "grátis"}</div>
                        </li>}
                        {discount && discount > 0 && <li className={s.item}>
                            <div className={s.label}>descontos:</div>
                            <div className={s.value}>r$ -{discountitemFormated}</div>
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
                    </ul>
                </div>,
                <div key={4} className={s.warningMessage}>
                    <SVGInline className={s.warning} svg={warning} />
                    <span className={s.text}>
                        em pagamento, <span>escolha pagar</span><br/>
                        <span>à vista</span> para ver o <span>preço com desconto</span>.
                    </span>
                </div>]
        );
    }
} 