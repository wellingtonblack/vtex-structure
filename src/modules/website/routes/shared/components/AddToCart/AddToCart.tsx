import * as React from "react";
import s from "./AddToCart.scss";
import { Product, Item } from "../../../../../common/models/product.model";
import { OrderForm } from "../../../../../common/models/orderform.model";
export interface AddToCartProps {
    className?: string;
    product: Product;
}

export interface AddToCartState {
    quantity: number;
    maxQuantity: number;
    skuSelected: Item;
    isAdd: boolean;
}

export class AddToCartComponent extends React.Component<AddToCartProps, AddToCartState> {

    constructor(props: AddToCartProps) {
        super(props);

        window.addEventListener("update.quantity", this.updateQuantity);

        this.state = {
            quantity: 1,
            maxQuantity: this.props.product.items[0].sellers[0].commertialOffer.AvailableQuantity,
            skuSelected: this.props.product.items[0],
            isAdd: false,
        };
    }

    public componentDidMount() {
        this.updateQuantity();
    }

    public async componentWillReceiveProps(props: AddToCartProps) {
        this.setState({
            quantity: 1,
            maxQuantity: props.product.items[0].sellers[0].commertialOffer.AvailableQuantity,
            skuSelected: props.product.items[0],
            isAdd: false,
        });
        const orderForm: OrderForm = vtexjs.checkout.orderForm;

        if (!orderForm) {
            return;
        }

        const itemReturn = await orderForm.items.find((item) => item.id === this.props.product.items[0].itemId);

        if (itemReturn) {
            this.setState({
                quantity: itemReturn.quantity,
                isAdd: true,
            });
        } else {
            this.setState({
                quantity: 1,
                isAdd: false,
            });
        }
    }

    public updateQuantity = async () => {
        const interval = setInterval(async () => {

            const orderForm: OrderForm = vtexjs.checkout.orderForm;

            if (!orderForm) {
                return;
            }

            const itemReturn = await orderForm.items.find((item) => item.id === this.props.product.items[0].itemId);

            if (itemReturn) {
                this.setState({
                    quantity: itemReturn.quantity,
                    isAdd: true,
                });
            } else {
                this.setState({
                    quantity: 1,
                    isAdd: false,
                });
            }

            clearInterval(interval);

        }, 500);
    }

    public add = async (event: any) => {
        event.preventDefault();
        event.stopPropagation();

        if ((this.state.quantity + 1) <= this.state.maxQuantity) {
            this.setState({
                quantity: this.state.quantity + 1,
            }, async () => {
                this.buy(event);
            });
        }
    }

    public remove = async (event: any) => {
        event.preventDefault();
        event.stopPropagation();

        if ((this.state.quantity - 1) >= 0) {
            this.setState({
                quantity: this.state.quantity - 1,
            }, async () => {
                this.buy(event);
            });
        } else {
            this.buy(event);
        }
    }

    public buy = async (event: React.MouseEvent<any>) => {
        event.preventDefault();
        event.stopPropagation();

        window.loading(true);

        try {
            const orderForm: OrderForm = await vtexjs.checkout.getOrderForm();

            const itemReturn = await orderForm.items.find((item) => item.id === this.props.product.items[0].itemId);


            if (itemReturn) {
                await vtexjs.checkout.updateItems([{
                    index: orderForm.items.indexOf(itemReturn),
                    quantity: this.state.quantity,
                }], 1);
            } else {
                await vtexjs.checkout.addToCart([{
                    id: this.state.skuSelected.itemId,
                    quantity: this.state.quantity,
                    seller: 1,
                }], null, 1);
            }

            window.loading(false);
            window.dispatchEvent(new CustomEvent("update.minicart"));
            window.dispatchEvent(new CustomEvent("active.minicart", { detail: true }));
        } catch (error) {
            window.loading(false);
        }
    }

    public render() {

        return (
            this.state.maxQuantity > 0 && <div className={[s.addToCart, this.props.className, "addToCart"].join(" ")}>
                {/* <div className={s.wrapperQuantity}>
                    <a onClick={this.remove} className={s.remove}>-</a>
                    <input type="text" value={this.state.quantity < 10 ? `0${this.state.quantity}` : this.state.quantity} />
                    <a onClick={this.add} className={s.add}>+</a>
                </div> */}
                <button
                    onClick={this.buy}
                    className={s.wrapperText}>
                    {this.state.isAdd ? "adicionado" : "adicionar"}
                </button>
            </div>
        );
    }
}
