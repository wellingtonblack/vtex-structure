import React from "react";
import s from "./DisplayInfo.scss";
import { OrderPlaced } from "../../../../../common/models/orderplaced.model";
import utilsService from "../../../../../website/routes/shared/services/utils-service";
import SVGInline from "react-svg-inline";
import arrow from "../../../../assets/icons/arrow-check.svg";
import print from "../../../../assets/icons/print-bullet.svg";
import arrowRight from "../../../../assets/icons/arrow-right.svg";

type Prop = {
    order: OrderPlaced;
    logged: boolean;
};

export function DisplayInfo(props: Prop) {
    const { clientProfileData, value, paymentData } = props.order;

    const bullet = paymentData.transactions[0].payments.find((payment) => payment.group === "bankInvoice");

    return (
        <div className={s.wrapper}>
            <div className={s.content}>
                <div className={s.wellcome}>
                    <h2 className={s.title}>
                        <span className={s.icon}><SVGInline className={s.iconArrow} svg={arrow} /></span>
                        <span className={s.text}>muito bem,
                        <br />você finalizou sua compra
                        <br />com sucesso.</span>
                    </h2>
                    <p className={s.subtitle}>esperamos que tenha sido, prático e gostoso se cuidar por aqui.</p>
                    <p className={s.informations}>em breve você receberá um e-mail no endereço <strong>{clientProfileData.email}</strong>
                        <br />com todos os detalhes do pedido</p>
                    <p className={s.paymentInfo}>aguardamos a confirmação do pagamento</p>
                    <p className={s.progressOrder}>para poder prosseguir com seu pedido.</p>
                </div>
                {bullet && <div className={s.value}>
                    <p className={s.bulletInfo}>caso não tenha visualizado o boleto</p>
                    <p className={s.printInfo}>imprima o boleto clicando no botão abaixo</p>
                    <div className={s.orderValue}>
                        <span className={s.label}>valor da
                        <br />sua compra:</span>
                        <span className={s.number}>R${utilsService.parseMoney(value / 100)}</span>
                    </div>
                    <a
                        onClick={(event) => {
                            if (!props.logged) {
                                event.preventDefault();
                                event.stopPropagation();
                                vtexid.start();
                            }
                        }}
                        target="_blank"
                        href={bullet.url}
                        className={s.buttonPrint}>
                        <SVGInline className={s.printIcon} svg={print} />
                        imprimir boleto
                        <SVGInline className={s.arrowRightIcon} svg={arrowRight} />
                    </a>
                </div>}
            </div>
            <div className={s.footer}>
                <p className={s.label}>obrigado por confiar na loja!</p>
                <div className={s.controls}>
                    <div className={s.buttons}>
                        <a className={s.callToAction} href="/">
                            comprar mais
                            <SVGInline className={s.arrowRightIcon} svg={arrowRight} />
                        </a>
                        <a 
                            onClick={(event) => {
                                if (!props.logged) {
                                    event.preventDefault();
                                    event.stopPropagation();
                                    vtexid.start();
                                }
                            }}
                            className={s.callToAction} 
                            href="/account/orders">
                            ir para minha conta
                            <SVGInline className={s.arrowRightIcon} svg={arrowRight} />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}