import React, { ChangeEvent } from "react";
import { FilterItem } from "../../../../../shared/models/filter.model";
import s from "./Brand.scss";


export interface BrandProps {
    brands: FilterItem[];
}

export interface BrandState {
    brands: FilterItem[];
}

export class BrandComponent extends React.Component<BrandProps, BrandState> {

    constructor(props: BrandProps) {
        super(props);



        this.state = {
            brands: this.props.brands,
        };
    }

    public filter = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        const brands = this.props.brands.filter((item) => {
            return item.Name.toLowerCase().search(
                value.toLowerCase()) !== -1;
        });


        this.setState({ brands });
    }

    public render() {

        const groupBy = (xs: any, key: any) => {
            return xs.reduce((rv: any, x: any) => {
                (rv[x[key].charAt(0)] = rv[x[key].charAt(0)] || []).push(x);
                return rv;
            }, {});
        };

        function compareStrings(a: any, b: any) {
            // Assuming you want case-insensitive comparison
            a = a.toLowerCase();
            b = b.toLowerCase();

            return (a < b) ? -1 : (a > b) ? 1 : 0;
        }

        const orderList = this.state.brands.sort((a: any, b: any) => {
            return compareStrings(a.Name, b.Name);
        });

        const brands = groupBy(orderList, "Name");

        return (
            <div className={s.brand}>
                <h2 className={s.title}>Linhas</h2>
                {/* <input
                    className={s.fieldSearch}
                    type="text"
                    placeholder={"procura por alguma marca?"}
                    onChange={this.filter} /> */}
                <ul className={s.listOfBrands}>
                    {Object.keys(brands).map((key, index) => <div key={index} className={s.wrapperFilterItem}>
                        {/* <h3 className={s.brandLetter}>{key}</h3> */}
                        <ul className={s.listFilter}>
                            {brands[key].map((brand: FilterItem, index2: number) => <li key={index2} className={s.filterItem}><a className={s.link} href={brand.Link}>{brand.Name}</a></li>)}
                        </ul>
                    </div>)}
                </ul>
            </div>
        );
    }
}