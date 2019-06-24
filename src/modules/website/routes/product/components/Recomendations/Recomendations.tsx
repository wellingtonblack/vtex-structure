import React from "react";
import { ProductCatalogComponent } from "../../../shared/components/ProductCatalog/ProductCatalog";
import { Product } from "../../../../../common/models/product.model";
import s from "./Recomendations.scss";

export interface Props {
    products: Product[]; 
}

export function RecomendationsComponent(prop: Props) {
    const { products } = prop;
    return (
        <ProductCatalogComponent
            className={s.wrapper}
            wrapperClass={s.catalogProductRecomendation}
            shelf={{ products, title: "recomendação aramiss" }} />
    );
}