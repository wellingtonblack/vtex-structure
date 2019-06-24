
import s from "./ProductInformations.scss";
import { Product, Sku } from "../../../../../common/models/product.model";
import React from "react";

export interface ProductInformationsProps {
    product: Product;
    sku: Sku;
    loading: boolean;
}

export interface ProductInformationsState {
    product: Product;
}

export class ProductInformationsComponent extends React.Component<ProductInformationsProps, ProductInformationsState> {


    constructor(props: ProductInformationsProps) {
        super(props);
    }

    public render() {
        const { loading } = this.props;
        const { productName, productReference }: Product = this.props.product || {} as any;

        const classLoading = loading ? s.loading : "";
        return (
            <div className={s.container}>
                <h1 className={[s.title, classLoading].join(" ")}>
                    {!classLoading && productName}
                </h1>
                <p className={[s.reference, classLoading].join(" ")}>
                    {!classLoading && productReference}
                </p>
            </div>
        );
    }
}


