import * as React from "react";
import s from "./Brands.scss";
import dataBrand from "../../../../../../services/data-brand";
import { Brand } from "../../../../../../models/brand.model";
import utilsService from "../../../../../../services/utils-service";

export interface BrandsProps {
    handleClose(): void;
}

export interface BrandsState {
    brands: Brand[];
    brandsOrderd: any;
    key: string;
}

export class BrandsComponent extends React.Component<BrandsProps, BrandsState> {

    constructor(props: BrandsProps) {
        super(props);

        this.state = {
            brands: null,
            brandsOrderd: null,
            key: null,
        };
    }


    public async componentDidMount() {
        const _brands = await dataBrand.getAllBrands();

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

        const brands = _brands.sort((a: any, b: any) => {
            return compareStrings(a.name, b.name);
        });

        const brandsOrderd = groupBy(brands, "name");

        this.setState({
            brands,
            brandsOrderd,
            key: Object.keys(brandsOrderd)[0],
        });
    }

    public render() {
        const { brandsOrderd, key } = this.state;
        return (
            <div>
                <div className={s.brandWrapper}>
                    <div className={s.wrapperBrandList}>
                        <h2 className={s.title}>marcas<span>.</span></h2>
                        <ul className={s.listOfBrands}>
                            {brandsOrderd && key && brandsOrderd[key] && brandsOrderd[key].map((brand: Brand, index: number) => <li className={s.brandItem} key={index}>
                                <a href={`/marcas/${brand.name}`}>
                                    <img src={`//aramismenswear.vteximg.com.br/arquivos/marca-${utilsService.removeAccents(brand.name).replace(/\s/g, "-").toLowerCase()}.png`} alt={brand.name} />
                                    <span className={s.brandName}>{utilsService.truncate(brand.name, 3, "...")}</span>
                                </a>
                            </li>)}
                        </ul>
                    </div>
                    <div className={s.wrapperLetters}>
                        <ul className={s.letterList}>
                            {brandsOrderd && Object.keys(brandsOrderd).map((value, index) => <li onClick={() => { this.setState({ key: value }); }} key={index} className={[s.letter, key === value ? s.active : ""].join(" ")}>{value}</li>)}
                            <li className={s.brandItem}><a href="/marcas">ver todas<span>.</span></a></li>
                        </ul>
                    </div>
                </div>
                <div onClick={this.props.handleClose} className={s.mask}></div>
            </div>
        );
    }
}
