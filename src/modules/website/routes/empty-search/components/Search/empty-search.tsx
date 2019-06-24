import * as React from "react";
import s from "./empty-search.scss";
import SVGInline from "react-svg-inline";
import search from "../../../../assets/icons/search.svg";
import close from "../../../../assets/icons/close-icon.svg";
import { ItemsReturned } from "../../../shared/models/search.model";
import dataProduct from "../../../shared/services/data-product";
import utilsService from "../../../shared/services/utils-service";

export interface SearchProps {
    className?: string;
    handleActive(open: boolean): void;
}

export interface SearchState {
    open: boolean;
    searchTerm: string;
    searchResult: ItemsReturned;
    value: boolean;
}

export class SearchComponent extends React.Component<SearchProps, SearchState> {

    constructor(props: SearchProps) {
        super(props);
        this.state = {
            open: false,
            searchTerm: "",
            searchResult: null,
            value: false,
        };
    }

    public onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = e.target.value;
        this.setState({
            searchTerm,
        }, () => {
            if (this.state.searchTerm.length > 2) {
                this.setState({
                    open: true,
                }, async () => {
                    this.props.handleActive(true);
                    const searchResult = await dataProduct.getSearchProducts(this.state.searchTerm);
                    this.setState({
                        searchResult,
                    });
                });
            } else {
                this.closeAll();
            }
        });
    }

    public closeAll = () => {
        this.setState({
            open: false,
        }, () => {
            this.props.handleActive(false);

        });
    }

    public bold = (str: string) => {
        return str.replace(this.state.searchTerm, `<span>${this.state.searchTerm}</span>`);
    }

    public clearInput() {
        this.setState({
            value: true,
        }, () => {
            document.querySelector("input").value = "";
        });
    }

    public render() {
        return (
            <section className={[s.container, s.search].join("  ")}>
                <div className={s.wrapper}>
                    <h2 className={s.title}>Lamentamos. Não foram encontrados resultados</h2>
                    <h3 className={s.subtitle}>Que tal realizar uma nova pesquisa?</h3>
                    <form
                        autoComplete="false"
                        action={`/${this.state.searchTerm}`}
                        className={[s.formWrapper, this.state.open ? s.active : s.inactive, this.props.className, "searchHeader"].join(" ")}
                        onSubmit={(e) => { }}>
                        <input
                            onChange={this.onChangeSearch}
                            value={this.state.searchTerm}
                            className={s.fieldSearch}
                            type="text"
                            // name="ft"
                            autoComplete="false"
                            placeholder={"encontre um produto"}
                        />
                        <button
                            type="button"
                            onClick={() => {
                                if (this.state.open) {
                                    this.closeAll();
                                    this.clearInput();
                                }
                            }} className={s.buttonsend}><SVGInline className={s.search} svg={this.state.open ? close : search} /></button>
                        <div className={[s.mask, this.state.open ? s.active : s.inactive].join(" ")}></div>
                        {this.state.open && <div className={s.wrapperlist}>
                            <div className={s.iconClose}
                                onClick={() => {
                                    if (this.state.open) {
                                        this.closeAll();
                                        this.clearInput();
                                    }
                                }}>
                                <SVGInline className={s.search} svg={close} />
                            </div>

                            <div className={s.wrapper}>
                                <ul className={s.listdepartment}>
                                    {this.state.searchResult && this.state.searchResult.itemsReturned && this.state.searchResult.itemsReturned.map((item) => {
                                        if (item.items.length === 0) {
                                            return <li className={s.item}>
                                                <a className={s.link} href={item.href} dangerouslySetInnerHTML={{ __html: this.bold(item.name) }}></a>
                                            </li>;
                                        }
                                    })}
                                </ul>
                                <ul className={s.listproducts}>
                                    {this.state.searchResult && this.state.searchResult.itemsReturned && this.state.searchResult.itemsReturned.map((item) => {
                                        if (item.items.length > 0) {
                                            return <li className={s.item}>
                                                <a className={s.link} href={item.href} title={item.name}>
                                                    <img src={utilsService.getPathFromImageTag(item.thumb, 80, 80)} alt={item.name} />
                                                    {item.name}
                                                </a>
                                            </li>;
                                        }
                                    })}
                                    <li className={s.lastItem}>{`/${this.state.searchTerm}` && <button className={s.buttonSendForm}>ver todos</button>}</li>
                                </ul>
                            </div>
                        </div>}
                    </form>
                </div>
            </section>

        );
    }
}
