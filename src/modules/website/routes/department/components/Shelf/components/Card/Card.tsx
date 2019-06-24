import * as React from "react";
import s from "./Card.scss";
import utilsService from "../../../../../shared/services/utils-service";
import { ImageComponent } from "../../../../../shared/components/Image/Image";
import { PercentageComponent } from "../../../../../shared/components/Percentage/Percentage";
import { AddToCartComponent } from "../../../../../shared/components/AddToCart/AddToCart";
import { Product } from "../../../../../../../common/models/product.model";
import { RattingComponent } from "../../../../../shared/components/Ratting/Ratting";
import { FlagComponent } from "../../../../../shared/components/Flag/Flag";


export interface CardProps {
    product: Product;
    index?: number;
    full?: boolean;
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
        const bulletPrice = utilsService.boletopercentage(newPrice, 10);

        const oldPriceFormated = utilsService.parseMoney(oldPrice);
        const newPriceFormated = utilsService.parseMoney(newPrice);
        
        const splitMoney = newPriceFormated.split(/\,/g);

        const informations = [
            <div key={1} className={s.boxInformations}>
                <FlagComponent
                    className={s.flag}
                    flags={flags}>
                    <PercentageComponent
                        newPrice={newPrice}
                        oldPrice={oldPrice}
                    />
                </FlagComponent>
                <p className={s.productName}>{utilsService.truncate(product.productName, 12, "...")}</p>
                <RattingComponent className={s.ratting} productId={product.productId} />
                {!this.props.full && <p className={s.shortDescription} dangerouslySetInnerHTML={{ __html: utilsService.truncate(item.complementName, 20, "...") }}></p>}
                {this.props.full && <p className={s.shortDescription} dangerouslySetInnerHTML={{ __html: item.complementName }}></p>}
            </div>,
            <div key={2} className={s.boxPrice}>
                {/* <em className={[s.oldPrice, newPrice < oldPrice ? s.active : ""].join(" ")}>{newPrice < oldPrice && `r$ ${oldPriceFormated}`}</em> */}
                <em className={s.price}><span>r$</span> {splitMoney[0]},<span className={s.up}>{splitMoney[1]}</span></em>
                <em className={s.bestPrice}>á vista no boleto <span>r$ {utilsService.parseMoney(bulletPrice)}</span></em>
                <em className={s.parcels}>ou até <span>8x</span> de <span>r$ {utilsService.parseMoney(newPrice / 8)} s/ juros</span></em>
                <AddToCartComponent product={product} className={s.addToCartButton} />
            </div>,
        ];

        return (
            <a href={product.link} className={[s.card, "card", (this.props.index % 2 === 0) ? s.even : s.odd, this.props.full ? s.reverse : ""].join(" ")}>
                <div className={s.wrapperCard}>
                    <div className={s.image}>
                        <ImageComponent
                            className={s.productImage}
                            alt={product.productName}
                            scale={4}
                            small={true}
                            src={`${utilsService.getPathFromImageTag(item.images[0].imageTag, 240, 240)}`}
                            srcMob={`${utilsService.getPathFromImageTag(item.images[0].imageTag, 240, 240)}`}
                        />
                    </div>
                    {!this.props.full && <div className={s.informations}>
                        {informations}
                    </div>}
                    {this.props.full && informations}
                </div>
            </a>
        );
    }
}
