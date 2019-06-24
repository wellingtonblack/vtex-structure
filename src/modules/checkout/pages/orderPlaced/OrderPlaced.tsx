import * as React from "react";
import s from "./OrderPlaced.scss";
import dataCheckout from "../shared/services/data-checkout";
import { OrderPlaced } from "../../../common/models/orderplaced.model";
import { DisplayInfo } from "./components/DisplayInfo/DisplayInfo";
import { OrderDetail } from "./components/OrderDetail/OrderDetail";
import { List } from "./components/List/List";
import { Banners } from "./components/Banners/Banners";
import dataUser from "../../../website/routes/shared/services/data-user";


type OrderPlacedProps = {

};

export interface OrderPlacedState {
    order: OrderPlaced;
    logged: boolean;
}

export class OrderPlacedComponent extends React.Component<OrderPlacedProps, OrderPlacedState> {


    constructor(props: any) {
        super(props);
        this.state = {
            order: null,
            logged: false,
        };
    }

    public async componentDidMount() {
        const url = new URL(window.location.href);
        const orderNumber = url.searchParams.get("og");

        const order = await dataCheckout.getOrder(orderNumber);
        dataUser.getCurrentUser()
            .then((user) => {
                if (user.IsUserDefined) {
                    this.setState({
                        logged: true,
                    });
                } else {
                    this.setState({
                        logged: false,
                    });
                }
            });
        this.setState({
            order,
        });
    }

    public render() {
        const { order } = this.state;
        return (
            order && <div className={s.container}>
                <div className={s.wrapper}>
                    <DisplayInfo logged={this.state.logged} order={order} />
                    <Banners />
                    <OrderDetail order={order} />
                    <List order={order} />
                </div>
            </div>
        );
    }
}


