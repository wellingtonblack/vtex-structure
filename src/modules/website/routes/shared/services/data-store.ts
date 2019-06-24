import config from "./config";
import { Color } from "../models/Color";

class DataStore {

    constructor() {
    }

    public getColors() {
        return new Promise<Color[]>((resolve, reject) => {

            $.ajax({
                url: config.endoint + "/api/dataentities/CR/search?_fields=name,value",
                headers: {...config.HEADERS, "REST-Range": "resources=0-200"},
                type: "GET",
                success: (data: Color[]) => {
                    resolve(data);
                },
                error: (data: any) => {
                    reject(data);
                },
            });
        });
    }

    public getSimpleColors() {
        return new Promise<Color[]>((resolve, reject) => {

            $.ajax({
                url: config.endoint + "/api/dataentities/CS/search?_fields=name,value",
                headers: {...config.HEADERS, "REST-Range": "resources=0-200"},
                type: "GET",
                success: (data: Color[]) => {
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
