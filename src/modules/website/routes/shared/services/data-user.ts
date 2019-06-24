import { UserModel, User } from "../models/user.model";
import { OrderList, Order } from "../models/order";
import config from "./config";


class DataUserService {

    public userbd: string = "userdb";

    public getCurrentUser(): Promise<UserModel> {
        return new Promise<UserModel>((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: "/no-cache/profileSystem/getProfile",
                success: (data: UserModel) => {
                    resolve(data);
                },
                error: (data: any) => {
                    reject(data);
                },
            });
        });
    }

    public updateMyAccount(data: any): Promise<UserModel> {
        return new Promise<any>((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "/no-cache/account/profile/save",
                data,
                success: (_data: any) => {
                    resolve(_data);
                },
                error: (_data: any) => {
                    reject(_data);
                },
            });
        });
    }
    public subscribeNews(data: any): Promise<UserModel> {
        return new Promise<any>((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "/no-cache/Newsletter.aspx",
                data,
                success: (_data: any) => {
                    resolve(_data);
                },
                error: (_data: any) => {
                    reject(_data);
                },
            });
        });
    }

    public updateorSaveAddress(data: any): Promise<UserModel> {
        return new Promise<any>((resolve, reject) => {
            $.ajax({
                type: "POST",
                url: "/no-cache/account/address/save",
                data,
                success: (_data: any) => {
                    resolve(_data);
                },
                error: (_data: any) => {
                    reject(_data);
                },
            });
        });
    }

    public getGetUserByEmail(email: any): Promise<User> {
        return new Promise<User>(async (resolve, reject) => {

            const userQuery = '{ getClientById(email: "' + email + '") { email, profileImage, homePhone, phone, userId, firstName, lastName, document, isNewsletterOptIn, birthDate, businessPhone, corporateDocument, corporateName, documentType, gender, id, accountId, accountName, }, }';
            const _data: any = {
                query: userQuery,
                variables: null,
            };

            $.ajax({
                method: "POST",
                url: `https://proxy-aramis-store.azurewebsites.net/graphql`,
                data: _data,
                success: (result: any) => {
                    try {
                        resolve(result.data.getClientById || {});
                    } catch (error) {
                        reject();
                    }
                },
                error: (error: any) => {
                    reject(error);
                },
            });
        });
    }


    public getOrders(email: string, pag: number, perpag: number) {
        return new Promise<OrderList>((resolve, reject) => {
            // if (config.HEADERS.VtexIdclientAutCookie) {
            $.ajax({
                type: "GET",
                url: `/api/oms/user/orders/?clientEmail=${email}&page=${pag}&per_page=${perpag}`,
                headers: config.HEADERS,
                success: (data: OrderList) => {
                    resolve(data);
                },
                error: (data: any) => {
                    reject(data);
                },
            });
            // } else {
            //     window.addEventListener("reset.session.request", () => {
            //         $.ajax({
            //             type: "GET",
            //             url: `/api/oms/user/orders/?clientEmail=${email}&page=${pag}&per_page=${perpag}`,
            //             headers: config.HEADERS,
            //             success: (data: OrderList) => {
            //                 resolve(data);
            //             },
            //             error: (data: any) => {
            //                 reject(data);
            //             },
            //         });
            //     }); 
            // }
        });
    }

    public getOrder(orderId: string, email: string) {
        return new Promise<Order>((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: `/api/oms/user/orders/${orderId}?clientEmail=${email}`,
                headers: config.HEADERS,
                success: (_data: Order) => {
                    resolve(_data);
                },
                error: (_data: any) => {
                    reject(_data);
                },
            });
        });
    }

    public logout(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            $.ajax({
                url: "/no-cache/user/logout",
                success: () => {
                    this.removeUser();
                    resolve();
                },
                error: (data: any) => {
                    reject(data);
                },
            });
        });
    }

    public setUser(user: UserModel) {
        sessionStorage.setItem(this.userbd, JSON.stringify(user));
    }

    public getUser(): UserModel {
        return JSON.parse(sessionStorage.getItem(this.userbd));
    }

    public removeUser(): void {
        sessionStorage.removeItem(this.userbd);
    }
}

export default new DataUserService();