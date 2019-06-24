
import s from "./BuyTogether.scss";
import React from "react";
import { Product, Sku, Item } from "../../../../../common/models/product.model";
import { CardWithSelector } from "./components/CardWithSelector/CardWithSelector";
import dataProduct from "../../../shared/services/data-product";
import SVGInline from "react-svg-inline";
import arrow from "../../../../assets/icons/arrow.svg";
import utilsService from "../../../shared/services/utils-service";
import buyTogether from "../../../../assets/icons/COMPRE_JUNTO_TEXT.svg";

export interface BuyTogetherProps {

}

export interface BuyTogetherState {
    product: Product;
    sku: Sku;
    loading: boolean;
    products: Product[];
    similars: Product[];
    similarsCurrent: Product[];
    current: Product;
    itemA: Item;
    itemB: Item;
    itemAId: any;
    itemBId: any;
    colorAName: any;
    colorBName: any;
    index: number;
}

export class BuyTogetherComponent extends React.Component<BuyTogetherProps, BuyTogetherState> {


    constructor(props: BuyTogetherProps) {
        super(props);
        this.state = {
            loading: true,
            product: null,
            similars: null,
            similarsCurrent: null,
            sku: null,
            products: null,
            current: null,
            itemA: null,
            itemB: null,
            itemAId: null,
            itemBId: null,
            colorAName: "",
            colorBName: "",
            index: 0,
        };
    }

    public reset = () => {
        this.setState({
            product: null,
            products: null,
            itemA: null,
            itemB: null,
            current: null,
            loading: true,
        });
    }

    public setCurrentSimilars = (similarsCurrent: Product[]) => {
        this.setState({
            similarsCurrent,
        });
    }

    public async loadProducts(product: Product, sku: Sku) {

        const data = await dataProduct.accessories(product.productId);

        let acessories: Product[] = [];

        for (let index = 0; index < data.length; index++) {
            const similar = data[index];
            const has = acessories.find((x) => x.productId === similar.productId);
            if (!has) {
                acessories.push(similar);
            }
        }

        const ids = acessories.map((acessorie) => `fq=productId:${acessorie.productId}`);
        acessories = await dataProduct.getProductByTerm(ids.join("&"));

        const similars: Product[] = [];

        for (let index = 0; index < acessories.length; index++) {
            const similar = acessories[index];
            const has = similars.find((x) => x.productId === similar.productId);
            if (!has) {
                similars.push(similar);
            }
        }

        await this.getRelations(similars);

        this.setState({
            product,
            sku,
            products: acessories,
            current: acessories[0],
            colorAName: product.productId,
            colorBName: acessories[0].productId,
            loading: false,
        });
    }

    public getRelations = async (products: Product[]) => {

        try {

            const relations: any[] = [];
            for (let index = 0; index < products.length; index++) {

                const product: Product = products[index];
                try {
                    const _products: Product[] = await dataProduct.getRelations(product.productId);
                    relations.push(_products);
                } catch (error) {
                    relations.push(null);
                }
            }

            const similars: any[] = [];

            for (let index = 0; index < relations.length; index++) {

                const _relations: Product[] = relations[index];

                if (_relations) {

                    const ids = _relations.map((relation: Product) => `fq=productId:${relation.productId}`);

                    const parsed: Product[] = await dataProduct.getProductByTerm(ids.join("&"));

                    similars.push(parsed);
                } else {
                    similars.push(null);
                }
            }

            this.setState({
                similars,
            });
        } catch (error) {
            console.warn("promessa rejeitada para consultar as cores!");
        }
    }

    public prev = () => {
        const { products, index } = this.state;

        this.setState({
            itemB: null,
            index: (index - 1) > -1 ? index - 1 : index,
            current: products[(index - 1) > -1 ? index - 1
                : index as any],
        });
    }

    public next = () => {
        const { products, index } = this.state;

        if ((index + 1) < products.length) {
            this.setState({
                current: null,
                itemB: null,
            }, () => {
                this.setState({
                    current: products[index + 1],
                    index: index + 1,
                });
            });
        }
    }

    public getPrice = () => {

        if (!this.state.itemA || !this.state.itemB) {

            let priceA: any = this.state.current && this.state.current.items.find((a) => a.sellers[0].commertialOffer.AvailableQuantity > 0);
            priceA = priceA && priceA.sellers[0].commertialOffer.Price;

            let priceB: any = this.state.product && this.state.product.items.find((a) => a.sellers[0].commertialOffer.AvailableQuantity > 0);
            priceB = priceB && priceB.sellers[0].commertialOffer.Price;

            if (!priceA || !priceB) {
                return "";
            }

            return utilsService.parseMoney(priceA + priceB, true);
        }

        return utilsService.parseMoney(this.state.itemA.sellers[0].commertialOffer.Price + this.state.itemB.sellers[0].commertialOffer.Price, true);
    }

    public render() {

        const { loading, product, sku, current, index, similarsCurrent } = this.state;

        return (
            <div className={s.content}>
                <div className={s.wrapper}>
                    <div className={s.titleWrapper}>
                        <SVGInline className={s.title} svg={buyTogether} />
                    </div>
                    <div className={s.cardSize}>
                        <CardWithSelector
                            change={(itemA: Item) => {
                                this.setState({
                                    itemA,
                                    itemAId: itemA.itemId,
                                });
                            }}
                            changeColor={(_product: Product) => {
                                if (_product) {
                                    this.setState({
                                        product: _product,
                                        colorAName: _product.productId,
                                        itemAId: "",
                                        itemA: null,
                                    });
                                }
                            }}
                            colorValue={this.state.colorAName}
                            value={this.state.itemAId}
                            similars={similarsCurrent}
                            product={product}
                            loading={loading} />
                    </div>
                    <div className={s.cardSize}>
                        <CardWithSelector
                            change={(itemB) => {
                                this.setState({
                                    itemB,
                                    itemBId: itemB.itemId,
                                });
                            }}
                            changeColor={(_product: Product) => {
                                if (_product) {
                                    this.setState({
                                        current: _product,
                                        colorBName: _product.productId,
                                        itemBId: "",
                                        itemB: null,
                                    });
                                }
                            }}
                            colorValue={this.state.colorBName}
                            value={this.state.itemBId}
                            similars={this.state.similars && this.state.similars.length > 0 && this.state.similars[index] as any}
                            product={current}
                            loading={loading}>
                            <button onClick={this.prev} className={[s.prev, s.button].join(" ")}>
                                <SVGInline className={s.icon} svg={arrow} />
                            </button>
                            <button onClick={this.next} className={[s.next, s.button].join(" ")}>
                                <SVGInline className={s.icon} svg={arrow} />
                            </button>
                        </CardWithSelector>
                    </div>
                    <div className={[s.cardSize, s.last, loading ? s.loading : ""].join(" ")}>
                        <div className={s.img}>
                            {!loading && <div className={s.contentcard}>
                                <h2 className={s.title}>Descrição:</h2>
                                {product && <p className={s.description} dangerouslySetInnerHTML={{ __html: product.description }}></p>}
                                <em className={s.money}>{this.getPrice()}</em>
                                <button
                                    onClick={async () => {
                                        const { itemA, itemB } = this.state;
                                        if (!itemA || !itemB) {
                                            alert("selecione o tamanho!");
                                            return;
                                        }
                                        try {
                                            window.loading(true);
                                            await vtexjs.checkout.addToCart([{
                                                id: itemA.itemId,
                                                quantity: 1,
                                                seller: 1,
                                            },
                                            {
                                                id: itemB.itemId,
                                                quantity: 1,
                                                seller: 1,
                                            }], null, 1);
                                            window.loading(false);
                                            window.dispatchEvent(new CustomEvent("update.minicart"));
                                            window.dispatchEvent(new CustomEvent("active.minicart", { detail: true }));
                                        } catch (error) {
                                            window.loading(false);
                                        }
                                    }}
                                    className={s.callToAction}>COMPRAR</button>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


