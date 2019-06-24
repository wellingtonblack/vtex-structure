import React from "react";
import dataProduct from "../shared/services/data-product";
import s from "./product.controller.scss";
import { BaseController } from "../base.controller";
import { ProductComponent } from "./Product";
import { ProductVtexjs } from "./models/ProductVtexjs";
import { Product, Sku } from "../../../common/models/product.model";
import { BuyTogetherComponent } from "./components/BuyTogether/BuyTogether";
import { ShelfComponent } from "./components/Shelf/Shelf";
import SVGInline from "react-svg-inline";
import seeTo from "../../assets/icons/VEJA_TAMBEM_TEXT.svg";
import "./product.controller.scss";


export class ProductController extends BaseController {
    constructor() {
        super();

        const productComponent: ProductComponent = this.renderComponent(
            <ProductComponent />, "#root-product") as any;

        const buyTogetherComponent: BuyTogetherComponent = this.renderComponent(
            <BuyTogetherComponent />, "#root-buy-together") as any;

        const shelfComponent: ShelfComponent = this.renderComponent(
            <ShelfComponent>
                <SVGInline className={s.seeToo} svg={seeTo} />
            </ShelfComponent>, "#root-saw-to") as any;

        new vtexjs.Catalog()
            .getCurrentProductWithVariations()
            .then(async (_data: ProductVtexjs) => {

                // load saw to
                dataProduct.whoboughtalsobought(_data.productId.toString()).then((products: Product[]) => {
                    shelfComponent.loadProducts(products);
                });

                let sku = _data.skus.find((res) => res.available);
                sku = sku || _data.skus[0];

                const requests: any = [];
                requests.push(dataProduct.getProductById(_data.productId.toString()));
                requests.push(dataProduct.getProductBySku(sku.sku.toString()));

                const data = await Promise.all(requests);

                const _product = data[0] as Product;
                const _sku = data[1] as Sku;

                window.addEventListener("change.product", (event: CustomEvent) => {
                    buyTogetherComponent.reset();
                    buyTogetherComponent.loadProducts(event.detail, _sku);
                });

                window.addEventListener("product.similars", (event: CustomEvent) => {
                    buyTogetherComponent.setCurrentSimilars(event.detail);
                });

                productComponent.loadProducts(_product, _sku);
                buyTogetherComponent.loadProducts(_product, _sku);

                dataProduct.setLastSaw(data[0] as Product);

            });
    }
}

export default new ProductController();