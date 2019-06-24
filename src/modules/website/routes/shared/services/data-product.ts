import { ItemsReturned } from "../models/search.model";
import { Product, Sku, Seller, Item, ProductCatalogSku } from "../../../../common/models/product.model";
import utilsService from "./utils-service";
import config from "./config";

class DataProduct {

    public db: any = {
        products: `${config.endoint}/api/catalog_system/pub/products`,
        search: `${config.endoint}/buscaautocomplete/?productNameContains=`,
    };

    public getSearchProducts(searchTerm: string): Promise<ItemsReturned> {
        return new Promise<any>((resolve, reject) => {
            $.ajax({
                url: `${this.db.search}${encodeURIComponent(searchTerm)}`,
                type: "GET",
                headers: {
                    "x-origin": "x-requested-with",
                },
                success: (data: ItemsReturned) => {
                    resolve(data);
                },
                error: (data: any) => {
                    reject(data);
                },
            });
        });
    }
    public setAviseMe(notifymeIdSku: string, notifymeClientEmail: string, notifymeClientName: string): Promise<ItemsReturned> {
        return new Promise<any>((resolve, reject) => {
            $.ajax({
                url: `/no-cache/AviseMe.aspx`,
                type: "POST",
                dataType: "text",
                data: {
                    notifymeIdSku,
                    notifymeClientEmail,
                    notifymeClientName,
                },
                headers: {
                    "x-origin": "x-requested-with",
                },
                success: (data) => {
                    resolve(data);
                },
                error: (data: any) => {
                    reject(data);
                },
            });
        });
    }

    

    public getProductsById(productsIds: string): Promise<Product[]> {
        return new Promise<Product[]>((resolve, reject) => {
            $.ajax({
                url: `${this.db.products}/search?fq=productId:${productsIds}`,
                type: "GET",
                headers: {
                    "x-origin": "x-requested-with",
                },
                success: (data: Product[]) => {
                    resolve(data);
                },
                error: (data: any) => {
                    reject(data);
                },
            });
        });
    }

    public getProductsByCategory(paths: string[], search: string, orderby: string, _from: number = 0, _to: number = 13): Promise<Product[]> {
        return new Promise<Product[]>((resolve, reject) => {
            $.ajax({
                url: `${this.db.products}/search/${(paths && paths.length > 0) ? `?${paths.join("&")}&` : `${(search) ? search : ""}?`}_from=${_from}&_to=${_to}&O=${orderby}`,
                type: "GET",
                headers: {
                    "x-origin": "x-requested-with",
                },
                success: (data: Product[]) => {
                    resolve(data);
                },
                error: (data: any) => {
                    reject(data);
                },
            });
        });
    }

    public getProductsBySearch(search: string, _from: number = 0, _to: number = 13): Promise<Product[]> {
        return new Promise<Product[]>((resolve, reject) => {
            $.ajax({
                url: `${this.db.products}/search/?${search}&_from=${_from}&_to=${_to}`,
                type: "GET",
                headers: {
                    "x-origin": "x-requested-with",
                },
                success: (data: Product[]) => {
                    resolve(data);
                },
                error: (data: any) => {
                    reject(data);
                },
            });
        });
    }

    public getProductById(productId: string): Promise<Product> {
        return new Promise<Product>((resolve, reject) => {
            $.ajax({
                url: `${this.db.products}/search?fq=productId:${productId}`,
                type: "GET",
                headers: {
                    "x-origin": "x-requested-with",
                },
                success: (data: Product[]) => {
                    resolve(data[0]);
                },
                error: (data: any) => {
                    reject(data);
                },
            });
        });
    }
    public getProductByTerm(term: string): Promise<Product[]> {
        return new Promise<Product[]>((resolve, reject) => {
            $.ajax({
                url: `${this.db.products}/search?${term}`,
                type: "GET",
                headers: {
                    "x-origin": "x-requested-with",
                },
                success: (data: Product[]) => {
                    resolve(data);
                },
                error: (data: any) => {
                    reject(data);
                },
            });
        });
    }

    public getProductBySku(sku: string): Promise<Sku> {
        return new Promise<Sku>((resolve, reject) => {
            $.ajax({
                url: `${config.endoint}/produto/sku/${sku}`,
                type: "GET",
                headers: {
                    "x-origin": "x-requested-with",
                },
                success: (data: Sku[]) => {
                    resolve(data[0]);
                },
                error: (data: any) => {
                    reject(data);
                },
            });
        });
    }

    public getProductCatalogBySku(sku: string) {
        return new Promise<ProductCatalogSku>((resolve, reject) => {
            $.ajax({
                url: `${config.endoint}/api/catalog_system/pvt/sku/stockkeepingunitbyid/${sku}`,
                type: "GET",
                headers: config.HEADERS_PRIVATE,
                success: (data: ProductCatalogSku) => {
                    resolve(data);
                },
                error: (data: any) => {
                    reject(data);
                },
            });
        });
    }

    public getRelations(productId: string): Promise<Product[]> {
        return new Promise<Product[]>((resolve, reject) => {
            $.ajax({
                url: `${config.endoint}/api/catalog_system/pub/products/crossselling/similars/${productId}`,
                type: "GET",
                headers: {
                    "x-origin": "x-requested-with",
                },
                success: (data: Product[]) => {
                    resolve(data);
                },
                error: (data: any) => {
                    reject(data);
                },
            });
        });
    }

    public whoboughtalsobought(productId: string): Promise<Product[]> {
        return new Promise<Product[]>((resolve, reject) => {
            $.ajax({
                url: `${config.endoint}/api/catalog_system/pub/products/crossselling/whoboughtalsobought/${productId}`,
                type: "GET",
                headers: {
                    "x-origin": "x-requested-with",
                },
                success: (data: Product[]) => {
                    resolve(data);
                },
                error: (data: any) => {
                    reject(data);
                },
            });
        });
    }
    
    public accessories(productId: string): Promise<Product[]> {
        return new Promise<Product[]>((resolve, reject) => {
            $.ajax({
                url: `${config.endoint}/api/catalog_system/pub/products/crossselling/accessories/${productId}`,
                type: "GET",
                headers: {
                    "x-origin": "x-requested-with",
                },
                success: (data: Product[]) => {
                    resolve(data);
                },
                error: (data: any) => {
                    reject(data);
                },
            });
        });
    }
    
    public suggestions(productId: string): Promise<Product[]> {
        return new Promise<Product[]>((resolve, reject) => {
            $.ajax({
                url: `${config.endoint}/api/catalog_system/pub/products/crossselling/suggestions/${productId}`,
                type: "GET",
                headers: {
                    "x-origin": "x-requested-with",
                },
                success: (data: Product[]) => {
                    resolve(data);
                },
                error: (data: any) => {
                    reject(data);
                },
            });
        });
    }

    public getWhosaWalsoSaw(productId: string): Promise<Product[]> {
        return new Promise<Product[]>((resolve, reject) => {
            $.ajax({
                url: `${config.endoint}/api/catalog_system/pub/products/crossselling/whosawalsosaw/${productId}`,
                type: "GET",
                headers: {
                    "x-origin": "x-requested-with",
                },
                success: (data: Product[]) => {
                    resolve(data);
                },
                error: (data: any) => {
                    reject(data);
                },
            });
        });
    }

    public getProductInfo(product: Product, widthDesk: number = 318, heightDesk: number = 445, widthMob: number = 218, heightMob: number = 306): any {
        const { items, productName } = product;

        let sku: Item = null;
        let sellerAvaible: Seller = null;

        for (let index = 0; index < items.length; index++) {
            const item = items[index];
            for (let idx = 0; idx < item.sellers.length; idx++) {
                const seller = item.sellers[idx];
                if (seller.commertialOffer.AvailableQuantity > 0) {
                    sku = item;
                    sellerAvaible = seller;
                }
            }
        }

        if (!sku) {
            sku = items[0];
        }

        let image = sku.images.find((_image) => _image.imageLabel.toLowerCase() === "wearfront");
        if (!image) {
            image = sku.images[0];
        }
        const pathDesk = image && utilsService.getPathFromImageTag(image.imageTag, widthDesk, heightDesk);
        const pathMob = image && utilsService.getPathFromImageTag(image.imageTag, widthMob, heightMob);

        return {
            pathDesk,
            pathMob,
            sellerAvaible,
            sku,
            productName,
        };
    }

    public setLastSaw(product: Product) {

        const productsstr = sessionStorage.getItem("products-lastsaw");

        let products: Product[] = [];

        if (productsstr) {
            products = JSON.parse(productsstr) as Product[];
        }

        const isproduct = products.find((_product) => _product.productId === product.productId);

        if (!isproduct) {
            products.push(product);
            sessionStorage.setItem("products-lastsaw", JSON.stringify(products));
        }
    }

    public getLastSaw(): Product[] {

        const productsstr = sessionStorage.getItem("products-lastsaw");
        return JSON.parse(productsstr);
    }
}

export default new DataProduct();