import * as React from "react";
import s from "./Card.scss";
import utilsService from "../../../../../shared/services/utils-service";
import { ImageComponent } from "../../../../../shared/components/Image/Image";
import { PercentageComponent } from "../../../../../shared/components/Percentage/Percentage";
import { AddToCartComponent } from "../../../../../shared/components/AddToCart/AddToCart";
import { Product, Seller, Installment } from "../../../../../../../common/models/product.model";
import { FlagsAttr } from "../../../../../shared/components/FlagsAttr/FlagsAttr";
import { FlagComponent } from "../../../../../shared/components/Flag/Flag";
import { LabelStokOutOff } from "../../../../../shared/components/LabelStokeOutOff/LabelStokOutOff";


export interface CardProps {
    className?: string;
    product: Product;
    index: number;
    loading?: boolean;
}

export interface CardState {

}



export class CardComponent extends React.Component<CardProps, CardState> {

    constructor(props: CardProps) {
        super(props);
    }

    public render() {
        const { product, loading } = this.props;
        const item = product.items ? product.items.find((x) => x.sellers[0].commertialOffer.AvailableQuantity > 0) || product.items[0] : null;

        const flags = this.props.product.clusterHighlights;
        const oldPrice = item && item.sellers[0].commertialOffer.ListPrice;
        const newPrice = item && item.sellers[0].commertialOffer.Price;

        const newPriceFormated = item && utilsService.parseMoney(newPrice);
        const oldPriceFormated = item && utilsService.parseMoney(oldPrice);
        const splitMoney = item && newPriceFormated.split(/\,/g);

        const seller: Seller = (item && item.sellers[0]) || null;

        const installments = seller && utilsService.groupBy(seller.commertialOffer.Installments, "PaymentSystemName");
        let installment: Installment[] = null;

        const keys = installments && Object.keys(installments);

        if (keys) {
            for (let index = 0; index < keys.length; index++) {
                const key = keys[index];
                if (key === "Mastercard" || key === "Visa" || key === "American Express") {
                    installment = installments[key];
                    break;
                }
            }
        }

        const parcel = installment && installment.reverse()[0];

        const classLoading = loading ? s.loading : "";

        const _image = item && item.images.find((x) => x.imageLabel === "vitrine1" || x.imageLabel === "vitrine2" || x.imageLabel === "vitrine3" || x.imageLabel === "imagem1" || x.imageLabel === "imagem2" || x.imageLabel === "imagem3" || x.imageLabel === "full" || x.imageLabel === "xml" || x.imageLabel === "frontal");
        
        return (
            <a href={product.link} className={[s.card, "card", (this.props.index % 2 === 0) ? s.even : s.odd, this.props.className].join(" ")}>
                <div className={s.wrapperCard}>
                    {!loading && <FlagComponent
                        className={s.flag}
                        flags={flags}>
                    </FlagComponent>}
                    {!loading && <PercentageComponent
                        newPrice={newPrice}
                        oldPrice={oldPrice}
                    />}
                    <div className={[s.imageWrapper, classLoading].join(" ")}>
                        {!loading && _image && <ImageComponent
                            className={s.image}
                            alt={product.productName}
                            scale={3}
                            small={true}
                            src={`//aramismenswear.vteximg.com.br${utilsService.getPathFromImageTag(_image.imageTag, 454, 636)}`}
                            srcMob={`//aramismenswear.vteximg.com.br${utilsService.getPathFromImageTag(_image.imageTag, 454, 636)}`}
                        >
                        </ImageComponent>}
                    </div>
                    <div className={s.boxInformations}>
                        <p className={[s.productName, classLoading].join(" ")}>{!loading && utilsService.truncate(product.productName, 12, "...")}</p>
                    </div>
                    {newPrice > 0 ? <div className={s.boxPrice}>
                        <em className={[s.oldPrice, classLoading].join(" ")}>{!loading && newPrice < oldPrice && <React.Fragment>de: <span>{`${oldPriceFormated}`} </span></React.Fragment>}</em>
                        <em className={[s.price, classLoading].join(" ")}>{!loading && <span>{`${$(window).width() > 767 ? "Por" : " "}`} r$</span>} {!loading && item && <React.Fragment>{splitMoney[0]},<span className={s.up}>{splitMoney[1]}</span></React.Fragment>}</em>
                        <span className={[s.parcels, classLoading].join(" ")}>{!loading && parcel && `ou em ${parcel.NumberOfInstallments}x de ${utilsService.parseMoney(parcel.Value, true)}`}</span>
                    </div> : <div className={s.boxPrice}>
                        <LabelStokOutOff className={s.labelOutOff}/>
                    </div>}
                </div>
            </a>
        );
    }
}
