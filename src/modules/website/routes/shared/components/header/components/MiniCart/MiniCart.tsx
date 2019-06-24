import * as React from "react";
import { OrderForm } from "../../../../../../../common/models/orderform.model";
import { PercentageComponent } from "./components/Percentage/Percentage";
import SVGInline from "react-svg-inline";
import utilsService from "../../../../services/utils-service";
import { Frete } from "../../../../models/frete.model";
import { SubTotalsComponent } from "./components/SubTotals/SubTotals";
import s from "./MiniCart.scss";

import remove from "../../../../../../assets/icons/bag.svg";
import close from "../../../../../../assets/icons/close-navigation-mobile.svg";
import { CepComponent } from "../../../Cep/Cep";

export interface MiniCartProps {
    handleUpdate(orderForm: OrderForm): void;
    handleIsShow?(state: boolean): void;
}

export interface MiniCartState {
    orderForm: OrderForm;
    show: boolean;
    loading: boolean;
    frete: Frete;
    active: boolean;
}

export class MiniCartComponent extends React.Component<MiniCartProps, MiniCartState> {

    public cep: CepComponent;

    constructor(props: MiniCartProps) {
        super(props);

        this.state = {
            orderForm: vtexjs && vtexjs.checkout && vtexjs.checkout.orderForm,
            show: false,
            loading: false,
            frete: null,
            active: false,
        };

        window.addEventListener("update.minicart", (e) => {
            this.updateOrderForm();
        });

        window.addEventListener("update.minicart.cep", (e) => {
            this.cep && this.cep.update && this.cep.update();
        });

        window.addEventListener("active.minicart", (e: CustomEvent) => {
            this.setState({
                show: e.detail,
            }, () => {
                this.props.handleIsShow && this.props.handleIsShow(e.detail);
            });
        });
    }

    public componentWillMount() {
        this.updateOrderForm();
    }

    public updateOrderForm = () => {
        this.setState({
            loading: true,
        }, () => {
            window.loading(true);
            vtexjs.checkout.getOrderForm()
                .then((orderForm: OrderForm) => {
                    this.setState({
                        orderForm,
                    }, () => {
                        window.loading(false);
                        this.props.handleUpdate(this.state.orderForm);
                        window.dispatchEvent(new CustomEvent("update.quantity"));
                    });
                }, () => {
                    window.loading(false);
                });
        });
    }

    public closeCart = () => {
        this.setState({
            show: false,
        }, () => {
            this.props.handleIsShow && this.props.handleIsShow(false);
        });
    }

    public render() {
        const { orderForm, frete } = this.state;

        let itemsTotal: any =
            orderForm &&
            orderForm.totalizers &&
            orderForm.totalizers.length > 0 &&
            orderForm.totalizers.find((total) => total.id === "Items");

        itemsTotal = itemsTotal && itemsTotal.value / 100;

        return (
            [orderForm ? (
                <section key={1} className={[s.miniCartComponent, this.state.show ? s.active : s.inactive, orderForm.items.length === 0 ? s.empty : ""].join(" ")}>
                    <div className={s.scroller}>
                        <div className={[s.wrapper1, orderForm.items.length === 0 ? s.empty : ""].join(" ")}>
                            <button onClick={this.closeCart} className={s.buttonClose}><SVGInline className={s.icon} svg={close} /> fechar</button>
                            <header className={s.header}>
                                <h2 className={s.title}>
                                    minha sacola
                                </h2>
                                {orderForm.items.length > 0 && <div className={s.items}>
                                    <span>{orderForm.items.length < 9 ? `0${orderForm.items.length}` : orderForm.items.length}</span>
                                    {orderForm.items.length === 1 ? " - item" : " - itens"}
                                </div>}
                            </header>
                            {<section className={s.wrapperProducts}>
                                <ul>
                                    {orderForm.items.map((item, index) => (
                                        <li
                                            key={index}
                                            className={s.productItem}>
                                            <div className={s.wrapperInformation}>
                                                <div className={s.informations}>
                                                    <div className={s.name}>{item.name}</div>
                                                    {item.listPrice > item.sellingPrice ?
                                                        <div className={s.oldPrice}>
                                                            <em>de: {utilsService.parseMoney(item.listPrice / 100)}</em>
                                                        </div> : ""}
                                                    <div className={s.price}>
                                                        <em className={s.number}>r$ {utilsService.parseMoney(item.sellingPrice / 100)}</em>
                                                        {/* <PercentageComponent /> */}
                                                    </div>
                                                    <div className={s.quantity}>
                                                        <div className={s.remove} onClick={() => {
                                                            window.loading(true);
                                                            vtexjs.checkout.updateItems([{
                                                                index,
                                                                quantity: item.quantity - 1,
                                                            }]).then(() => {
                                                                window.loading(false);
                                                                this.updateOrderForm();
                                                            }, () => {
                                                                window.loading(false);
                                                                this.updateOrderForm();
                                                            });
                                                        }}>-</div>
                                                        <input className={s.inputquantity} readOnly={true} type="text" value={item.quantity < 9 ? `0${item.quantity}` : item.quantity} />und
                                                        <div className={s.add} onClick={() => {
                                                            window.loading(true);
                                                            vtexjs.checkout.updateItems([{
                                                                index,
                                                                quantity: item.quantity + 1,
                                                            }]).then(() => {
                                                                window.loading(false);
                                                                this.updateOrderForm();

                                                            }, () => {
                                                                window.loading(false);
                                                                this.updateOrderForm();
                                                            });
                                                        }}>+</div>
                                                    </div>
                                                </div>
                                                <div className={s.remove}>
                                                    <span
                                                        onClick={async () => {
                                                            try {
                                                                window.loading(true);
                                                                await vtexjs.checkout.removeItems([
                                                                    {
                                                                        index,
                                                                        quantity: 0,
                                                                    },
                                                                ]);

                                                                window.loading(false);
                                                                this.updateOrderForm();
                                                            } catch (error) {

                                                                window.loading(false);
                                                                this.updateOrderForm();
                                                            }
                                                        }}
                                                        className={s.iconRemove}>
                                                        <SVGInline svg={remove} />
                                                        excluir da sacola
                                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                style={{ backgroundImage: `url('${utilsService.cropImage(150, 215, item.imageUrl).replace(/http:\/\//, "//")}')` }}
                                                className={s.image} ></div>
                                        </li>
                                    ))}
                                </ul>
                            </section>}
                        </div>
                        {orderForm.items.length === 0 && <div className={s.emptyCart}>
                            <div className={s.wrapperEmpty}>
                                <h2 className={s.emptyTitle}>sua sacola está vazia</h2>
                            </div>
                        </div>}
                        <div className={s.wrapper2}>
                            <footer>
                                {orderForm.items.length > 0 && <CepComponent
                                    ref={(ref) => { this.cep = ref; }}
                                    handleCep={(_frete: Frete) => {
                                        window.dispatchEvent(new Event("update.cep"));
                                        this.setState({
                                            frete: _frete,
                                        });
                                    }} />}
                                {orderForm.items.length > 0 && orderForm && <SubTotalsComponent
                                    handleCalcWithDiscount={(active) => {
                                        this.setState({
                                            active,
                                        });
                                    }}
                                    orderForm={orderForm} />}
                                <div className={s.wrapperButtons}>
                                    {orderForm.items.length > 0 && <a className={s.buttonEndOrder} href="/checkout">
                                        <span>finalizar compra</span>
                                    </a>}
                                    <a onClick={this.closeCart} className={s.buttonBuyAgain}>
                                        <span>continuar comprando</span>
                                    </a>
                                </div>
                            </footer>
                        </div>
                    </div>
                </section>
            ) : "",
            this.state.show && <div key={2} onClick={this.closeCart} className={[s.mask, s.fadeIn].join(" ")}></div>]
        );
    }
}