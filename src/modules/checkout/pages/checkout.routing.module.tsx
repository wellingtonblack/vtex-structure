import { IController } from "./shared/models/icontroller";
import domService from "./shared/services/dom.service";
import cartController from "./cart/cart.controller";
import profileController from "./profile/profile.controller";
import shippingController from "./shipping/shipping.controller";
import paymentController from "./payment/payment.controller";
import orderController from "./global/order.controller";
import emailController from "./email/email.controller";
import "./shared/components/Header/header.controller";
import "./shared/styles/global-style.scss";
import headerController from "./shared/components/Header/header.controller";
import footerController from "./shared/components/Footer/footer.controller";
import orderPlacedController from "./orderPlaced/orderPlaced.controller";

class CheckoutRoutingModule {

    private STEPS = { CART: "#/cart", EMAIL: "#/email", SHIPPING: "#/shipping", PROFILE: "#/profile", PAYMENT: "#/payment" };
    private CONTROLLERS_LOAD: IController[] = [];
    private LISTERNS: any[] = [];

    constructor() {

        // GLOBAL VARIABLES
        (window as any).VivaSaudeModel = {};
        window.addEventListener("hashchange", this.OnChangeRouting.bind(this), false);
        jQuery(window).on("orderFormUpdated.vtex", this.OnOrderFormChange.bind(this));
        window.dispatchEvent(new HashChangeEvent("hashchange"));

        this.OnRenderElement("#root-header").then(() => {
            headerController.OnInit();
        });

        this.OnRenderElement("#root-footer").then(() => {
            footerController.OnInit();
        });

        this.CONTROLLERS_LOAD = [
            cartController,
            emailController,
            profileController,
            shippingController,
            paymentController,
            orderController,
        ];
    }



    public async OnChangeRouting(e?: Event) {

        await this.destroy();

        switch (window.location.hash) {
            case this.STEPS.CART:

                this.OnComponentLoaed(".body-cart .cart-template").then((success) => {
                    cartController.OnInit();
                });
                break;
            case this.STEPS.EMAIL:

                this.OnRenderElement(".client-pre-email-h").then((success) => {
                    emailController.OnInit();
                });
                break;
            case this.STEPS.PROFILE:

                this.OnComponentLoaed("#client-profile-data").then((success) => {
                    profileController.OnInit();
                    orderController.OnInit();
                });
                break;
            case this.STEPS.SHIPPING:

                this.OnComponentLoaed("#shipping-data").then((success) => {
                    shippingController.OnInit();
                    orderController.OnInit();
                });
                break;
            case this.STEPS.PAYMENT:

                this.OnComponentLoaed("#payment-data").then((success) => {
                    paymentController.OnInit();
                    orderController.OnInit();
                });
                break;
            default:
                break;
        }

        if (window.location.pathname.indexOf("orderPlaced") > -1) {
            
            this.OnRenderElement("#root-app").then(() => {
                orderPlacedController.OnInit();
            });
        }

        headerController.OnHashChange(window.location.hash);
    }

    private async OnOrderFormChange(e: any) {
        setTimeout((event) => {
            this.CONTROLLERS_LOAD.forEach((controller) => {
                controller.OnOrderFormChange(e);
            });
        }, 100);
    }

    private OnComponentLoaed(element: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const interval = setInterval(() => {
                if (
                    (domService.$(element) && domService.$(element).classList.contains("active")) ||
                    (domService.$(element) && domService.$(element + " > div") && domService.$(element + " > div").classList.contains("active"))
                ) {
                    resolve();
                    clearInterval(interval);
                }
            }, 100);
            this.LISTERNS.push(interval);
        });
    }

    private OnRenderElement(element: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const interval = setInterval(() => {
                if (domService.$(element)) {
                    resolve();
                    clearInterval(interval);
                }
            }, 100);
            this.LISTERNS.push(interval);
        });
    }

    private OnCartItemsLoad(): Promise<any> {
        return new Promise((resolve, reject) => {
            const interval = setInterval(() => {
                if (typeof vtexjs !== "undefined" &&
                    typeof vtexjs.checkout !== "undefined" &&
                    typeof vtexjs.checkout.orderForm !== "undefined" &&
                    typeof vtexjs.checkout.orderForm.items !== "undefined") {
                    resolve();
                    clearInterval(interval);
                }
            }, 100);
            this.LISTERNS.push(interval);
        });
    }

    private async destroy() {

        this.LISTERNS.forEach((interval) => {
            clearInterval(interval);
        });
        this.LISTERNS = [];

        this.CONTROLLERS_LOAD.forEach((controller) => {
            controller.OnDestroy();
        });
    }
}


export default new CheckoutRoutingModule();