import { User } from "../models/user.model";

declare global {
    const vtexjs: any;
    const vtex: any;
    const skuJson: any
    const _trustvox: any;
    const vtexid: any;
    const FB: any;
    const yv: any;
    const vtxctx: any;
    const Cookies: any;
    interface Window { userLogged: User; dataLayer: any; loading(state: boolean): void; checkout: any, fbAsyncInit(): void}
}

export { };