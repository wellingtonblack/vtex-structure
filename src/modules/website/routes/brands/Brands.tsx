import * as React from "react";
import s from "./Brands.scss";
import dataBrand from "../shared/services/data-brand";
import { Brand } from "../shared/models/brand.model";
import SVGInline from "react-svg-inline";
import fazenda from "../../assets/icons/fazenda-tamandua.svg";
import meissen from "../../assets/icons/meissen.svg";
import naturalis from "../../assets/icons/naturalis.svg";
import tawan from "../../assets/icons/tawan.svg";
import search from "../../assets/icons/search.svg";
import arrow from "../../assets/icons/arrow-down-brand.svg";
import utilsService from "../shared/services/utils-service";

export interface BrandsProps {
}

export interface BrandsState {
    brands: Brand[];
    brandsFilter: Brand[];
    brandsOrderd: any;
    key: string;
}

export class BrandsComponent extends React.Component<BrandsProps, BrandsState> {

    constructor(props: BrandsProps) {
        super(props);

        this.state = {
            brands: [],
            brandsFilter: [],
            brandsOrderd: [],
            key: "",
        };
    }

    public async componentDidMount() {

        window.loading(true);
        const brands = await dataBrand.getAllBrands();
        window.loading(false);

        this.setState({
            brands,
            brandsFilter: brands,
        }, () => {
            this.applyOrder();
        });
    }

    public applyOrder = () => {
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

        const brands = this.state.brandsFilter.sort((a: any, b: any) => {
            return compareStrings(a.name, b.name);
        });

        const brandsOrderd = groupBy(brands, "name");

        brandsOrderd[Object.keys(brandsOrderd)[0]].isActive = true;
        this.setState({
            brandsOrderd,
            key: "",
        });
    }

    public render() {
        const { brandsOrderd, key } = this.state;
        return (
            <div className={s.container}>
                <div className={s.wrapper}>
                    <h1 className={s.title}>Marcas<span className={s.featured}>.</span></h1>
                    <div className={s.wrapperSearch}>
                        <form className={s.formSearch} action="">
                            <input type="text" onChange={(event) => {
                                const brandsFilter = this.state.brands.filter((brand) => {
                                    return brand.name.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
                                });
                                this.setState({
                                    brandsFilter,
                                    key: "",
                                }, () => {
                                    this.applyOrder();
                                });
                            }} placeholder={$(window).width() < 992 ? "busque por uma marca" : "está procurando por uma marca especifica?  digite aqui"} />
                            <SVGInline className={s.search} svg={search} />
                        </form>
                        <div className={s.brandsILike}>
                            <span className={s.label}>A marca que você ama tem aqui :)</span>
                            <ul className={s.listOfBrands}>
                                <li><SVGInline svg={naturalis} /></li>
                                <li><SVGInline svg={meissen} /></li>
                                <li><SVGInline svg={tawan} /></li>
                                <li><SVGInline svg={fazenda} /></li>
                            </ul>
                        </div>
                    </div>
                    <div className={s.boxLettersAndList}>
                        <div className={s.wrapperLetters}>
                            <ul className={s.letterList}>
                                {brandsOrderd && Object.keys(brandsOrderd).map((value, index) =>
                                    <li onClick={() => {
                                        this.state.brandsOrderd[value].isActive = true;
                                        this.setState({
                                            brandsOrderd: this.state.brandsOrderd,
                                            key: value,
                                        }, () => {
                                            utilsService.scrollTop($(`#scrollTo-${value}`).offset().top);
                                        });
                                    }} key={index} className={[s.letter, key === value ? s.active : ""].join(" ")}>{value}</li>)}
                            </ul>
                        </div>
                        <div className={s.wrapperLisOfBrands}>
                            {$(window).width() < 991 && <h2 className={s.titleMobile}>marcas<span className={s.featured}>.</span></h2>}
                            {brandsOrderd && Object.keys(brandsOrderd).map((letter: any, index: number) => (
                                <div id={`scrollTo-${letter}`} className={s.brandContainer}>
                                    {$(window).width() < 991 ?
                                        <label className={[brandsOrderd[letter].isActive, s.on].join(" ")}>
                                            <span className={s.label}>{letter}
                                                <span className={s.featured}>.</span></span>
                                        </label>
                                        :
                                        <label className={[brandsOrderd[letter].isActive].join(" ")} onClick={() => {
                                            this.state.brandsOrderd[letter].isActive = brandsOrderd[letter].isActive ? false : true;
                                            this.setState({
                                                brandsOrderd: this.state.brandsOrderd,
                                            });
                                        }}>
                                            <span className={s.label}>{letter}
                                                <span className={s.featured}>.</span></span>
                                            <SVGInline className={[s.iconArrow, brandsOrderd[letter].isActive ? s.active : s.inactive].join(" ")} svg={arrow} />
                                        </label>}
                                    {($(window).width() < 991) ? <ul {...brandsOrderd[letter].isActive} className={[s.listOfBrands, s.active].join(" ")}>
                                        {brandsOrderd[letter].map((brand: Brand) => <li>{brand.name}</li>)}
                                    </ul>
                                        : <ul className={[s.listOfBrands, brandsOrderd[letter].isActive ? s.active : s.inactive].join(" ")}>
                                            {brandsOrderd[letter].map((brand: Brand) => <li><a href={`${brand.name.replace(/\s|&|\/|\.+/g, "-").toLocaleLowerCase()}`}>{brand.name}</a></li>)}
                                        </ul>}

                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
