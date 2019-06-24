import { Newsletter } from "../models/newsletter.model";
import { MasterdataReturn } from "../models/masterdata.model";
import config from "./config";

class DataNewsletter {

    constructor() {
    }

    public subscribeNewsletter(model: Newsletter) {
        return new Promise<any>((resolve, reject) => {
            model.status = true;
            $.ajax({
                url: config.endoint + "/api/dataentities/NL/documents",
                headers: config.HEADERS_PRIVATE,
                type: "PATCH",
                data: JSON.stringify({ ...model, ...{ id: "email" } }),
                success: (data: MasterdataReturn) => {
                    model.id = data.Id.replace("NL-", "");
                    resolve(data);
                },
                error: (data: any) => {
                    reject(data);
                },
            });
        });
    }
}

export default new DataNewsletter();
