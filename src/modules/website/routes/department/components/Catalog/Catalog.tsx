import * as React from "react";
import { Product } from "../../../../../common/models/product.model";
import { FilterParams } from "../../models/path.model";
import { CardComponent } from "./components/Card/Card";
import dataProduct from "../../../shared/services/data-product";
import s from "./Catalog.scss";
import shelfService from "../../../shared/services/shelf.service";

export interface CatalogProps {
    from: number;
    to: number;
    filterParams: FilterParams;
    price: any;
    handleOrderBy(value: string): void;
}

export interface CatalogState {
    products: Product[];
    errorSearch: boolean;
    inactive: boolean;
    fetched: boolean;
    loading: boolean;
}

export class CatalogComponent extends React.Component<CatalogProps, CatalogState> {

    constructor(props: CatalogProps) {
        super(props);
        
        const products = shelfService.getProducts(document.querySelector(".filter-ref"));

        this.state = {
            products,
            errorSearch: false,
            inactive: false,
            fetched: false,
            loading: false,
        };
    }

    public componentDidMount() {
        // this.search();
    }

    public search = () => {
        return new Promise(async (resolve) => {
            try {
                this.setState({
                    // loading: true,
                }, async () => {
                    let data: any = null;
                    if (this.props.to === 0) {
                        throw Error("á páginação deve ser maior que 0");
                    }
                    try {

                        data = await dataProduct.getProductsByCategory(
                            this.buildSearchUri(),
                            this.props.filterParams.searchTerm,
                            this.props.filterParams.orderBy,
                            this.props.from,
                            this.props.to);
                    } catch (error) {

                    }

                    this.setState({
                        products: data,
                        inactive: false,
                        fetched: data.length > 0,
                        loading: false,
                    }, () => {
                        resolve();
                    });
                });
            } catch (error) {
                this.setState({
                    fetched: false,
                });
            }
        });
    }

    public buildSearchUri(): string[] {

        const params: FilterParams = this.props.filterParams;
        const paths = [];

        if (params.categories.length > 0) {
            let categorypath = "fq=C:";
            for (let index = 0; index < params.categories.length; index++) {
                const category = params.categories[index];
                categorypath += `${category.categoryId}`;
                if (index < (params.categories.length - 1)) {
                    categorypath += "/";
                }
            }
            paths.push(categorypath);
        }

        if (params.brands.length > 0) {
            let brandpath = "fq=B:";
            for (let index = 0; index < params.brands.length; index++) {
                const brand = params.brands[index];
                brandpath += `${brand.brandId}`;
                if (index < (params.brands.length - 1)) {
                    brandpath += "/";
                }
            }
            paths.push(brandpath);
        }

        if (params.collections.length > 0) {
            let brandpath = "fq=H:";
            for (let index = 0; index < params.collections.length; index++) {
                const brand = params.collections[index];
                brandpath += `${brand.collectionId}`;
                if (index < (params.collections.length - 1)) {
                    brandpath += "/";
                }
            }
            paths.push(brandpath);
        }

        if (this.props.price) {
            paths.push(`fq=P:[${this.props.price.min} TO ${this.props.price.max}]`);
        }

        return paths.concat(params.specifications);
    }

    public render() {
        const { loading } = this.state;
        const products = this.state.products;
        // || [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}] as any[]
        return (
            <div className={s.catalog} style={{ flexDirection:  "row" }}>
                {products && products.map((product, index) => (
                    <CardComponent
                        loading={loading}
                        key={product.productId}
                        index={index}
                        product={product} />
                ))}
            </div>
        );
    }
}
