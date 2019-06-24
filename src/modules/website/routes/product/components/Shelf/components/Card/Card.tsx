import * as React from "react";
import s from "./Card.scss";
import utilsService from "../../../../../shared/services/utils-service";
import { ImageComponent } from "../../../../../shared/components/Image/Image";
import { PercentageComponent } from "../../../../../shared/components/Percentage/Percentage";
import { Product } from "../../../../../../../common/models/product.model";
import { FlagsAttr } from "../../../../../shared/components/FlagsAttr/FlagsAttr";
import { FlagComponent } from "../../../../../shared/components/Flag/Flag";


export interface CardProps {
    className?: string;
    product: Product;
    index: number;
    loading: boolean;
}

export interface CardState {

}

export class CardComponent extends React.Component<CardProps, CardState> {

    constructor(props: CardProps) {
        super(props);
    }

    public render() {
        const { product, loading } = this.props;
        const item = product.items ? product.items.find((_item) => _item.sellers[0].commertialOffer.AvailableQuantity > 0) : null;

        const flags = this.props.product.clusterHighlights;
        const oldPrice = item && item.sellers[0].commertialOffer.ListPrice;
        const newPrice = item && item.sellers[0].commertialOffer.Price;

        const newPriceFormated = item && utilsService.parseMoney(newPrice);
        const oldPriceFormated = item && utilsService.parseMoney(oldPrice);
        const splitMoney = item && newPriceFormated.split(/\,/g);

        const classLoading = loading ? s.loading : "";
        const _image = item && item.images.find((x) => x.imageLabel === "vitrine1" || x.imageLabel === "vitrine2" || x.imageLabel === "vitrine3" || x.imageLabel === "full" || x.imageLabel === "front" || x.imageLabel === "full02" || x.imageLabel === "mobile" || x.imageLabel === "xml");
        return (
            <a href={product.link} className={[s.card, "card", (this.props.index % 2 === 0) ? s.even : s.odd, this.props.className].join(" ")}>
                <div className={s.wrapperCard}>
                    {!loading && <FlagComponent
                        className={s.flag}
                        flags={flags}>
                    </FlagComponent>}
                    <div className={[s.imageWrapper, classLoading].join(" ")}>
                        {!loading && <FlagsAttr product={product} />}
                        {!loading && _image && <ImageComponent
                            className={s.image}
                            alt={product.productName}
                            scale={3}
                            small={true}
                            // src={`//aramismenswear.vteximg.com.br${utilsService.getPathFromImageTag(item.images[0].imageTag, 454, 600)}`}
                            // srcMob={`//aramismenswear.vteximg.com.br${utilsService.getPathFromImageTag(item.images[0].imageTag, 454, 600)}`}
                            src={`//aramismenswear.vteximg.com.br${utilsService.getPathFromImageTag(_image.imageTag, 454, 600)}`}
                            srcMob={`//aramismenswear.vteximg.com.br${utilsService.getPathFromImageTag(_image.imageTag, 454, 600)}`}
                        >
                            <PercentageComponent
                                newPrice={newPrice}
                                oldPrice={oldPrice}
                            />


                        </ImageComponent>}
                    </div>
                    <div className={s.boxInformations}>
                        <p className={[s.productName, classLoading].join(" ")}>{!loading && utilsService.truncate(product.productName, 12, "...")}</p>
                    </div>
                    <div className={s.boxPrice}>
                        {/* <em className={[s.oldPrice, classLoading].join(" ")}>{newPrice < oldPrice && `DE R$ ${oldPriceFormated}`}</em> */}
                        <em className={[s.price, classLoading].join(" ")}>{!loading && <span>r$</span>} {item && <React.Fragment>{splitMoney[0]},<span className={s.up}>{splitMoney[1]}</span></React.Fragment>}</em>
                    </div>
                </div>
            </a>
        );
    }
}
