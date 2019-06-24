import * as React from "react";
import s from "./BreadCrumb.scss";
import dataCategory from "../../../shared/services/data-category";
import { Category } from "../../../shared/models/category";
import SVGInline from "react-svg-inline";
import home from "../../../../assets/icons/path-bread.svg";

export interface BreadCrumbrops {
}

export interface BreadCrumbtate {
    categories: Category[];
    categoriesRoot: Category[];
    search: string;
}



export class BreadCrumbComponent extends React.Component<BreadCrumbrops, BreadCrumbtate> {

    constructor(props: BreadCrumbrops) {
        super(props);
        this.state = {
            categoriesRoot: null,
            categories: [],
            search: null,
        };
    }

    public deepCategory = async (father: Category, search: string): Promise<any> => {

        for (let index = 0; index < father.children.length; index++) {

            const category = father.children[index];

            category.father = father;

            if (category.name.toLowerCase() === search.toLocaleLowerCase()) {

                return category;

            } else if (category.children.length > 0) {

                const data = await this.deepCategory(category, search);

                if (data) {
                    return data;
                }
            }
        }
    }

    public async componentDidMount() {

        const categories = await dataCategory.getAllCategory();
        let search = null;

        if (vtxctx.categoryName) {
            search = vtxctx.categoryName;
        } else {
            search = vtxctx.departmentName;
        }

        const category = categories.find((c) => c.name.toLowerCase() === vtxctx.departmentName.toLocaleLowerCase());

        if (category) {
            const data = await this.deepCategory(category, search);
            const _categories = data && await this.getCategory(data, []);
            
            this.setState({
                categoriesRoot: categories,
                categories: _categories && _categories.length > 0 ? _categories : [category],
                search,
            });
        }

    }

    public getCategory = async (category: Category, categories: Category[]): Promise<Category[]> => {

        if (category.father) {
            await this.getCategory(category.father, categories);

            categories.push(category);
            return categories;
        } else {
            categories.push(category);
            return categories;
        }
    }

    public render() {
        return (
            <section className={s.content}>
                <div className={s.wrapper}>
                    <ul className={s.list}>
                        <li>você está em: <SVGInline className={s.icon} svg={home} /></li>
                        {this.state.categories.map((category, index) => [
                            <li className={s.split} key={`${index}`}>/</li>,
                            <li className={s.item} key={`${index}${1}`}>
                                {category.name}
                                <div className={s.children}>

                                    {category.father && category.father.children.length > 0 && <ul className={s.listchildren}>
                                        {category.father && category.father.children.map((children) => <li><a className={category.name.toLowerCase() === children.name.toLowerCase() ? s.active : ""} href={children.url.replace("https://aramismenswear.vtexcommercestable.com.br", "")}>{children.name}</a></li>)}
                                    </ul>}
                                    {!category.father && this.state.categoriesRoot.length > 0 && <ul className={s.listchildren}>
                                        {this.state.categoriesRoot.map((children) => <li><a className={category.name.toLowerCase() === children.name.toLowerCase() ? s.active : ""} href={children.url.replace("https://aramismenswear.vtexcommercestable.com.br", "")}>{children.name}</a></li>)}
                                    </ul>}
                                </div>
                            </li>])}
                    </ul>
                </div>
            </section>
        );
    }
}
