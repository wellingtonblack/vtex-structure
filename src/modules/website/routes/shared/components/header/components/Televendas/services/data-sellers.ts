import config from "../../../../../services/config";
import { Seller } from "../models/seller";

class DataSeller {
    /**
     *
     */
    constructor() {

    }

    public getSeller(sellercod: string) {
        return new Promise<Seller[]>((resolve, reject) => {
            $.ajax({
                url: `${config.endoint}/api/dataentities/TL/search/?_where=codigovendedora=${sellercod}&_fields=codigovendedora,nomevendedora`,
                headers: { ...config.HEADERS, "REST-Range": "resources=0-1" },
                type: "GET",
                success: (data: Seller[]) => {
                    resolve(data);
                },
                error: (data: any) => {
                    reject(data);
                },
            });
        });
    }

    public setAnonymousSeller = (code: string) => {

        return new Promise<Seller>((resolve, reject) => {
            const response: Seller = { codigovendedora: code, data: Date.now(), nomevendedora: `anonimo${Date.now()}` };
            const dataString = JSON.stringify(response);

            $.ajax({
                url: `${config.endoint}/api/dataentities/TL/documents`,
                headers: config.HEADERS_PRIVATE,
                type: "POST",
                data: dataString,
                success: (_data: any) => {
                    resolve(response);
                },
                error: (_data) => {
                    reject(_data);
                },
            });
        });

    }

    public setUtm = (utmSource: string) => {
        return new Promise<Seller>((resolve, reject) => {

            const utmsSend: any = {
                utmSource: null,
                utmMedium: null,
                utmCampaign: null,
                coupon: null,
                utmiPart: null,
                utmipage: null,
                utmiCampaign: null,
            };

            vtexjs.checkout.getOrderForm()
                .then((orderForm: any) => {

                    if (orderForm.marketingData) {
                        utmsSend.utmSource = utmSource;
                        vtexjs.checkout.sendAttachment("marketingData", utmsSend);
                    } else {
                        vtexjs.checkout.sendAttachment("marketingData", utmsSend);
                    }

                    resolve();
                }, () => {
                    reject();
                });
        }); 
    }
}

export default new DataSeller();