import * as React from "react";
import s from "./NavigationMobile.scss";
import dataCategory from "../../../../services/data-category";
import { Category } from "../../../../models/category";
import SVGInline from "react-svg-inline";

import user from "../../../../../../assets/icons/user.svg";
import back from "../../../../../../assets/icons/go-back-right-arrow.svg";
import utilsService from "../../../../services/utils-service";
import dataUser from "../../../../services/data-user";
import { UserModel } from "../../../../models/user.model";
import { SearchMobileComponent } from "../SearchMobile/SearchMobile";
import { Navigation } from "../../../../models/navigation";

export interface NavigationMobileProps {
    items: Navigation[];
    handleClose?(): void;

}

export interface NavigationMobileState {
    items: Navigation[];
    searchActive: boolean;
    categories: Category[];
    deep: Navigation[];
    user: UserModel;
}

export class NavigationMobileComponent extends React.Component<NavigationMobileProps, NavigationMobileState> {


    constructor(props: NavigationMobileProps) {
        super(props);
        this.state = {
            items: this.props.items,
            categories: null,
            deep: [],
            user: null,
            searchActive: false,
        };
    }

    public async componentDidMount() {
        const categories = await dataCategory.getAllCategory();
        this.setState({
            categories,
        });
    }

    public close = () => {
        const transform = document.querySelector("body").style.transform;
        const percentage = transform.match(/\d+/g);
        if (percentage) {
            let _percentage = parseInt(percentage[0]);
            _percentage -= 80;
            document.querySelector("body").style.transform = `translateX(${_percentage}%)`;
            this.state.deep.pop();
            setTimeout(() => {
                this.setState({
                    deep: this.state.deep,
                });
            }, 500);
        }
    }

    public renderNavigation = () => {
        return this.state.deep.map((_item, index) => <div
            key={index}
            style={{ transform: `translateX(-${80 * (index + 2)}vw)` }}
            className={[s.navigation, s.subnav].join(" ")}>
            <div className={s.wrapper}>
                <button
                    onClick={this.close}
                    className={s.goBack}>
                    <SVGInline className={s.icon} svg={back} />
                </button>
                <h2
                    className={s.categoryTitle}
                    dangerouslySetInnerHTML={{ __html: _item.label }}></h2>
                {_item.subitems &&
                    <ul className={s.list}>
                        {_item.subitems.map((item, _index) =>
                            <li
                                key={_index}
                                onClick={() => {
                                    if (item.subitems && item.subitems.length > 0) {
                                        this.state.deep.push(item);
                                        this.deep();
                                    }
                                    this.setState({
                                        categories: this.state.categories,
                                    });
                                }}
                                className={s.item}><a
                                    href={item.link}
                                    onClick={(event) => {
                                        if (item.subitems && item.subitems.length > 0) {
                                            event.preventDefault();
                                        }
                                    }}
                                    dangerouslySetInnerHTML={{ __html: item.label }}></a></li>)}
                        <li className={s.item}><a href={_item.link}>ver todas</a></li>
                    </ul>}
            </div>
        </div>);
    }

    public deep = () => {
        const transform = document.querySelector("body").style.transform;
        const percentage = transform.match(/\d+/g);
        if (percentage) {
            let _percentage = parseInt(percentage[0]);
            _percentage += 80;
            document.querySelector("body").style.transform = `translateX(${_percentage}%)`;
        }
    }

    public render() {
        return (
            [<div
                style={{ transform: "translateX(-80vw)" }}
                className={[s.navigation, s.firstLevel].join(" ")}>

                <ul className={s.listMenu}>
                    <li className={s.myOrders}><a
                        onClick={(event) => {
                            if (!this.state.user || !this.state.user.IsUserDefined) {
                                event.preventDefault();
                                vtexid.start();
                                this.close();
                                setTimeout(() => {
                                    this.props.handleClose();
                                }, 500);
                            }
                        }}
                        href={"/_secure/account/orders#/"}>ver meus pedidos</a>
                    </li>
                </ul>
                <h2 className={s.categoryTitle}>
                    categorias
                </h2>
                {this.state.items &&
                    <ul className={s.list}>
                        {this.state.items.map((item, index) => <li
                            key={index}
                            onClick={() => {
                                if (item.subitems && item.subitems.length > 0) {
                                    this.state.deep.push(item);
                                    this.deep();
                                }
                                this.setState({
                                    categories: this.state.categories,
                                });
                            }}
                            className={s.item}>
                            <a onClick={(event) => {
                                if (item.subitems && item.subitems.length > 0) {
                                    event.preventDefault();
                                }

                            }}
                                href={((item.subitems && item.subitems.length === 0) || !item.subitems) && item.link}
                                className={s.link}
                                dangerouslySetInnerHTML={{ __html: item.label }}></a></li>)}
                    </ul>}
            </div>,
            this.renderNavigation()]
        );
    }
}
