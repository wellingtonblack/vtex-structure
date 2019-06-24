import config from "../../../../../services/config";
import { Store } from "../models/store";

class DataStore {

    public getStores() {
        return new Promise<Store[]>((resolve, reject) => {

            $.ajax({
                url: config.endoint + "/api/dataentities/SO/search/?_fields=name,codigoLoja",
                headers: {...config.HEADERS, "REST-Range": "resources=0-200"},
                type: "GET",
                success: (data: Store[]) => {
                    resolve(data);
                },
                error: (data: any) => {
                    reject(data);
                },
            });
        });
    }
}

export default new DataStore();