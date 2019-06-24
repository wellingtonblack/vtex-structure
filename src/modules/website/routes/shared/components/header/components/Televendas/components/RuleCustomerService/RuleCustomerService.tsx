import React from "react";
import { Seller } from "../../models/seller";
import s from "./RuleCustomerService.scss";
import utilsService from "../../../../../../services/utils-service";


type Props = {
    seller: Seller;
    handleLogout(): void;
};

const RuleCustomerService = (props: Props) => {
    const { seller } = props;
    return <div className={s.content}>
        <p className={s.label}>Você está sendo atendido por <span>Vendedor(a) {utilsService.truncate(seller.nomevendedora, 2, "...")}</span></p>
        <button onClick={props.handleLogout} className={s.logout}>Sair</button>
    </div>;
};

export default RuleCustomerService;