import * as React from "react";
import s from "./SearchMobile.scss";
import SVGInline from "react-svg-inline";
import search from "../../../../../../assets/icons/search-mobile.svg";
import close from "../../../../../../assets/icons/close-icon.svg";
import dataProduct from "../../../../services/data-product";
import { ItemsReturned } from "../../../../models/search.model";
import utilsService from "../../../../services/utils-service";

export interface SearchProps {
    className?: string;
    handleActive(open: boolean): void;
}

export interface SearchState {
    open: boolean;
    searchTerm: string;
    searchResult: ItemsReturned;
}

export class SearchMobileComponent extends React.Component<SearchProps, SearchState> {

    constructor(props: SearchProps) {
        super(props);
        this.state = {
            open: false,
            searchTerm: "",
            searchResult: null,
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
                    document.querySelector("html").style.overflow = "hidden";
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
            document.querySelector("html").removeAttribute("style");
        });
    }

    public bold = (str: string) => {
        return str.replace(this.state.searchTerm, `<span>${this.state.searchTerm}</span>`);
    }

    public render() {
        return (
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
                    name="ft"
                    autoComplete="false"
                    placeholder={"O que você procura?"} />
                <button
                    type="button"
                    onClick={() => {
                        if (this.state.open) {
                            this.closeAll();
                        }
                    }} className={s.buttonsend}><SVGInline className={s.search} svg={this.state.open ? close : search} /></button>
                <div className={[s.mask, this.state.open ? s.active : s.inactive].join(" ")}></div>
                {this.state.open && <div className={s.wrapperlist}>
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
                                        <a className={s.link} href={item.href}>
                                            <img src={utilsService.getPathFromImageTag(item.thumb, 80, 80)} alt={item.name} />
                                            {item.name}
                                        </a>
                                    </li>;
                                }
                            })}
                            <li className={s.lastItem}>{`/${this.state.searchTerm}` && <button className={s.buttonSendForm}>ver todos resultados</button>}</li>
                        </ul>
                    </div>
                </div>}
            </form>
        );
    }
}
