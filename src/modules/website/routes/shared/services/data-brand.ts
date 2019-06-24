import config from "./config";
import { Brand } from "../models/brand.model";

class DataBrand {

    public getAllBrands(): Promise<Brand[]> {
        return new Promise<any>((resolve, reject) => {
            $.ajax({
                url: `${config.endoint}/api/catalog_system/pub/brand/list`,
                type: "GET",
                headers: config.HEADERS_PRIVATE,
                success: (data: Brand[]) => {
                    resolve(data);
                },
                error: (data: any) => {
                    reject(data);
                },
            });
        });
    }
}

export default new DataBrand();