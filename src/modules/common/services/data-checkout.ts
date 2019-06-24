import { OrderForm } from "../models/orderform.model";
import config from "../../website/routes/shared/services/config";
import { Cep } from "../models/cep";

class DataCheckout {
    public setCupom(text: string): Promise<OrderForm> {

        const requestBody = {
            expectedOrderFormSections: vtexjs.checkout._allOrderFormSections,
            text,
        };

        return new Promise<any>((resolve, reject) => {
            $.ajax({
                url: `/api/checkout/pub/orderForm/${vtexjs.checkout.orderForm.orderFormId}/coupons`,
                type: "POST",
                headers: config.HEADERS_PRIVATE,
                data: JSON.stringify(requestBody),
                success: (data: OrderForm) => {
                    resolve(data);
                },
                error: (data: any) => {
                    reject(data);
                },
            });
        });
    }

    public getAddressFromCep = (cep: string) => {
        return new Promise<Cep>((resolve, reject) => {
            $.ajax({
                url: `/no-cache/postalcode/address/${cep}`,
                type: "GET",
                headers: config.HEADERS,
                success: (data: any) => {
                    resolve(JSON.parse(JSON.stringify(data)) as Cep);
                },
                error: (data: any) => {
                    reject(data);
                },
            });
        });
    }

    public removeAddress(id: string) {
        return new Promise<boolean>((resolve, reject) => {
            $.ajax({
                url: `/no-cache/account/address/delete/${id}`,
                type: "GET",
                headers: config.HEADERS,
                success: (data: string) => {
                    resolve(true);
                },
                error: (data: any) => {
                    reject(false);
                },
            });
        });
    } 
}


export default new DataCheckout();