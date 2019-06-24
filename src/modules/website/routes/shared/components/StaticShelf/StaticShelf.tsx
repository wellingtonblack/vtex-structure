import * as React from "react";
import { ProductCatalogComponent } from "../ProductCatalog/ProductCatalog";
import { Shelf } from "../../services/shelf.service";
import { BannerCatalogComponent } from "../BannerCatalog/BannerCatalog";


export interface StaticShelfProps {

}

export interface StaticShelfState {
    shelf: Shelf;
}

export class StaticShelfComponent extends React.Component<StaticShelfProps, StaticShelfState> {

    constructor(props: StaticShelfProps) {
        super(props);
        this.state = {
            shelf: null,
        };
    }

    public setShelf(shelf: Shelf) {
        try {
            this.setState({
                shelf,
            });
        } catch (error) {
            console.warn("Não foi possivel renderizar a prateleira.");
        }
    }

    public render() {
        return (
            this.state.shelf && <div>
                {$(window).width()  > 991 ? <ProductCatalogComponent shelf={this.state.shelf} /> : <BannerCatalogComponent shelf={this.state.shelf} />}
            </div>
        );
    }
}
