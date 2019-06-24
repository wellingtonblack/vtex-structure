import * as React from "react";
import s from "./Product.scss";
import { Product, Sku } from "../../../common/models/product.model";
import { SliderComponent } from "./components/Slider/Slider";
import { ProductInformationsComponent } from "./components/ProductInformations/ProductInformations";
import { ProductSelectorComponent } from "./components/ProductSelector/ProductSelector";
import dataProduct from "../shared/services/data-product";
import { Color } from "../shared/models/Color";
import dataStore from "../shared/services/data-store";
import { ButtonAdjustsComponent } from "./components/ButtonAdjust/ButtonAdjust";
import { CustomInfos } from "./components/ButtonAdjust/component/models/infos";
import dataCategory from "../shared/services/data-category";

export interface ProductProps {

}

export interface ProductState {
    product: Product;
    similars: Product[];
    sku: Sku;
    colors: Color[];
    loading: boolean;
}

declare const costumePoints: CustomInfos;

export class ProductComponent extends React.Component<ProductProps, ProductState> {

    constructor(props: ProductProps) {
        super(props);
        this.state = {
            product: null,
            similars: null,
            sku: null,
            colors: null,
            loading: true,
        };
    }

    public async loadProducts(product: Product, sku: Sku) {

        this.setState({
            loading: true,
        }, async () => {

            this.setState({
                product,
                sku,
                loading: false,
            });

            const data = await dataProduct.getRelations(product.productId);

            let similars: Product[] = [];

            for (let index = 0; index < data.length; index++) {
                const similar = data[index];
                const has = similars.find((x) => x.productId === similar.productId);
                if (!has) {
                    similars.push(similar);
                }
            }

            dataStore.getColors().then((colors) => {
                this.setState({
                    colors,
                });
            });

            const ids = similars.map((similar) => `fq=productId:${similar.productId}`);
            similars = await dataProduct.getProductByTerm(ids.join("&"));
            window.dispatchEvent(new CustomEvent("product.similars", { detail: similars }));

            this.setState({
                similars,
            });
        });
    }

    public async componentDidMount() {
    }

    public componentWillMount() {
    }

    public render() {
        const { product, sku, similars, loading, colors } = this.state;

        return (<div className={s.container}>
            <div className={s.left}>
                <div className={[s.slider, loading ? s.loading : ""].join(" ")}>
                    {!loading && <SliderComponent
                        product={product}
                        images={sku.Images} />}
                </div>
            </div>
            <div className={s.right}>
                <ProductInformationsComponent
                    product={product}
                    sku={sku}
                    loading={loading} />
                <ProductSelectorComponent
                    changeProduct={async (_product: Product) => {
                        this.setState({
                            loading: true,
                            sku: null,
                            product: null,
                        }, async () => {
                            const event = new CustomEvent("change.product", { detail: _product });
                            window.dispatchEvent(event);
                            const _sku = await dataProduct.getProductBySku(_product.items[0].itemId);
                            this.setState({ product: _product, sku: _sku, loading: false });
                        });
                    }}
                    colors={colors}
                    similars={similars}
                    product={product}
                    sku={sku}
                    loading={loading} />
                <div className={[s.description].join(" ")}>
                    {!loading && <div className={[s.text].join(" ")} dangerouslySetInnerHTML={{ __html: product && product.description }}></div>}
                    {loading && <div className={[s.text, s.loading].join(" ")}></div>}
                    {loading && <div className={[s.text, s.loading].join(" ")}></div>}
                    {loading && <div className={[s.text, s.loading].join(" ")}></div>}
                    {loading && <div className={[s.text, s.loading].join(" ")}></div>}
                    {loading && <div className={[s.text, s.loading, s.haf].join(" ")}></div>}
                </div>
                {/* button shows only category 46 (costume) */}
                {(this.state.product && this.state.product.categoryId && this.state.product.categoryId === "46") && <ButtonAdjustsComponent items={costumePoints} />}
            </div>
        </div>);
    }
}


