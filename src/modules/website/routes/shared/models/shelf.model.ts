import { Product } from "../../../../common/models/product.model";

export interface Shelf {
    title: string;
    products: Product[];
}