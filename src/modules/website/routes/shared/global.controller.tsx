

import React from "react";
import { BaseController } from "../base.controller";
import { LoadbarComponent } from "./components/LoadBar/LoadBar";

export class GlobalController extends BaseController {
    constructor() {
        super();
        this.renderComponent(<LoadbarComponent />, "#root-load-bar");
        this.utmConfig();
    }

    public utmConfig() {
        let utmspath = window.location.search;
        utmspath = utmspath.replace("?", "");
        const utms = utmspath.split(/[\&]/g);

        const utmsSend: any = {
            utmSource: null,
            utmMedium: null,
            utmCampaign: null,
            coupon: null,
            utmiPart: null,
            utmipage: null,
            utmiCampaign: null,
        };

        for (let index = 0; index < utms.length; index++) {
            const utm = utms[index];

            if (utm.indexOf("utm_source=") > -1) {
                utmsSend.utmSource = utm.replace("utm_source=", "");
            }

            if (utm.indexOf("utm_medium=") > -1) {
                utmsSend.utmMedium = utm.replace("utm_medium=", "");
            }

            if (utm.indexOf("utm_campaign=") > -1) {
                utmsSend.utmCampaign = utm.replace("utm_campaign=", "");
            }

            if (utm.indexOf("coupon=") > -1) {
                utmsSend.coupon = utm.replace("coupon=", "");
            }

            if (utm.indexOf("utmi_part=") > -1) {
                utmsSend.utmiPart = utm.replace("utmi_part=", "");
            }

            if (utm.indexOf("utmi_page=") > -1) {
                utmsSend.utmipage = utm.replace("utmi_page=", "");
            }

            if (utm.indexOf("utmi_cp=") > -1) {
                utmsSend.utmiCampaign = utm.replace("utmi_cp=", "");
            }
        }

        if (
            utmsSend.utmSource || 
            utmsSend.utmMedium || 
            utmsSend.utmCampaign || 
            utmsSend.coupon || 
            utmsSend.utmiPart || 
            utmsSend.utmipage ||
            utmsSend.utmiCampaign) {

            vtexjs.checkout.getOrderForm()
                .then((orderForm: any) => {
                    
                    if (orderForm.marketingData) {
                        if (
                            orderForm.marketingData.utmSource !== utmsSend.utmSource || 
                            orderForm.marketingData.utmMedium !== utmsSend.utmMedium || 
                            orderForm.marketingData.utmCampaign !== utmsSend.utmCampaign ||
                            orderForm.marketingData.coupon !== utmsSend.coupon ||
                            orderForm.marketingData.utmiPart !== utmsSend.utmiPart ||
                            orderForm.marketingData.utmipage !== utmsSend.utmipage ||
                            orderForm.marketingData.utmiCampaign !== utmsSend.utmiCampaign) {

                            vtexjs.checkout.sendAttachment("marketingData", utmsSend);
                        }
                    } else {
                        vtexjs.checkout.sendAttachment("marketingData", utmsSend);
                    }
                });
        }
    }
}

export default new GlobalController();