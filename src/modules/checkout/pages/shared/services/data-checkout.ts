import config from "../../../../website/routes/shared/services/config";
import { OrderPlaced } from "../../../../common/models/orderplaced.model";


class DataCheckout {

    public static store = sessionStorage;


    public static SetFieldInOrder(object: any): Promise<any> {
        return new Promise((resolve, reject) => {
            vtexjs
                .checkout
                .sendAttachment("openTextField", { value: JSON.stringify(object) })
                .done((orderform: any) => {
                    resolve(orderform);
                })
                .fail((error: any) => {
                    reject(error);
                });
        });
    }

    public getOrder(orderNumber: string): Promise<OrderPlaced> {
        return new Promise<OrderPlaced>((resolve, reject) => {
            $.ajax({
                url: `${config.endoint}/api/checkout/pub/orders/order-group/${orderNumber}`,
                type: "GET",
                headers: {
                    "x-origin": "x-requested-with",
                },
                success: (data: OrderPlaced[]) => {
                    resolve(data[0]);
                },
                error: (data: any) => {
                    reject(data);
                },
            });
        });
    }
}


export default new DataCheckout();

