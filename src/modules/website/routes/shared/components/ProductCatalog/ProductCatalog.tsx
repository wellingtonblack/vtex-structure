import React from "react";
import { Shelf } from "../../../shared/services/shelf.service";
import s from "./ProductCatalog.scss";
import { LazyComponentComponent } from "../../../shared/components/LazyLoad/LazyLoad";
import { ShelfComponent } from "./components/Shelf/Shelf";

export interface ProductCatalogProps {
    shelf: Shelf;
    className?: any;
    wrapperClass?: string;
}

export interface ProductCatalogState { }

export class ProductCatalogComponent extends React.Component<ProductCatalogProps, ProductCatalogState> {

    constructor(props: ProductCatalogProps) {
        super(props);
        this.state = {
        };
    }
    public render() {
        return (
            <LazyComponentComponent>
                <section className={[s.productCatalog, this.props.className].join(" ")}>
                    <div className={[s.wrapper, this.props.wrapperClass].join(" ")}>
                        <ShelfComponent className={s.shelf} shelf={this.props.shelf} />
                    </div>
                </section>
            </LazyComponentComponent>
        );
    }
}