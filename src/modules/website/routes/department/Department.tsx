import * as React from "react";
import { FilterParams } from "./models/path.model";
import { FilterComponent } from "./components/Filter/Filter";
import s from "./Department.scss";
import SVGInline from "react-svg-inline";
import filterShow from "../../assets/icons/icon-menu-open.svg";
import filterHidden from "../../assets/icons/close-navigation-mobile.svg";
import { CatalogComponent } from "./components/Catalog/Catalog";
import { PaginationComponent } from "./components/Pagination/Pagination";
import filterItem from "../../assets/icons/clear-filter-item.svg";
import { OrderByComponent } from "./components/OrderBy/OrderBy";
import utilsService from "../shared/services/utils-service";    

export interface DepartmentProps {
}

export interface DepartmentState {
    filterParams: FilterParams;
    filter: boolean;
    showFilter: boolean;
    numberOfProducts: number;
    from: number;
    to: number;
    productsPerPag: number;
    price: any;
}

export class DepartmentComponent extends React.Component<DepartmentProps, DepartmentState> {

    public paginationComponentBottom: PaginationComponent;
    public catalogComponent: CatalogComponent;
    public filterComponent: FilterComponent;
    public firstTime: boolean = true;

    constructor(props: DepartmentProps) {
        super(props);
        const filterParams = this.getSearchUrl();
        this.state = {
            filterParams,
            filter: false,
            showFilter: false,
            numberOfProducts: 0,
            from: 0,
            to: 0,
            productsPerPag: 18,
            price: null,
        };
    }

    public getSearchUrl() {

        let url: RegExpExecArray;
        let content = "";
        let preg: RegExp;

        $("script:not([src])").each((_index, element) => {
            content = $(element)[0].innerHTML;
            preg = /\/buscapagina\?.+&PageNumber=/i;
            if (content.search(/\/buscapagina\?/i) > -1) {
                url = preg.exec(content);
                return false;
            }
        });

        if (typeof (url) !== "undefined" && typeof (url[0]) !== "undefined") {

            const schema: FilterParams = new FilterParams();

            let offset = -1;
            url[0].split(/[\&\?]/g).forEach((param, index) => {

                param = decodeURIComponent(param);

                if (param.indexOf("fq=C") > -1) {
                    const categories = param.replace("fq=C:", "").match(/\d+/g);
                    categories.forEach((categoryId, _index) => {
                        schema.categories.push({
                            categoryId,
                            categoryName: window.location.pathname.replace("/", "").split(/\//)[_index],
                        });
                        offset++;
                    });
                }

                if (param.indexOf("ft=") > -1) {
                    schema.searchTerm = param.replace("ft=", "").replace(/\+/g, "%20");
                }

                if (param.indexOf("fq=B") > -1) {
                    schema.brands.push({ brandId: param.replace("fq=B:", ""), brandName: window.location.pathname.split(/\//)[index + offset] });
                }

                if (param.indexOf("fq=H") > -1) {
                    schema.collections.push({ collectionId: param.replace("fq=H:", "") });
                }

                if (param.indexOf("O=") > -1) {
                    schema.orderBy = param.replace("O=", "");
                }

                const filter = param.match(/specificationFilter\_\d.*/);
                if (filter && filter.length > 0) {
                    schema.specifications.push(`fq=${filter[0]}`);
                }
            });

            return schema;
        } else {
            throw new Error("Não foi possível localizar a url de busca da página.\n Tente adicionar o .js ao final da página. \n[Método: getSearchUrl]");
        }
    }


    public render() {

        const { filterParams, showFilter, numberOfProducts } = this.state;

        return (
            <div className={s.departmentComponent}>
                <section className={[s.catalogControls].join(" ")}>
                    <div className={[s.wrapper, s.filterHeader].join(" ")}>
                        {(!this.state.showFilter === true) ?
                            <button
                                onClick={() => {
                                    this.setState({ showFilter: true });
                                }}
                                className={s.buttonFilter}><SVGInline className={s.filterIcon} svg={filterShow} />Filtros</button> :
                            <button
                                onClick={() => {
                                    this.setState({ showFilter: false });
                                }}
                                className={s.buttonFilter}><SVGInline className={s.filterIcon2} svg={filterHidden} />Fechar Filtros</button>
                        }
                        <div className={s.listFilters}>
                            {this.state.filterParams.specifications.length > 0 && <h3 className={s.title}>resultados</h3>}
                            <div className={s.wrapperFilters}>
                                {this.state.filterParams.specifications.map((specification) => (
                                    <button
                                        onClick={() => {
                                            this.state.filterParams.setSpecification(specification, true);
                                            this.setState({
                                                filterParams: this.state.filterParams,
                                            }, () => {
                                                this.paginationComponentBottom.reset();
                                                this.filterComponent.handleTotal();
                                                this.catalogComponent.search();
                                            });
                                        }}
                                        className={s.buttonClean}>
                                        <span dangerouslySetInnerHTML={{ __html: this.state.filterParams.getSpecificationValue(specification).replace("Cor Simples", "Cor ").replace("undefined:", "Tamanho: ") }}></span>
                                        <SVGInline className={s.filterItem} svg={filterItem} />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className={s.controlsOfCatalog}>
                            <div>
                                <OrderByComponent
                                    orderBy={this.state.filterParams.orderBy}
                                    handleChange={(value: string) => {
                                        this.state.filterParams.orderBy = value;
                                        this.setState({
                                            filterParams: this.state.filterParams,
                                        }, () => {
                                            this.catalogComponent.search();
                                        });
                                    }} />
                            </div>
                        </div>
                    </div>
                    <section className={[s.dropDown, s.wrapper, showFilter ? "showFilter" : " "].join(" ")}>
                        {filterParams &&
                            <FilterComponent
                                ref={(ref) => { this.filterComponent = ref; }}
                                filterParams={filterParams}
                                handleTotalProducts={(total) => {
                                    this.setState({ numberOfProducts: total }, () => {
                                        this.paginationComponentBottom.reset();
                                    });
                                }}
                                handleClose={() => {
                                    this.setState({
                                        showFilter: false,
                                    }, () => {
                                        document.querySelector("html").removeAttribute("style");
                                    });
                                }}
                                handleClean={() => {
                                    filterParams.clearFilter();
                                    this.setState({
                                        filterParams,
                                    }, () => {
                                        this.paginationComponentBottom.reset();
                                        this.filterComponent.handleTotal();
                                        this.catalogComponent.search();
                                    });
                                }}
                                handleSearchSpecification={(value, status) => {
                                    filterParams.setSpecification(value, status);
                                    this.setState({
                                        filterParams,
                                    }, () => {
                                        this.paginationComponentBottom.reset();
                                        this.filterComponent.handleTotal();
                                    });
                                }}
                                handleFilterPrice={(price: any) => {
                                    this.setState({
                                        price,
                                    }, () => {
                                        this.paginationComponentBottom.reset();
                                        this.filterComponent.handleTotal();
                                    });
                                }} />}
                    </section>
                </section>
                <section className={s.wrapperCatalog}>
                    <div className={s.wrapper}>
                        {<CatalogComponent
                            ref={(ref) => { this.catalogComponent = ref; }}
                            from={this.state.from}
                            to={this.state.to}
                            filterParams={filterParams}
                            price={this.state.price}
                            handleOrderBy={() => { }}>

                            {$(window).width() < 599 && <div className={s.wrapperFilterCatalogMob}>
                                <button
                                    onClick={() => {
                                        this.setState({ showFilter: true }, () => {
                                            document.querySelector("html").style.overflow = "hidden";
                                        });
                                    }}
                                    className={s.buttonFilter}><SVGInline className={s.filterIcon} svg={filterShow} />filtrddar</button>
                                <OrderByComponent
                                    orderBy={this.state.filterParams.orderBy}
                                    handleChange={(value: string) => {
                                        this.state.filterParams.orderBy = value;
                                        this.setState({
                                            filterParams: this.state.filterParams,
                                        }, () => {
                                            this.catalogComponent.search();
                                        });
                                    }} />
                            </div>}
                        </CatalogComponent>}
                        <div className={s.wrapperPaginationBottom}>
                            <div className={s.wrapper}>
                                <PaginationComponent
                                    productsPerPag={this.state.productsPerPag}
                                    ref={(ref) => { this.paginationComponentBottom = ref; }}
                                    offsetPag={3}
                                    totalProdutos={numberOfProducts}
                                    initDisparch={false}
                                    className={s.paginationBottom}
                                    arrowWithName={$(window).width() > 991}
                                    handleSearch={(from, to, currentPage) => {
                                        this.setState({
                                            from,
                                            to,
                                        }, () => {
                                            if (!this.firstTime) {
                                                this.catalogComponent.search();
                                                utilsService.scrollTop(0);
                                            } else {
                                                this.firstTime = false;
                                            }
                                        });
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                </section>
            </div>
        );
    }
}
