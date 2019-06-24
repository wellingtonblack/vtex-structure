export interface Item {
    "complementName": string;
    "ean": string;
    "itemId": string;
    "name": string;
    "nameComplete": string;
    "sellers": Seller[];
}

export interface Seller {
    "addToCartLink": string;
    "sellerDefault": boolean;
    "sellerId": string;
    "sellerName": string;
    "commertialOffer": CommertialOffer;
} 

export interface CommertialOffer {
    "AvailableQuantity": number;
    "CacheVersionUsedToCallCheckout": string;
    "ListPrice": number;
    "Price": number;
    "PriceWithoutDiscount": number;
}