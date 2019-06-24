import { FilterResultModel } from "../models/filter.model";
import config from "./config";

class FacetsData {
    
    public db: any = {
        filter: `${config.endoint}/api/catalog_system/pub/facets/search/`,
    };

    public getFilters(param: string): Promise<FilterResultModel> {
        return new Promise<FilterResultModel>((resolve, reject) => {
            $.ajax({
                url: `${this.db.filter}${param}`,
                type: "GET",
                success: (data: FilterResultModel) => {
                    resolve(data);
                },
                error: (data: any) => {
                    reject(data);
                },
            });
        });
    }
}

export default new FacetsData(); 