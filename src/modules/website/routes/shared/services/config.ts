import dataSessions from "./data-sessions";
import { Session } from "../models/session";

class SETTINGS {

    public endoint: string = "";
    public endointStable: string = "//aramismenswear.vtexcommercestable.com.br";
    
    public HEADERS: any = {
        "x-origin": "x-requested-with",
        "Content-Type": "application/json",
    };

    public HEADERS_PRIVATE: any = {
        "Content-Type": "application/json",
        "Accept": "application/vnd.vtex.ds.v10+json",
        "x-origin": "x-requested-with",
    };
    
    constructor() {
        this.setUpSession();
    }

    public async setUpSession() {
        try {
            
            const session: Session = await dataSessions.sessions;
            if (
                session && 
                session.namespaces && 
                session.namespaces.cookie.VtexIdclientAutCookie_aramismenswear && 
                session.namespaces.cookie.VtexIdclientAutCookie_aramismenswear.value) {
                this.HEADERS.VtexIdclientAutCookie = session.namespaces.cookie.VtexIdclientAutCookie_aramismenswear.value;
            }
        } catch (error) {
        }
    }
}

export default new SETTINGS();
