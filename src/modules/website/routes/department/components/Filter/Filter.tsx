import * as React from "react";
import s from "./Filter.scss";
import dataFacets from "../../../shared/services/data-facets";
import { FilterParams } from "../../models/path.model";
import { FilterResultModel } from "../../../shared/models/filter.model";
import { CheckboxButton } from "./components/Checkbox/Checkbox";
import { BrandComponent } from "./components/Brand/Brand";
import { PriceRangeComponent } from "./components/PriceRange/PriceRange";
import dataStore from "../../../shared/services/data-store";
import { Color } from "../../../shared/models/Color";

export interface FilterProps {
    filterParams: FilterParams;
    handleSearchSpecification(value: string, status: boolean): void;
    handleClean(): void;
    handleClose(): void;
    handleTotalProducts(total: number): void;
    handleFilterPrice(value: any): void;
}

export interface FilterState {
    filters?: string[];
    filter: FilterResultModel;
    colors: Color[];
    price: any;
}

export class FilterComponent extends React.Component<FilterProps, FilterState> {

    constructor(props: FilterProps) {
        super(props);
        this.state = {
            filter: null,
            filters: [],
            colors: null,
            price: null,
        };

        this.getFilters();
    }

    public getFilters = async () => {

        const filter = await dataFacets.getFilters(this.buildFilterUri());
        const colors = await dataStore.getSimpleColors();

        this.props.handleTotalProducts(filter.Departments.map((dep) => dep.Quantity).reduce((total, valor) => total + valor));

        this.setState({
            filter,
            colors,
        });
    }

    public handleTotal = async () => {
        const filter = await dataFacets.getFilters(this.buildFilterUri());
        this.props.handleTotalProducts(filter.Departments.map((dep) => dep.Quantity).reduce((total, valor) => total + valor));
    }

    public buildFilterUri() {

        const params: FilterParams = this.props.filterParams;

        let path = "";

        let categorySlug = "";
        params.categories.forEach((category: any, index: number) => {
            path += `/${category.categoryName}`;
            categorySlug += ",c";
        });

        let brandSlug = "";
        params.brands.forEach((brand: any, index: number) => {
            path += `/${brand.brandName}`;
            brandSlug += ",b";
        });

        let collectionsSlug = "";
        params.collections.forEach((collection: any, index: number) => {
            path += `/${collection.collectionId}`;
            collectionsSlug += ",productClusterIds";
        });

        let specificationSlug = "";
        if (this.state && this.props.filterParams.specifications) {
            this.props.filterParams.specifications.forEach((_specification: any, index: any) => {
                path += `/${_specification.replace(/fq=specificationFilter_\d+\:/, "")}`;
                const specificationFieldNumber = _specification.match(/specificationFilter_\d+/);
                specificationSlug += `,${specificationFieldNumber[0]}`;
            });
        }
        
        const map = this.getParams(categorySlug, brandSlug, collectionsSlug, specificationSlug);
        
        let _path = `${(path) ? `${path}?${map}` : `${(params.searchTerm) ? params.searchTerm : ""}?map=ft`}`;

        if (this.state.price) {
            _path += `&fq=P:[${this.state.price.min} TO ${this.state.price.max}]`;
        }

        return _path.replace("/", "");
    }

    public getParams = (categorySlug: string, brandSlug: string, collectionsSlug: string, specificationSlug: string) => {

        return `map=${categorySlug}${brandSlug}${collectionsSlug}${specificationSlug}`.replace(",", "");
    }

    public getValue(path: string, name: string = "") {
        const element = document.createElement("a");
        element.href = path;
        const pathArray = element.pathname.split(/\//);
        const match = path.match(/specificationFilter\_\d+/);
        return `fq=${match[0]}:${pathArray[pathArray.length - 1]}&${name}`;
    }

    public handleFilterChange = (value: string, status: boolean) => {
        this.props.handleSearchSpecification(value, status);
    }

    public removeAccents = (_s: any) => {
        const i = "ÀÁÂÃÄÅàáâãäåÒÓÔÕÕÖŐòóôõöőÈÉÊËèéêëðÇçÐÌÍÎÏìíîïÙÚÛÜŰùúûüűÑñŠšŸÿýŽž".split("");
        const o = "AAAAAAaaaaaaOOOOOOOooooooEEEEeeeeeCcDIIIIiiiiUUUUUuuuuuNnSsYyyZz".split("");
        const map: any = {};
        i.forEach((el: any, idx: number) => { map[el] = o[idx]; });
        return _s.replace(/[^A-Za-z0-9]/g, (ch: any) => map[ch] || ch).replace(/\s/g, "-");
    }
    public canDo(filterName: string): boolean {

        const notrender = [
            "Cor",
        ];

        return notrender.indexOf(filterName) === -1;
    }

    public render() {
        const { filter } = this.state;
        return (
            filter && <section className={s.filterWrapper}>
                <div className={s.wrappper}>
                    <section className={s.wrapperSpecification}>
                        <div className={s.filtersRow}>
                            <BrandComponent brands={filter.Brands} />
                            {Object.keys(filter.SpecificationFilters).map((filterName, _index) => {
                                return (this.canDo(filterName) ?
                                    <div className={[s.boxSpecification, `box-${_index}`].join(" ")} key={_index} >
                                        <h3 className={s.title} >{(filterName === "Cor Simples") ? "Cores" : filterName}</h3>
                                        <ul className={[`${this.removeAccents(filterName).toLowerCase()}`, s.listFilter].join(" ")}>
                                            {filter.SpecificationFilters[filterName].map((specification: any, index: number) => {
                                                let color = null;
                                                if (filterName === "Cor Simples") {
                                                    const _color =  this.state.colors && this.state.colors.find((x: Color) => specification.Name.toLowerCase() === x.name.toLowerCase());
                                                    color = _color && _color.value;
                                                }
                                                return (
                                                    <li className={s.item} key={index}>
                                                        <CheckboxButton
                                                            color={color}
                                                            filterName={filterName}
                                                            status={this.props.filterParams.specifications.indexOf(this.getValue(specification.Link, filterName)) > -1}
                                                            handleCheck={this.handleFilterChange}
                                                            value={this.getValue(specification.Link, filterName)}
                                                            specificationName={specification.Name}>
                                                            {specification.Name}
                                                        </CheckboxButton>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div> : ""
                                );
                            })}
                            <PriceRangeComponent handlePriceChange={(price) => {
                                this.setState({
                                    price,
                                }, () => {
                                    this.props.handleFilterPrice(price);
                                });
                            }} />
                        </div>
                        <div className={s.filterDown}>
                            <div className={s.filterButton}>
                                <button onClick={this.props.handleClean} className={s.buttonClean}>
                                    limpar filtro
                                </button>
                                <button onClick={this.props.handleClose} className={s.closeFilter}>
                                    Filtrar
                                </button>
                            </div>
                        </div>
                    </section>

                </div>
                <div onClick={this.props.handleClose} className={s.mask}></div>
            </section>
        );
    }
}
