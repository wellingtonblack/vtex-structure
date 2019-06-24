import React from "react";
import s from "./CardWithSelector.scss";
import { Product, Seller, Item } from "../../../../../../../common/models/product.model";
import utilsService from "../../../../../shared/services/utils-service";
import { ImageComponent } from "../../../../../shared/components/Image/Image";
import SVGInline from "react-svg-inline";
import arrow from "../../../../../../assets/icons/arrow.svg";

type Type = {
    product: Product;
    loading: boolean;
    value: any;
    colorValue: any;
    children?: any;
    similars?: Product[];
    change(item: Item): void;
    changeColor(product: Product): void;
};

export function CardWithSelector(props: Type) {

    const { loading, product, value, colorValue } = props;
    const loadingClass = loading ? s.loading : "";
    const item = props.product && (props.product.items.find((_item) => _item.sellers[0].commertialOffer.AvailableQuantity > 0) || props.product.items[0]);
    const seller: Seller = (item && item.sellers[0]) || null;

    return <div className={s.card}>
        <div className={[loadingClass, s.image].join(" ")}>
            {item && <ImageComponent
                alt={product.productName}
                className={s.image}
                small={true}
                srcMob={utilsService.cropImage(384, 506, item.images.find((x) => x.imageLabel === "vitrine1" || x.imageLabel === "vitrine2" || x.imageLabel === "vitrine3").imageUrl)}
                src={utilsService.cropImage(384, 506, item.images.find((x) => x.imageLabel === "vitrine1" || x.imageLabel === "vitrine2" || x.imageLabel === "vitrine3").imageUrl)}
            >
                {props.children}
                <div className={s.bar}>
                    {props.similars && props.similars.length > 0 && <select value={colorValue} className={s.selector} onChange={(event) => { props.changeColor(props.similars.find((_product) => _product.productId === event.target.value)); }}>
                        <option value="">COR</option>
                        {props.similars.map((_product) => <option value={_product.productId}>{_product.Cor[0].toUpperCase()}</option>)}
                    </select>}
                    {product.items.length > 0 && <select
                        value={value}
                        className={s.selector}
                        onChange={(event) => {
                            props.change(product.items.find((_item) => _item.itemId === event.target.value));
                        }}>
                        <option value="">TAMANHO</option>
                        {product.items.map((_item) => <option disabled={_item.sellers[0].commertialOffer.AvailableQuantity === 0} value={_item.itemId}>{_item.Tamanho[0]}</option>)}
                    </select>}
                    <SVGInline className={s.icon} svg={arrow} />
                </div>
            </ImageComponent>}
        </div>
        <div className={s.informations}>
            <h2 className={[s.productName, loadingClass].join(" ")}>
                {props.product && props.product.productName}
            </h2>
            <em className={[s.price, loadingClass].join(" ")}>
                {seller && utilsService.parseMoney(seller.commertialOffer.Price, true)}
            </em>
        </div>
    </div>;
}