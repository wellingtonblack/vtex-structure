import * as React from "react";
import s from "./Card.scss";
import utilsService from "../../../../../../../shared/services/utils-service";
import { ImageComponent } from "../../../../../../../shared/components/Image/Image";
import { Product } from "../../../../../../../../../common/models/product.model";
import { AddToCartComponent } from "../../../../../../../shared/components/AddToCart/AddToCart";
import { PercentageComponent } from "../../../../../../../shared/components/Percentage/Percentage";
import { RattingComponent } from "../../../../../../../shared/components/Ratting/Ratting";
import { FlagComponent } from "../../../../../Flag/Flag";



export interface CardProps {
    product: Product;
    index: number;
}

export interface CardState {

}

export class CardComponent extends React.Component<CardProps, CardState> {

    constructor(props: CardProps) {
        super(props);
    }

    public render() {
        const { product } = this.props;
        const item = product.items[0];
       
        const flags = this.props.product.clusterHighlights;
        const oldPrice = item.sellers[0].commertialOffer.ListPrice;
        const newPrice = item.sellers[0].commertialOffer.Price;
        const oldPriceFormated = item && utilsService.parseMoney(oldPrice);
        
        const money = utilsService.parseMoney(oldPrice);
        const splitMoney = money.split(/\,/g);

        const image = utilsService.cropImage(454, 636, item.images[0].imageUrl);
        return (
            <a  href={product.link} className={[s.card, "card", (this.props.index % 2 === 0) ? s.even : s.odd].join(" ")}>
                <ImageComponent
                    className={s.image}
                    alt={product.productName}
                    scale={4}
                    small={true}
                    src={image.search("//aramismenswear.vteximg.com.br") === - 1 ? `//aramismenswear.vteximg.com.br${image}` : image}
                    srcMob={image.search("//aramismenswear.vteximg.com.br") === - 1 ? `//aramismenswear.vteximg.com.br${image}` : image}
                />
                <div className={s.informations}>
                    <FlagComponent
                        className={s.flag}
                        flags={flags}>
                        <PercentageComponent 
                            newPrice={newPrice}
                            oldPrice={oldPrice}
                        />
                    </FlagComponent>
                    <p className={s.productName}>{utilsService.truncate(product.productName, 12, "...")}</p>
                    {/* <em className={[s.oldPrice].join(" ")}>{newPrice < oldPrice && <React.Fragment>de: <span>{`${oldPriceFormated}`} </span></React.Fragment>}</em> */}
                    {window.innerWidth < 768 && <em className={s.price}><span>r$</span> {splitMoney[0]},<span className={s.up}>{splitMoney[1]}</span></em>}
                    {window.innerWidth > 767 && <em className={s.bestPrice}><span>r$ {utilsService.parseMoney(newPrice)}</span> </em>}
                    {/* {window.innerWidth < 768 && <em className={s.bestPrice}>pague á vista <span>r$ {utilsService.parseMoney(newPrice)}</span></em>} */}
                </div>
                <AddToCartComponent product={product} className={s.addToCartButton} />
            </a>
        );
    }
}
