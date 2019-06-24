import config from "./config";
import { Category } from "../models/category";

class DataCategory {

    public endpoint: any = `${config.endoint}/api/catalog_system/pub/category/tree/3/`;

    public getAllCategory(): Promise<Category[]> {
        return new Promise<any>((resolve, reject) => {
            $.ajax({
                url: `${this.endpoint}`,
                type: "GET",
                headers: config.HEADERS,
                success: (data: Category[]) => {
                    resolve(data);
                },
                error: (data: any) => {
                    reject(data);
                },
            });
        });
    }

}

export default new DataCategory();