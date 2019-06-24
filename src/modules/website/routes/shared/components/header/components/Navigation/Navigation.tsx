import * as React from "react";
import s from "./Navigation.scss";
import { Navigation } from "../../../../models/navigation";
import { Banner } from "../../../../models/banner.model";
import { Category } from "../../../../models/category";
import dataCategory from "../../../../services/data-category";


export interface NavigationProps {
    items: Navigation[];
    banners: Banner[];
    className?: string;
}

export interface NavigationState {
    items: Navigation[];
    open: boolean;
    showDepartment: boolean;
    categories: Category[];
    showBrand: boolean;
}

export class NavigationComponent extends React.Component<NavigationProps, NavigationState> {

    constructor(props: NavigationProps) {
        super(props);

        this.state = {
            items: this.props.items,
            open: false,
            showDepartment: false,
            categories: null,
            showBrand: false,
        };
    }

    public async componentDidMount() {
        const categories = await dataCategory.getAllCategory();
        this.setState({
            categories,
        });
    }

    public onMouseEnter = (item: Navigation, event: any) => {
        item.active = true;
        this.setState({
            items: this.state.items,
            showDepartment: false,
            showBrand: false,
            open: true,
        });
    }

    public onMouseLeave = (item: Navigation, event: any) => {
        item.active = false;
        this.setState({
            items: this.state.items,
        });
    }

    public render() {
        return (
            [<section key={1} className={[s.navigation].join(" ")}>
                <nav className={s.wrapper}>
                    <ul className={s.list}>
                        {this.state.items.map((item, index) => <li
                            key={index}
                            onMouseEnter={this.onMouseEnter.bind(this, item)}
                            onMouseLeave={this.onMouseLeave.bind(this, item)}
                            className={[s.item, item.active ? s.hover : ""].join(" ")}>
                            <a className={[s.link, item.className].join(" ")} href={item.link} dangerouslySetInnerHTML={{ __html: item.label }}></a>
                            {item.subitems && item.subitems.length > 0 ? <ul className={[s.wrapperSubNavigation, this.props.className].join(" ")}>
                                {
                                    item.subitems &&
                                    item.subitems.map((subcategories, _index) =>
                                        <li
                                            key={_index}
                                            className={s.subcategoryWrapper}>
                                            <a href={subcategories.link} className={s.link} dangerouslySetInnerHTML={{ __html: subcategories.label }}></a>
                                            <ul className={s.listInnerSubCategory}>
                                                {subcategories.subitems && subcategories.subitems.map((_subcategory, _index2) => <li key={_index2}><a className={s.link} href={_subcategory.link} dangerouslySetInnerHTML={{ __html: _subcategory.label }}></a></li>)}
                                            </ul>
                                        </li>)
                                }
                                {/* <div onClick={this.onMouseEnter.bind(this, item)} className={[s.mask].join(" ")}></div> */}
                            </ul> : " "}
                        </li>)}
                    </ul>
                </nav>
            </section>,
                // <section key={2} className={s.wrapperDepartmentNavigation}>
                //     {this.state.categories && this.state.showDepartment && <DepartmentNavigationComponent
                //         categories={this.state.categories}
                //         close={() => {
                //             this.setState({
                //                 showDepartment: false,
                //             });
                //         }} />}
                // </section>,

            ]
        );
    }
}
