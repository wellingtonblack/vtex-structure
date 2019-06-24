
import React from "react";
import s from "./ProductSelector.scss";
import utilsService from "../../../shared/services/utils-service";
import { Product, Sku, Item, Seller, Installment } from "../../../../../common/models/product.model";
import { Color } from "../../../shared/models/Color";
import { VirtualTasterComponent } from "../virtual-taster/virtual-taster.component";
import { WarnMeComponent } from "../../../shared/components/WarnMe/WarnMe";
export interface ProductSelectorProps {
    product: Product;
    sku: Sku;
    similars: Product[];
    loading: boolean;
    colors: Color[];
    changeProduct(product: Product): void;
}

export interface ProductSelectorState {
    item: Item;
    sku: Sku;
    hasSelected: boolean;
}

export class ProductSelectorComponent extends React.Component<ProductSelectorProps, ProductSelectorState> {

    constructor(props: ProductSelectorProps) {
        super(props);
        this.state = {
            item: null,
            sku: this.props.sku,
            hasSelected: false,
        };
    }

    public async componentDidMount() {
        if (!this.props.product) {
            this.setState({
                item: null,
            });
            return;
        }
        // this.setState({
        //     item: this.props.product.items.find((item) => item.sellers[0].commertialOffer.AvailableQuantity > 0) || this.props.product.items[0],
        // });
    }

    public componentWillReceiveProps(props: ProductSelectorProps) {
        if (!props.product) {
            this.setState({
                item: null,
                sku: props.sku,
            }, () => console.log(this.state));
            return;
        }

        // this.setState({
        //     item: props.product.items.find((item) => item.sellers[0].commertialOffer.AvailableQuantity > 0) || props.product.items[0],
        // });
    }

    public render() {
        const { loading } = this.props;
        const similars: Product[] = this.props.similars;
        const { items }: Product = this.props.product || {} as any;
        const itemReturn = items && items.find((item) => item.sellers[0].commertialOffer.AvailableQuantity > 0);

        const seller: Seller = (items && this.state.item && this.state.item.sellers[0]) || (itemReturn && itemReturn.sellers[0]) || null;

        const installments = seller && utilsService.groupBy(seller.commertialOffer.Installments, "PaymentSystemName");
        let installment: Installment[] = null;

        const keys = installments && Object.keys(installments);

        if (keys) {
            for (let index = 0; index < keys.length; index++) {
                const key = keys[index];
                if (key === "Mastercard" || key === "Visa" || key === "American Express") {
                    installment = installments[key];
                    break;
                }
            }
        }

        const classLoading = loading ? s.loading : "";

        const sorted = items && items.sort((a, b) => {

            // const x = items.indexOf(a);
            // const y = items.indexOf(b);

            // if (x < y) {
            //     return -1;
            // }
            // if (x > y) {
            //     return 1;
            // }
            // return 0;
            return parseFloat(a.Tamanho[0]) - parseFloat(b.Tamanho[0]);
        });

        return (
            <div className={s.container}>
                {this.state.item && this.state.item.sellers[0].commertialOffer.AvailableQuantity === 0 ? <div className={s.boxAviseMe}>
                <WarnMeComponent item={this.state.item}/>
                    
                </div> :
                    <div className={s.boxPrice}>
                        <em className={[s.oldPrice, classLoading, s.haf].join(" ")}>{seller && seller.commertialOffer.Price < seller.commertialOffer.ListPrice && `de:${utilsService.parseMoney(seller.commertialOffer.ListPrice)}`}</em>
                        <em className={[s.newPrice, classLoading, s.haf].join(" ")}>{seller && `por: ${utilsService.parseMoney(seller.commertialOffer.Price)}`}</em>
                        <span className={[s.parcels, classLoading, s.haf].join(" ")}>
                            {installment && `ou em até ${installment[installment.length - 1].NumberOfInstallments} de ${utilsService.parseMoney(installment[installment.length - 1].Value, true)}`}
                        </span>
                    </div>
                }
                <React.Fragment>
                    <div className={s.colorBox}>
                        <span className={s.label}>cores:</span>
                        <ul className={[s.list, !similars ? s.loading : ""].join(" ")}>
                            {!loading && similars && similars.map((product) => {

                                const _color = this.props.colors && this.props.colors.find((x) => x.name.toLowerCase() === product.Cor[0].toLowerCase());

                                return (<li
                                    onClick={() => { this.props.changeProduct(product); }}
                                    className={[s.color, product.productId === this.props.product.productId ? s.active : ""].join(" ")}>
                                    <span style={{ backgroundColor: _color && _color.value }}></span>
                                </li>);
                            })}
                        </ul>
                    </div>
                    <div className={s.sizeBox}>
                        <span className={s.label}>tamanho:</span>
                        <ul className={[s.list, classLoading].join(" ")}>
                            {sorted && sorted.map((item) => {

                                return (<li
                                    onClick={() => {
                                        this.setState({
                                            item,
                                        });
                                    }}
                                    className={[this.state.item && item.itemId === this.state.item.itemId && s.active, item.sellers[0].commertialOffer.AvailableQuantity <= 0 ? s.stockOutOff : ""].join(" ")}>{item.Tamanho[0]}</li>);
                            })}
                        </ul>
                    </div>
                </React.Fragment>
                <div className={s.callToAction}>
                    <button
                        disabled={this.state.item && this.state.item.sellers[0].commertialOffer.AvailableQuantity === 0}
                        onClick={async () => {
                            if (!this.state.item) {
                                alert("selecione um tamanho!");
                                return;
                            }
                            try {
                                window.loading(true);
                                const sellernum = `${Cookies.get("VTEXSC")}`.replace("sc=", "");
                                const _seller = {
                                    id: this.state.item.itemId,
                                    quantity: 1,
                                    seller: 1,
                                };
                                await vtexjs.checkout.addToCart([_seller], null, (sellernum && parseInt(sellernum)) || 1);
                                window.loading(false);
                                window.dispatchEvent(new CustomEvent("update.minicart"));
                                window.dispatchEvent(new CustomEvent("active.minicart", { detail: true }));
                            } catch (error) {
                                window.loading(false);
                            }
                        }}
                        className={[s.button, this.state.item && this.state.item.sellers[0].commertialOffer.AvailableQuantity === 0 ? s.disable : ""].join(" ")}>comprar</button>
                </div>
                <VirtualTasterComponent />
            </div>
        );
    }
}


